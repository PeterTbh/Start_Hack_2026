import { useMemo } from 'react'
import { ASSET_ORDER } from '../../data/assetData'
import { DISTRICT_INSTRUMENTS, INSTRUMENTS } from '../../data/stockData'
import { getPrice } from '../../firebase/firestore'

const TROPHIES = [
  {
    id: 'first_buy',
    icon: '🥉', name: 'First Steps',
    description: 'Make your very first investment',
    check: ({ portfolio }) => Object.values(portfolio).some(h => (h.shares || 0) > 0),
  },
  {
    id: 'bond_buyer',
    icon: '🏛️', name: 'Bond Holder',
    description: 'Buy bonds — the foundation of every portfolio',
    check: ({ portfolio }) =>
      (DISTRICT_INSTRUMENTS['bonds'] || []).some(id => (portfolio[id]?.shares || 0) > 0),
  },
  {
    id: 'gold_buyer',
    icon: '⛏️', name: 'Gold Rush',
    description: 'Own gold — the oldest safe haven',
    check: ({ portfolio }) =>
      (DISTRICT_INSTRUMENTS['gold'] || []).some(id => (portfolio[id]?.shares || 0) > 0),
  },
  {
    id: 'smi_buyer',
    icon: '🇨🇭', name: 'Swiss Pride',
    description: 'Invest in Swiss blue-chip stocks',
    check: ({ portfolio }) =>
      (DISTRICT_INSTRUMENTS['smiStocks'] || []).some(id => (portfolio[id]?.shares || 0) > 0),
  },
  {
    id: 'tech_buyer',
    icon: '📈', name: 'Tech Pioneer',
    description: 'Invest in individual tech companies',
    check: ({ portfolio }) =>
      (DISTRICT_INSTRUMENTS['singleStocks'] || []).some(id => (portfolio[id]?.shares || 0) > 0),
  },
  {
    id: 'fx_buyer',
    icon: '⚓', name: 'Sailor',
    description: 'Trade foreign exchange currencies',
    check: ({ portfolio }) =>
      (DISTRICT_INSTRUMENTS['fx'] || []).some(id => (portfolio[id]?.shares || 0) > 0),
  },
  {
    id: 'diversifier',
    icon: '🌐', name: 'Diversifier',
    description: 'Invest in 3 or more different markets',
    check: ({ portfolio }) => {
      const count = ASSET_ORDER.filter(d =>
        (DISTRICT_INSTRUMENTS[d] || []).some(id => (portfolio[id]?.shares || 0) > 0)
      ).length
      return count >= 3
    },
  },
  {
    id: 'all_markets',
    icon: '🏆', name: 'All Markets',
    description: 'Have holdings in all 6 markets simultaneously',
    check: ({ portfolio }) =>
      ASSET_ORDER.every(d =>
        (DISTRICT_INSTRUMENTS[d] || []).some(id => (portfolio[id]?.shares || 0) > 0)
      ),
  },
  {
    id: 'bull_run',
    icon: '🐂', name: 'Bull Run',
    description: 'Achieve +50% return on any single asset',
    check: ({ portfolio, currentYear }) =>
      Object.entries(portfolio).some(([id, h]) => {
        if (!(h.shares > 0) || !h.avgPurchasePrice) return false
        const price = getPrice(id, currentYear)
        return (price / h.avgPurchasePrice - 1) >= 0.5
      }),
  },
  {
    id: 'diamond_hands',
    icon: '💎', name: 'Diamond Hands',
    description: 'Achieve +100% return on any single asset',
    check: ({ portfolio, currentYear }) =>
      Object.entries(portfolio).some(([id, h]) => {
        if (!(h.shares > 0) || !h.avgPurchasePrice) return false
        const price = getPrice(id, currentYear)
        return (price / h.avgPurchasePrice - 1) >= 1.0
      }),
  },
  {
    id: 'streak_5',
    icon: '🔥', name: 'Streak Master',
    description: 'Log in 5 days in a row',
    check: ({ userData }) => userData?.assetManagerUnlocked === true,
  },
  {
    id: 'wealthy',
    icon: '💰', name: 'Wealthy',
    description: 'Net worth exceeds CHF 20,000',
    check: ({ netWorth }) => netWorth >= 20000,
  },
  {
    id: 'rich',
    icon: '💎', name: 'Rich',
    description: 'Net worth exceeds CHF 100,000',
    check: ({ netWorth }) => netWorth >= 100000,
  },
  {
    id: 'millionaire',
    icon: '🤑', name: 'Millionaire',
    description: 'Net worth exceeds CHF 1,000,000',
    check: ({ netWorth }) => netWorth >= 1000000,
  },
]

export default function MuseumModal({ onClose, userData, portfolio, currentYear }) {
  const cash = userData?.cash ?? userData?.capital ?? 10000

  const netWorth = useMemo(() => {
    let pv = 0
    for (const [id, h] of Object.entries(portfolio)) {
      if ((h.shares || 0) > 0) pv += h.shares * getPrice(id, currentYear)
    }
    return cash + pv
  }, [portfolio, currentYear, cash])

  const trophies = useMemo(() =>
    TROPHIES.map(t => ({
      ...t,
      earned: t.check({ portfolio, currentYear, userData, netWorth }),
    })),
    [portfolio, currentYear, userData, netWorth]
  )

  const earnedCount = trophies.filter(t => t.earned).length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-amber-700/40 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700/60">
          <div>
            <h2 className="text-white font-black text-lg">🏛️ Museum of Achievements</h2>
            <div className="text-slate-400 text-xs mt-0.5">
              {earnedCount}/{trophies.length} trophies earned
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {/* Progress bar */}
        <div className="px-5 pt-3 pb-1">
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${(earnedCount / trophies.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Trophy grid */}
        <div className="flex-1 overflow-y-auto px-4 py-3 grid grid-cols-2 gap-2">
          {trophies.map(t => (
            <div
              key={t.id}
              className={`flex items-center gap-3 rounded-xl p-3 border transition-all ${
                t.earned
                  ? 'bg-amber-900/20 border-amber-600/50'
                  : 'bg-slate-800/40 border-slate-700/40 opacity-50'
              }`}
            >
              <div className={`text-3xl ${t.earned ? '' : 'grayscale'}`}>{t.icon}</div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold ${t.earned ? 'text-amber-300' : 'text-slate-400'}`}>
                  {t.name}
                </div>
                <div className="text-slate-500 text-xs leading-tight">{t.description}</div>
              </div>
              {t.earned && <div className="text-green-400 text-xs font-bold shrink-0">✓</div>}
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700/60 px-5 py-2 text-xs text-slate-600">
          Keep investing and diversifying to unlock more trophies.
        </div>
      </div>
    </div>
  )
}
