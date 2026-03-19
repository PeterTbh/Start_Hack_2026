// Annual returns computed from PostFinance market data (daily prices 2006–2026)
// Recomputed by scripts/processMarketData.js — do not edit manually

export const YEARS = [2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]

export const ASSET_CLASSES = {
  bonds: {
    id: 'bonds',
    label: 'Bonds',
    description: 'Swiss & global government/corporate bonds. Stable, low-risk income.',
    color: '#60a5fa',
    unlockOrder: 1,
    returns: [-0.49,4.53,6.4,3.65,4.83,4.21,-1.3,6.82,1.77,1.32,0.13,0.07,3.05,0.9,-1.82,-12.1,7.36,5.35,-0.09],
    avgReturn: 1.82,
    volatility: 4.28,
  },
  gold: {
    id: 'gold',
    label: 'Gold',
    description: 'The classic safe-haven commodity. Protects against uncertainty but earns no income.',
    color: '#fbbf24',
    unlockOrder: 2,
    returns: [21.9,-0.5,20.38,17,10.54,4.7,-30.27,10.05,-9.78,10.12,8.91,-1.01,16.76,13.73,-0.49,1.11,3.1,37.27,43.83],
    avgReturn: 9.33,
    volatility: 15.81,
  },
  smiStocks: {
    id: 'smiStocks',
    label: 'SMI Stocks',
    description: 'Swiss Market Index top companies: Nestlé, Novartis, Roche, UBS and more.',
    color: '#f97316',
    unlockOrder: 3,
    returns: [-3.43,-34.77,18.27,-1.68,-7.77,14.93,20.24,9.51,-1.84,-6.78,14.14,-10.15,25.95,0.82,20.29,-16.67,3.81,4.16,14.37],
    avgReturn: 3.34,
    volatility: 14.66,
  },
  equityIndices: {
    id: 'equityIndices',
    label: 'Equity Indices',
    description: 'Global equity index funds (MSCI World, S&P 500). Broad diversification.',
    color: '#4ade80',
    unlockOrder: 4,
    returns: [-1.42,-37.94,15.46,0.18,6.74,4.97,22.38,19.6,-1.25,15.69,18.95,-3.69,19.87,-2.7,22.78,-6.78,2.7,22.29,-1.93],
    avgReturn: 6.1,
    volatility: 14.55,
  },
  singleStocks: {
    id: 'singleStocks',
    label: 'Single Stocks',
    description: 'Individual company stocks. High potential returns but significant company-specific risk.',
    color: '#a78bfa',
    unlockOrder: 5,
    returns: [4.05,-40.31,30.48,9.92,-15.88,18,29.82,14.33,4.77,7.39,20.89,-10.08,30.11,10.55,26.96,-18.51,16.19,9.46,10.41],
    avgReturn: 8.34,
    volatility: 18.03,
  },
  fx: {
    id: 'fx',
    label: 'FX',
    description: 'Foreign exchange currencies. Complex, professional-level trading.',
    color: '#22d3ee',
    unlockOrder: 6,
    returns: [-7.38,-6.19,-2.83,-9.71,1.08,-2.13,-3.26,11.24,1.01,2,-4.9,2.06,-2.02,-9.28,3.41,2.2,-9.68,8.33,-13.19],
    avgReturn: -2.07,
    volatility: 6.21,
  },
}

export const ASSET_ORDER = ['bonds', 'gold', 'smiStocks', 'equityIndices', 'singleStocks', 'fx']

export const SAVINGS_RATE = 0.5 // Swiss savings account benchmark %
