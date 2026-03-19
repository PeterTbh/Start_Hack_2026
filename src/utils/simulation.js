import { ASSET_CLASSES, YEARS, SAVINGS_RATE } from '../data/assetData'

/**
 * Run year-by-year simulation
 * @param {Object} allocation - { bonds: 20, gold: 10, ... } (must sum to 100)
 * @param {number} startingCapital - CHF amount
 * @returns {Object} simulation result
 */
export function runSimulation(allocation, startingCapital) {
  const yearlyResults = []
  let portfolioValue = startingCapital
  let benchmarkValue = startingCapital
  const numYears = YEARS.length

  for (let i = 0; i < numYears; i++) {
    const year = YEARS[i]
    let yearReturn = 0

    // Calculate weighted return for the year
    for (const [assetId, weight] of Object.entries(allocation)) {
      if (weight > 0 && ASSET_CLASSES[assetId]) {
        const assetReturn = ASSET_CLASSES[assetId].returns[i]
        yearReturn += (weight / 100) * (assetReturn / 100)
      }
    }

    const prevValue = portfolioValue
    portfolioValue = portfolioValue * (1 + yearReturn)
    benchmarkValue = benchmarkValue * (1 + SAVINGS_RATE / 100)

    // Determine if earthquake happens
    // Earthquake if: year return < -8% AND Herfindahl > 0.4 (concentrated)
    const hhi = calculateHerfindahl(allocation)
    const earthquake = yearReturn < -0.08 && hhi > 0.4

    // Building health: how well the city area is doing
    const buildingStates = {}
    for (const [assetId, weight] of Object.entries(allocation)) {
      if (weight > 0 && ASSET_CLASSES[assetId]) {
        const r = ASSET_CLASSES[assetId].returns[i]
        buildingStates[assetId] = r > 10 ? 'boom' : r > 0 ? 'ok' : r > -10 ? 'down' : 'crisis'
      }
    }

    yearlyResults.push({
      year,
      yearReturn: yearReturn * 100,
      portfolioValue: Math.round(portfolioValue),
      benchmarkValue: Math.round(benchmarkValue),
      earthquake,
      buildingStates,
      changeFromPrev: Math.round(portfolioValue - prevValue),
    })
  }

  const score = calculateScore(allocation, yearlyResults, startingCapital)

  return {
    yearlyResults,
    finalValue: Math.round(portfolioValue),
    benchmarkFinalValue: Math.round(benchmarkValue),
    totalReturn: ((portfolioValue - startingCapital) / startingCapital * 100).toFixed(1),
    benchmarkReturn: ((benchmarkValue - startingCapital) / startingCapital * 100).toFixed(1),
    score,
    allocation,
  }
}

/**
 * Herfindahl-Hirschman Index — measures concentration
 * 1.0 = fully concentrated, 0.0 = perfectly spread
 */
export function calculateHerfindahl(allocation) {
  let hhi = 0
  for (const weight of Object.values(allocation)) {
    hhi += Math.pow(weight / 100, 2)
  }
  return hhi
}

/**
 * Multi-factor scoring
 * Max 1000 points
 */
export function calculateScore(allocation, yearlyResults, startingCapital) {
  const finalValue = yearlyResults[yearlyResults.length - 1].portfolioValue
  const hhi = calculateHerfindahl(allocation)
  const numAssets = Object.values(allocation).filter(w => w > 0).length

  // 1. Returns score (max 250): vs savings benchmark
  const totalReturn = (finalValue - startingCapital) / startingCapital
  const savingsReturn = Math.pow(1 + SAVINGS_RATE / 100, 15) - 1
  const excessReturn = totalReturn - savingsReturn
  const returnScore = Math.min(250, Math.max(0, excessReturn * 500))

  // 2. Diversification score (max 250): reward using multiple asset classes
  // Perfect: equally spread across all 6 = HHI of 1/6 ≈ 0.167
  const diversificationScore = Math.max(0, 250 * (1 - (hhi - 1 / 6) / (1 - 1 / 6)))

  // 3. Volatility/risk score (max 250): penalise big drawdowns
  let maxDrawdown = 0
  let peak = startingCapital
  for (const yr of yearlyResults) {
    if (yr.portfolioValue > peak) peak = yr.portfolioValue
    const drawdown = (peak - yr.portfolioValue) / peak
    if (drawdown > maxDrawdown) maxDrawdown = drawdown
  }
  const volatilityScore = Math.max(0, 250 * (1 - maxDrawdown * 2))

  // 4. Long-term behaviour score (max 150): penalise having any asset at 0 (ignoring locked)
  const zeroAssets = Object.values(allocation).filter(w => w === 0).length
  const ltScore = Math.max(0, 150 - zeroAssets * 15)

  // 5. Risk profile score (max 100): penalise extreme concentration in high-vol assets
  const highVolAssets = ['singleStocks', 'fx']
  let highVolWeight = 0
  for (const a of highVolAssets) {
    highVolWeight += (allocation[a] || 0)
  }
  const riskProfileScore = highVolWeight > 60 ? Math.max(0, 100 - (highVolWeight - 60) * 2) : 100

  const total = Math.round(returnScore + diversificationScore + volatilityScore + ltScore + riskProfileScore)

  return {
    total: Math.min(1000, total),
    breakdown: {
      returns: Math.round(returnScore),
      diversification: Math.round(diversificationScore),
      volatility: Math.round(volatilityScore),
      longTerm: Math.round(ltScore),
      riskProfile: Math.round(riskProfileScore),
    },
  }
}

export function getScoreGrade(total) {
  if (total >= 850) return { grade: 'S', label: 'Expert Investor', color: '#fbbf24' }
  if (total >= 700) return { grade: 'A', label: 'Savvy Investor', color: '#4ade80' }
  if (total >= 550) return { grade: 'B', label: 'Learning Well', color: '#60a5fa' }
  if (total >= 400) return { grade: 'C', label: 'Needs Work', color: '#fb923c' }
  return { grade: 'D', label: 'Too Risky', color: '#f87171' }
}
