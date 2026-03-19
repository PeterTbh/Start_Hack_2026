import { logoutUser } from '../../firebase/auth'
import { useAuth } from '../../hooks/useAuth.jsx'
import { ASSET_ORDER } from '../../data/assetData'
import { GAME_END_YEAR, GAME_START_YEAR } from '../../data/stockData'
import { getPrice } from '../../firebase/firestore'

export default function Header({ onOpenLeaderboard, onOpenLibrary, currentYear, yearProgress = 0, isFinished, onRestart, onFireDrill, onNewGame, simPaused, onToggleSim, speedMode, onToggleSpeed }) {
  const { user, userData } = useAuth()
  const unlockedCount = userData?.unlockedAreas?.length || 0
  const cash          = userData?.cash ?? userData?.capital ?? 10000
  const totalYears    = GAME_END_YEAR - GAME_START_YEAR

  // Portfolio value + overall return
  const portfolio = userData?.portfolio || {}
  let portfolioValue    = 0
  let portfolioInvested = 0
  for (const [instId, h] of Object.entries(portfolio)) {
    if ((h.shares || 0) > 0) {
      const price = getPrice(instId, currentYear)
      portfolioValue    += h.shares * price
      portfolioInvested += (h.avgPurchasePrice || price) * h.shares
    }
  }
  const portfolioGain   = portfolioValue - portfolioInvested
  const portfolioRetPct = portfolioInvested > 0 ? (portfolioGain / portfolioInvested) * 100 : null
  const totalNetWorth   = cash + portfolioValue

  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-slate-900/80 backdrop-blur border-b border-slate-700/50">
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🏙️</span>
          <span className="font-black text-white text-lg tracking-tight">
            Wealth<span className="text-green-400">City</span>
          </span>
        </div>

        {/* Center stats */}
        <div className="flex items-center gap-3">
          <Stat icon="💰" label="Cash" value={`CHF ${cash.toLocaleString('de-CH', { maximumFractionDigits: 0 })}`} color="text-green-400" />
          <PortfolioStat netWorth={totalNetWorth} returnPct={portfolioRetPct} gain={portfolioGain} />

          {/* Year with progress bar + play/pause */}
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <span className="text-sm">📅</span>
            <div>
              <div className="text-slate-500 text-[10px] leading-none mb-0.5">Year</div>
              <div className="text-blue-400 text-xs font-bold leading-tight">{currentYear}</div>
            </div>
            <div className="ml-1.5 w-16 flex flex-col gap-0.5">
              <div className="flex justify-between text-[9px] text-slate-600">
                <span>{GAME_START_YEAR}</span><span>{GAME_END_YEAR}</span>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-none"
                  style={{ width: `${((currentYear - GAME_START_YEAR) / totalYears) * 100}%` }}
                />
              </div>
              {!isFinished && (
                <div className="h-0.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400/60 rounded-full transition-none"
                    style={{ width: `${yearProgress * 100}%` }}
                  />
                </div>
              )}
            </div>
            {/* Play / Pause */}
            {!isFinished && (
              <button
                onClick={onToggleSim}
                title={simPaused ? 'Start simulation' : 'Pause simulation'}
                className={`ml-1.5 w-7 h-7 rounded-md flex items-center justify-center text-sm font-bold transition-all border ${
                  simPaused
                    ? 'bg-green-600 hover:bg-green-500 border-green-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-300'
                }`}
              >
                {simPaused ? '▶' : '⏸'}
              </button>
            )}
            {/* Restart to beginning */}
            <button
              onClick={onRestart}
              title={`Reset to ${GAME_START_YEAR}`}
              className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-all border bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-400 hover:text-white"
            >
              ↺
            </button>
          </div>

          <Stat icon="🏛️" label="Markets" value={`${unlockedCount}/${ASSET_ORDER.length}`} color="text-purple-400" />
          <Stat icon="👤" label="Player" value={user?.displayName || 'Investor'} color="text-slate-300" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isFinished && <span className="text-slate-400 text-xs px-2">📊 {GAME_END_YEAR} — final year</span>}
          <button
            onClick={onToggleSpeed}
            title={speedMode ? 'Switch to normal speed (5s/year)' : 'Demo mode: 0.5s per year'}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              speedMode
                ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-yellow-300 shadow-[0_0_12px_#facc15aa]'
                : 'bg-slate-800 hover:bg-yellow-900/40 text-yellow-400 border-slate-700 hover:border-yellow-500/60'
            }`}
          >
            ⚡ {speedMode ? 'DEMO ON' : 'Demo'}
          </button>
          <button onClick={onFireDrill} className="px-3 py-1.5 rounded-lg bg-orange-900/60 hover:bg-orange-800/70 text-orange-300 text-xs font-semibold border border-orange-700/60 hover:border-orange-500 transition-all" title="Test your portfolio diversification">
            🔥 Fire Drill
          </button>
          <button onClick={onRestart} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all" title="Reset year back to 2007">
            🔄 Restart
          </button>
          <button onClick={onNewGame} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-300 text-xs font-semibold border border-slate-700 hover:border-red-700/60 transition-all" title="Wipe all progress and start fresh">
            🗑️ New Game
          </button>
          <button onClick={onOpenLibrary} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all">
            📚 Library
          </button>
          <button onClick={onOpenLeaderboard} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all">
            🏆
          </button>
          <button onClick={logoutUser} className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 text-xs transition-all">
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}

function Stat({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
      <span className="text-sm">{icon}</span>
      <div>
        <div className="text-slate-500 text-[10px] leading-none">{label}</div>
        <div className={`text-xs font-bold leading-tight ${color}`}>{value}</div>
      </div>
    </div>
  )
}

function PortfolioStat({ netWorth, returnPct, gain }) {
  const hasReturn = returnPct !== null
  const positive  = gain >= 0
  const retColor  = positive ? 'text-green-400' : 'text-red-400'
  const retBorder = positive ? 'border-green-700/40' : 'border-red-700/40'

  return (
    <div className={`flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border ${hasReturn ? retBorder : 'border-slate-700/50'}`}>
      <span className="text-sm">📊</span>
      <div>
        <div className="text-slate-500 text-[10px] leading-none">Net Worth</div>
        <div className="text-white text-xs font-bold leading-tight">
          CHF {netWorth.toLocaleString('de-CH', { maximumFractionDigits: 0 })}
        </div>
      </div>
      {hasReturn && (
        <div className={`text-xs font-black leading-tight pl-2 border-l border-slate-700 ${retColor}`}>
          {positive ? '+' : ''}{returnPct.toFixed(1)}%
        </div>
      )}
    </div>
  )
}
