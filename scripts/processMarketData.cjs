#!/usr/bin/env node
/**
 * Processes PostFinance CSV market data → computes annual returns → writes assetData.js
 *
 * Asset mappings (CHF perspective):
 *  bonds         → Swiss Bond AAA-BBB Total Return Index
 *  gold          → Gold in CHF
 *  smiStocks     → SMI Price Return index
 *  equityIndices → DJIA (USD) × USDCHF  (USD returns converted to CHF)
 *  singleStocks  → Equal-weight average of all SMI single stocks (CHF)
 *  fx            → USDCHF rate change (CHF investor holding USD basket)
 */

const fs   = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '../PostFinance-START-Hack-2026')
const OUT_FILE = path.join(__dirname, '../src/data/assetData.js')

// ── CSV helpers ───────────────────────────────────────────────────────────────
function parseDate(str) {
  // DD/MM/YYYY
  const [d, m, y] = str.trim().split('/')
  return new Date(+y, +m - 1, +d)
}

function parseNum(str) {
  if (!str) return null
  const s = str.trim().replace(/^"|"$/g, '').trim()   // strip surrounding quotes
  if (s === '#N/A' || s === '') return null
  // Remove thousands separators (e.g. "7,917.1" → "7917.1")
  const cleaned = s.replace(/,(?=\d)/g, '')
  const n = parseFloat(cleaned)
  return isNaN(n) ? null : n
}

// Proper CSV line splitter — handles quoted fields containing commas
function splitCSVLine(line) {
  const cols = []
  let cur = '', inQ = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') { inQ = !inQ }
    else if (ch === ',' && !inQ) { cols.push(cur); cur = '' }
    else { cur += ch }
  }
  cols.push(cur)
  return cols
}

function readCSV(filename, skipRows = 1) {
  const raw  = fs.readFileSync(path.join(DATA_DIR, filename), 'utf8')
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean)
  const headers = splitCSVLine(lines[skipRows - 1])
  const rows = []
  for (let i = skipRows; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i])
    const date = parseDate(cols[0])
    if (isNaN(date.getTime())) continue
    rows.push({ date, cols })
  }
  return { headers, rows }
}

// ── Build year-end price maps ─────────────────────────────────────────────────
// Returns a map: year → last available value (closing price of last trading day)
function yearEndMap(rows, colIdx) {
  const byYear = {}
  for (const { date, cols } of rows) {
    const yr  = date.getFullYear()
    const val = parseNum(cols[colIdx])
    if (val !== null) byYear[yr] = val   // keep overwriting → last value wins
  }
  return byYear
}

// Annual return % from year-end prices
function annualReturns(yMap, years) {
  return years.map(y => {
    const prev = yMap[y - 1]
    const curr = yMap[y]
    if (!prev || !curr) return null
    return +((curr / prev - 1) * 100).toFixed(2)
  })
}

// Average of multiple annual-return series (ignore nulls per year)
function avgReturns(seriesList, years) {
  return years.map((_, i) => {
    const vals = seriesList.map(s => s[i]).filter(v => v !== null)
    if (!vals.length) return null
    return +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2)
  })
}

// ── Load files ────────────────────────────────────────────────────────────────
const bonds_csv   = readCSV('Market_Data - Bonds.csv', 1)
const gold_csv    = readCSV('Market_Data - Gold.csv', 1)
const equity_csv  = readCSV('Market_Data - Equity Indices.csv', 1)
const fx_csv      = readCSV('Market_Data - FX.csv', 1)
const smi_csv     = readCSV('Market_Data - SMI_Single Stocks.csv', 2)
// Note: SMI single stocks has 2 header rows (company name + ticker), skipRows=2

const YEARS = [2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]

// ── bonds: Swiss Bond AAA-BBB Total Return Index (col 1) ──────────────────────
const bondMap  = yearEndMap(bonds_csv.rows, 1)
// Bloomberg Global Agg (col 2) as fallback / blend for early years
const bondMap2 = yearEndMap(bonds_csv.rows, 2)
// Use Swiss bond where available, else Bloomberg Agg
const blendedBondMap = {}
for (const y of [...new Set([...Object.keys(bondMap), ...Object.keys(bondMap2)].map(Number))]) {
  blendedBondMap[y] = bondMap[y] ?? bondMap2[y]
}
const bondsReturns = annualReturns(blendedBondMap, YEARS)

// ── gold: Gold in CHF (col 2) ─────────────────────────────────────────────────
const goldMap     = yearEndMap(gold_csv.rows, 2)
const goldReturns = annualReturns(goldMap, YEARS)

// ── smiStocks: SMI Price Return (col 1 in equity_csv) ────────────────────────
const smiMap     = yearEndMap(equity_csv.rows, 1)
const smiReturns = annualReturns(smiMap, YEARS)

// ── equityIndices: DJIA (col 3) × FX-adjusted to CHF ─────────────────────────
// Build combined USD→CHF year-end map: DJIA_CHF = DJIA_USD / USDCHF
// (USDCHF = CHF per 1 USD; if USDCHF drops, USD weakens → less CHF return)
const djiaMap  = yearEndMap(equity_csv.rows, 3)   // DJIA in USD
const usdchfMap = yearEndMap(fx_csv.rows, 1)       // USDCHF (CHF per 1 USD)

// DJIA in CHF terms = DJIA_USD / USDCHF_inverted
// If USDCHF = 0.9 (1 USD = 0.9 CHF), to get CHF return:
// CHF_return = (DJIA_end/DJIA_start) * (USDCHF_end/USDCHF_start) - 1
const equityReturns = YEARS.map(y => {
  const d0 = djiaMap[y-1], d1 = djiaMap[y]
  const f0 = usdchfMap[y-1], f1 = usdchfMap[y]
  if (!d0 || !d1 || !f0 || !f1) return null
  return +((d1/d0 * f1/f0 - 1) * 100).toFixed(2)
})

// ── singleStocks: equal-weight SMI single stocks ──────────────────────────────
// smi_csv.rows, col indices 1..20 (skipping col 0 = date)
const smiStockCount = smi_csv.headers.length - 1
const smiStockSeries = []
for (let col = 1; col <= smiStockCount; col++) {
  const m = yearEndMap(smi_csv.rows, col)
  const r = annualReturns(m, YEARS)
  smiStockSeries.push(r)
}
const singleStocksReturns = avgReturns(smiStockSeries, YEARS)

// ── fx: USDCHF annual change ─────────────────────────────────────────────────
// Positive = USD strengthened vs CHF = CHF investor profits
// USDCHF = how many CHF per 1 USD; if it rises, 1 USD buys more CHF = gain for USD holder in CHF terms
const fxReturns = annualReturns(usdchfMap, YEARS)

// ── Helper stats ──────────────────────────────────────────────────────────────
function avg(arr) {
  const valid = arr.filter(v => v !== null)
  return +(valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2)
}
function stddev(arr) {
  const valid = arr.filter(v => v !== null)
  const mean  = valid.reduce((a, b) => a + b, 0) / valid.length
  const variance = valid.reduce((a, b) => a + (b - mean) ** 2, 0) / valid.length
  return +Math.sqrt(variance).toFixed(2)
}
function fmt(arr) {
  return arr.map(v => v === null ? 'null' : v)
}

// ── Log for inspection ────────────────────────────────────────────────────────
console.log('\nYears:', YEARS)
console.log('Bonds:        ', fmt(bondsReturns))
console.log('Gold:         ', fmt(goldReturns))
console.log('SMI:          ', fmt(smiReturns))
console.log('Equity (CHF): ', fmt(equityReturns))
console.log('SingleStocks: ', fmt(singleStocksReturns))
console.log('FX (USDCHF):  ', fmt(fxReturns))

// ── Write assetData.js ────────────────────────────────────────────────────────
const output = `// Annual returns computed from PostFinance market data (daily prices 2006–2026)
// Recomputed by scripts/processMarketData.js — do not edit manually

export const YEARS = ${JSON.stringify(YEARS)}

export const ASSET_CLASSES = {
  bonds: {
    id: 'bonds',
    label: 'Bonds',
    description: 'Swiss & global government/corporate bonds. Stable, low-risk income.',
    color: '#60a5fa',
    unlockOrder: 1,
    returns: ${JSON.stringify(fmt(bondsReturns))},
    avgReturn: ${avg(bondsReturns.filter(v => v !== null))},
    volatility: ${stddev(bondsReturns.filter(v => v !== null))},
  },
  gold: {
    id: 'gold',
    label: 'Gold',
    description: 'The classic safe-haven commodity. Protects against uncertainty but earns no income.',
    color: '#fbbf24',
    unlockOrder: 2,
    returns: ${JSON.stringify(fmt(goldReturns))},
    avgReturn: ${avg(goldReturns.filter(v => v !== null))},
    volatility: ${stddev(goldReturns.filter(v => v !== null))},
  },
  smiStocks: {
    id: 'smiStocks',
    label: 'SMI Stocks',
    description: 'Swiss Market Index top companies: Nestlé, Novartis, Roche, UBS and more.',
    color: '#f97316',
    unlockOrder: 3,
    returns: ${JSON.stringify(fmt(smiReturns))},
    avgReturn: ${avg(smiReturns.filter(v => v !== null))},
    volatility: ${stddev(smiReturns.filter(v => v !== null))},
  },
  equityIndices: {
    id: 'equityIndices',
    label: 'Equity Indices',
    description: 'Global equity index funds (MSCI World, S&P 500). Broad diversification.',
    color: '#4ade80',
    unlockOrder: 4,
    returns: ${JSON.stringify(fmt(equityReturns))},
    avgReturn: ${avg(equityReturns.filter(v => v !== null))},
    volatility: ${stddev(equityReturns.filter(v => v !== null))},
  },
  singleStocks: {
    id: 'singleStocks',
    label: 'Single Stocks',
    description: 'Individual company stocks. High potential returns but significant company-specific risk.',
    color: '#a78bfa',
    unlockOrder: 5,
    returns: ${JSON.stringify(fmt(singleStocksReturns))},
    avgReturn: ${avg(singleStocksReturns.filter(v => v !== null))},
    volatility: ${stddev(singleStocksReturns.filter(v => v !== null))},
  },
  fx: {
    id: 'fx',
    label: 'FX',
    description: 'Foreign exchange currencies. Complex, professional-level trading.',
    color: '#22d3ee',
    unlockOrder: 6,
    returns: ${JSON.stringify(fmt(fxReturns))},
    avgReturn: ${avg(fxReturns.filter(v => v !== null))},
    volatility: ${stddev(fxReturns.filter(v => v !== null))},
  },
}

export const ASSET_ORDER = ['bonds', 'gold', 'smiStocks', 'equityIndices', 'singleStocks', 'fx']

export const SAVINGS_RATE = 0.5 // Swiss savings account benchmark %
`

fs.writeFileSync(OUT_FILE, output)
console.log('\n✅ Written to', OUT_FILE)
