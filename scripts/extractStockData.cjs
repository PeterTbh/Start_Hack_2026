#!/usr/bin/env node
/**
 * Extracts individual instrument year-end prices from PostFinance CSVs
 * → outputs src/data/stockData.js
 *
 * Districts:
 *  bonds         → Swiss Bond AAA-BBB + Bloomberg Global Agg
 *  gold          → Gold in CHF
 *  smiStocks     → 8 SMI stocks (CHF)
 *  equityIndices → 4 global indices (CHF-converted where possible)
 *  singleStocks  → 8 DJIA stocks (USD → need USDCHF)
 *  fx            → USDCHF, EURCHF rate (CHF per foreign unit)
 */

const fs   = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '../PostFinance-START-Hack-2026')
const OUT_FILE = path.join(__dirname, '../src/data/stockData.js')

const YEARS = Array.from({ length: 19 }, (_, i) => 2007 + i) // 2007-2025

// ── CSV helpers ───────────────────────────────────────────────────────────────
function parseDate(str) {
  const [d, m, y] = str.trim().split('/')
  return new Date(+y, +m - 1, +d)
}
function parseNum(str) {
  if (!str) return null
  const s = str.trim().replace(/^"|"$/g, '').trim()
  if (s === '#N/A' || s === '') return null
  const n = parseFloat(s.replace(/,(?=\d)/g, ''))
  return isNaN(n) ? null : n
}
function splitCSV(line) {
  const cols = []; let cur = '', inQ = false
  for (const ch of line) {
    if (ch === '"') inQ = !inQ
    else if (ch === ',' && !inQ) { cols.push(cur); cur = '' }
    else cur += ch
  }
  cols.push(cur)
  return cols
}

function readRows(filename, dataStartRow = 1) {
  const lines = fs.readFileSync(path.join(DATA_DIR, filename), 'utf8')
    .split('\n').map(l => l.trim()).filter(Boolean)
  const rows = []
  for (let i = dataStartRow; i < lines.length; i++) {
    const cols = splitCSV(lines[i])
    const date = parseDate(cols[0])
    if (isNaN(date.getTime())) continue
    rows.push({ date, year: date.getFullYear(), cols })
  }
  return rows
}

// Year-end value = last value seen for each year
function yearEnd(rows, colIdx) {
  const m = {}
  for (const { year, cols } of rows) {
    const v = parseNum(cols[colIdx])
    if (v !== null) m[year] = v
  }
  return m
}

// Filter to game years, fill gaps with nearest prior year
function filteredPrices(map) {
  const out = {}
  let last = null
  for (const y of YEARS) {
    if (map[y] != null) last = map[y]
    if (last != null) out[y] = +last.toFixed(4)
  }
  return out
}

// ── Load raw rows ─────────────────────────────────────────────────────────────
const bondRows   = readRows('Market_Data - Bonds.csv', 1)
const goldRows   = readRows('Market_Data - Gold.csv', 1)
const equityRows = readRows('Market_Data - Equity Indices.csv', 1)
const fxRows     = readRows('Market_Data - FX.csv', 1)
const smiRows    = readRows('Market_Data - SMI_Single Stocks.csv', 2)   // skip 2 header rows
const djiaRows   = readRows('Market_Data - DJIA_Single Stocks.csv', 2)

// Read tickers for multi-stock files
function getTickers(filename, tickerRow = 1) {
  const lines = fs.readFileSync(path.join(DATA_DIR, filename), 'utf8')
    .split('\n').map(l => l.trim()).filter(Boolean)
  return splitCSV(lines[tickerRow]).slice(1) // skip date col
}
function getNames(filename, nameRow = 0) {
  const lines = fs.readFileSync(path.join(DATA_DIR, filename), 'utf8')
    .split('\n').map(l => l.trim()).filter(Boolean)
  return splitCSV(lines[nameRow]).slice(1)
}

const smiTickers = getTickers('Market_Data - SMI_Single Stocks.csv', 1)
const smiNames   = getNames('Market_Data - SMI_Single Stocks.csv', 0)
const djiaTickers = getTickers('Market_Data - DJIA_Single Stocks.csv', 1)
const djiaNames   = getNames('Market_Data - DJIA_Single Stocks.csv', 0)

// ── FX year-end maps (needed for USD/EUR→CHF conversion) ─────────────────────
const usdchfMap = filteredPrices(yearEnd(fxRows, 1))
const eurchfMap = filteredPrices(yearEnd(fxRows, 2))

// Convert USD prices to CHF using year-end USDCHF rate
function toChfPrices(pricesUSD) {
  const out = {}
  for (const y of YEARS) {
    const p = pricesUSD[y], fx = usdchfMap[y]
    if (p != null && fx != null) out[y] = +(p * fx).toFixed(4)
  }
  return out
}

// ── Build instruments ─────────────────────────────────────────────────────────
const instruments = {}

// ── bonds ─────────────────────────────────────────────────────────────────────
instruments['SWISS_BOND'] = {
  name: 'Swiss Bond Index',
  description: 'Swiss investment-grade bonds (AAA–BBB). Capital preservation, steady income.',
  districtId: 'bonds',
  currency: 'CHF',
  pricesByYear: filteredPrices(yearEnd(bondRows, 1)),
}
instruments['GLOBAL_BOND'] = {
  name: 'Bloomberg Global Agg',
  description: 'Global bonds, CHF-hedged. Broad fixed-income diversification.',
  districtId: 'bonds',
  currency: 'CHF',
  pricesByYear: filteredPrices(yearEnd(bondRows, 2)),
}

// ── gold ──────────────────────────────────────────────────────────────────────
instruments['GOLD_CHF'] = {
  name: 'Gold (CHF)',
  description: 'Safe-haven commodity. No income, but protects against uncertainty.',
  districtId: 'gold',
  currency: 'CHF',
  pricesByYear: filteredPrices(yearEnd(goldRows, 2)), // col 2 = CHF price
}

// ── equityIndices ─────────────────────────────────────────────────────────────
// SMI already CHF; DJIA in USD → convert; DAX/EuroStoxx in EUR → convert; Nikkei JPY → skip
const smiIdxRaw  = filteredPrices(yearEnd(equityRows, 1))
const stoxxRaw   = yearEnd(equityRows, 2) // EUR
const djiaIdxRaw = yearEnd(equityRows, 3) // USD
const daxRaw     = yearEnd(equityRows, 5) // EUR (DAX is col 5)

// Convert EUR indices using EURCHF
function toChfFromEurPrices(pricesEUR) {
  const out = {}
  for (const y of YEARS) {
    const p = pricesEUR[y], fx = eurchfMap[y]
    if (p != null && fx != null) out[y] = +(p * fx).toFixed(4)
  }
  return out
}

instruments['IDX_SMI'] = {
  name: 'SMI (Swiss Market Index)',
  description: 'Top 20 Swiss large-cap companies. Blue-chip Swiss equities.',
  districtId: 'equityIndices',
  currency: 'CHF',
  pricesByYear: smiIdxRaw,
}
instruments['IDX_DJIA'] = {
  name: 'Dow Jones (USD→CHF)',
  description: '30 major US companies. Worlds most followed stock index.',
  districtId: 'equityIndices',
  currency: 'CHF', // pre-converted
  pricesByYear: toChfPrices(filteredPrices(djiaIdxRaw)),
}
instruments['IDX_DAX'] = {
  name: 'DAX (EUR→CHF)',
  description: '40 major German companies. Europes benchmark index.',
  districtId: 'equityIndices',
  currency: 'CHF',
  pricesByYear: toChfFromEurPrices(filteredPrices(daxRaw)),
}
instruments['IDX_STOXX'] = {
  name: 'EuroStoxx 50 (EUR→CHF)',
  description: '50 leading Eurozone companies. Pan-European diversification.',
  districtId: 'equityIndices',
  currency: 'CHF',
  pricesByYear: toChfFromEurPrices(filteredPrices(stoxxRaw)),
}

// ── smiStocks ─────────────────────────────────────────────────────────────────
// Pick 8 well-known SMI companies: Nestlé, Roche, Novartis, UBS, ABB, Richemont, Zurich Ins., Swiss Re
const SMI_PICKS = ['NESN-CH', 'ROG-CH', 'NOVN-CH', 'UBSG-CH', 'ABBN-CH', 'CFR-CH', 'ZURN-CH', 'SREN-CH']
const SMI_DESCRIPTIONS = {
  'NESN-CH': 'Nestlé. World\'s largest food & beverage company.',
  'ROG-CH':  'Roche. Global leader in oncology and diagnostics.',
  'NOVN-CH': 'Novartis. Innovative medicines & generics.',
  'UBSG-CH': 'UBS. Switzerland\'s largest bank.',
  'ABBN-CH': 'ABB. Electrification & automation technology.',
  'CFR-CH':  'Richemont. Cartier, IWC and luxury brands.',
  'ZURN-CH': 'Zurich Insurance. Global insurance giant.',
  'SREN-CH': 'Swiss Re. World\'s leading reinsurer.',
}
for (let i = 0; i < smiTickers.length; i++) {
  const ticker = smiTickers[i]?.trim()
  if (!SMI_PICKS.includes(ticker)) continue
  const shortId = ticker.replace('-CH', '')
  instruments[shortId] = {
    name: smiNames[i]?.trim().replace(/^"/, '').replace(/"$/, '') || ticker,
    description: SMI_DESCRIPTIONS[ticker] || '',
    districtId: 'smiStocks',
    currency: 'CHF',
    pricesByYear: filteredPrices(yearEnd(smiRows, i + 1)),
  }
}

// ── singleStocks (DJIA) ───────────────────────────────────────────────────────
// Pick 8 well-known: Apple, Microsoft, NVIDIA, Amazon, McDonald's, Coca-Cola, Goldman Sachs, Nike
const DJIA_PICKS = ['AAPL-US', 'MSFT-US', 'NVDA-US', 'AMZN-US', 'MCD-US', 'KO-US', 'GS-US', 'NKE-US']
const DJIA_DESCRIPTIONS = {
  'AAPL-US': 'Apple. iPhone, Mac, and services ecosystem.',
  'MSFT-US': 'Microsoft. Windows, Azure cloud, and Office.',
  'NVDA-US': 'NVIDIA. GPUs powering AI and gaming.',
  'AMZN-US': 'Amazon. E-commerce and AWS cloud giant.',
  'MCD-US':  'McDonald\'s. World\'s largest fast food chain.',
  'KO-US':   'Coca-Cola. Iconic global beverage brand.',
  'GS-US':   'Goldman Sachs. Premier investment bank.',
  'NKE-US':  'Nike. World\'s leading sportswear brand.',
}
for (let i = 0; i < djiaTickers.length; i++) {
  const ticker = djiaTickers[i]?.trim()
  if (!DJIA_PICKS.includes(ticker)) continue
  const shortId = ticker.replace('-US', '')
  const rawPrices = filteredPrices(yearEnd(djiaRows, i + 1))
  instruments[shortId] = {
    name: djiaNames[i]?.trim().replace(/^"/, '').replace(/"$/, '') || ticker,
    description: DJIA_DESCRIPTIONS[ticker] || '',
    districtId: 'singleStocks',
    currency: 'CHF', // pre-converted
    pricesByYear: toChfPrices(rawPrices),
  }
}

// ── fx ────────────────────────────────────────────────────────────────────────
// FX: price = how many CHF you get per 1 foreign unit
// "Buying" USD/CHF means holding USD; value in CHF = shares × rate
instruments['FX_USDCHF'] = {
  name: 'USD / CHF',
  description: 'Hold US Dollars. Gain if USD strengthens vs CHF.',
  districtId: 'fx',
  currency: 'CHF',
  pricesByYear: { ...usdchfMap }, // rate itself IS the CHF price per 1 USD "share"
}
instruments['FX_EURCHF'] = {
  name: 'EUR / CHF',
  description: 'Hold Euros. Gain if EUR strengthens vs CHF.',
  districtId: 'fx',
  currency: 'CHF',
  pricesByYear: { ...eurchfMap },
}

// ── Validate & summarize ──────────────────────────────────────────────────────
console.log('\nInstruments extracted:')
for (const [id, inst] of Object.entries(instruments)) {
  const years = Object.keys(inst.pricesByYear)
  const first = years[0], last = years[years.length - 1]
  console.log(`  ${id.padEnd(14)} ${inst.districtId.padEnd(16)} ${years.length} years (${first}-${last})`)
}

// ── Write stockData.js ────────────────────────────────────────────────────────
const output = `// Individual instrument prices by year — generated by scripts/extractStockData.cjs
// DO NOT edit manually — re-run the script to regenerate

export const GAME_YEARS = ${JSON.stringify(YEARS)}
export const GAME_START_YEAR = ${YEARS[0]}
export const GAME_END_YEAR   = ${YEARS[YEARS.length - 1]}

export const INSTRUMENTS = ${JSON.stringify(instruments, null, 2)}

// FX rates for reference (CHF per foreign unit, year-end)
export const USDCHF_BY_YEAR = ${JSON.stringify(usdchfMap, null, 2)}
export const EURCHF_BY_YEAR = ${JSON.stringify(eurchfMap, null, 2)}

// Which instruments belong to each district
export const DISTRICT_INSTRUMENTS = {
  bonds:         ['SWISS_BOND', 'GLOBAL_BOND'],
  gold:          ['GOLD_CHF'],
  smiStocks:     ['NESN', 'ROG', 'NOVN', 'UBSG', 'ABBN', 'CFR', 'ZURN', 'SREN'],
  equityIndices: ['IDX_SMI', 'IDX_DJIA', 'IDX_DAX', 'IDX_STOXX'],
  singleStocks:  ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'MCD', 'KO', 'GS', 'NKE'],
  fx:            ['FX_USDCHF', 'FX_EURCHF'],
}
`
fs.writeFileSync(OUT_FILE, output)
console.log('\n✅ Written to', OUT_FILE)
