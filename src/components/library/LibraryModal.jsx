import { useState } from 'react'
import { QUIZZES } from '../../data/quizData'
import { ASSET_ORDER, ASSET_CLASSES, YEARS } from '../../data/assetData'

const PF_YELLOW = '#FFD000'

const AREA_CONFIG = {
  bonds:         { color: '#60a5fa', icon: '🏛️' },
  gold:          { color: '#fbbf24', icon: '⛏️' },
  smiStocks:     { color: '#f97316', icon: '🇨🇭' },
  equityIndices: { color: '#4ade80', icon: '🌐' },
  singleStocks:  { color: '#a78bfa', icon: '📈' },
  fx:            { color: '#22d3ee', icon: '✈️' },
}

const LEARN_CONTENT = {
  bonds: {
    riskLevel: 'Low',
    what: 'A bond is a loan you give to a government or company. They promise to pay you regular interest (the "coupon") and return your principal at maturity. Bonds are the bedrock of conservative portfolios.',
    how: 'Bond prices and interest rates move in opposite directions — when rates rise, existing bonds lose value because newer bonds pay more. Swiss government bonds (Eidgenossen) are among the safest assets in the world due to Switzerland\'s AAA credit rating.',
    returnProfile: 'Steady income, minimal capital growth',
    bestFor: 'Capital preservation, dampening portfolio volatility',
    history: {
      title: 'The 2022 Rate Shock',
      year: '2022',
      text: 'After seven years of negative interest rates, the SNB raised rates from −0.75% to +1.5% in a single year to fight inflation. Swiss bonds lost 12% — their worst year since 1999.',
      impact: '−12.1% on Swiss bonds in 2022',
      lesson: 'Even "safe" bonds carry duration risk when rates move sharply.',
    },
    swissContext: 'The SNB held negative rates (−0.75%) from 2015 to 2022 — the longest stretch of negative rates in modern history. This crushed bond yields but protected the CHF. Swiss investors in EUR or USD bonds also faced currency risk as the franc strengthened.',
    portfolioRole: 'Bonds act as a stabiliser — they often rise when stocks fall. A classic 60/40 portfolio (60% stocks, 40% bonds) has historically reduced drawdowns without sacrificing much return.',
    allocation: { conservative: '40–60%', balanced: '20–30%', aggressive: '5–10%' },
    watchOut: 'Inflation silently erodes real bond returns. Long-duration bonds (10–30 year) can fall 20%+ when rates spike. Corporate bonds pay more but carry default risk.',
    tips: [
      'Short-duration bonds (1–3 year) are far less sensitive to rate changes',
      'Swiss Confederation bonds are virtually risk-free but yield little',
      'Corporate bond ETFs offer higher yield with broad diversification',
      'Bond allocation should increase as your investment horizon shortens',
    ],
    concept: {
      name: 'Duration Risk',
      text: 'Duration measures how sensitive a bond\'s price is to rate changes. A 10-year bond with duration 8 will fall ~8% if rates rise 1%. Short bonds (duration 2) fall only ~2% for the same move. Knowing your duration protects you from rate surprises.',
    },
  },
  gold: {
    riskLevel: 'Medium',
    what: 'Gold is a precious metal that has served as a store of value for over 5,000 years. Unlike stocks or bonds, it pays no income — its price reflects pure supply/demand and investor fear. Its scarcity (all gold ever mined would fill just 3.5 Olympic swimming pools) is its core value proposition.',
    how: 'Gold rises when investors flee risk assets during crises, high inflation, or geopolitical turmoil. Because it is priced in USD globally, Swiss investors holding gold in CHF also bear currency risk — a strong franc can reduce gold returns.',
    returnProfile: 'Highly variable — surges in crises, stagnates in bull markets',
    bestFor: 'Crisis insurance, long-term inflation hedge',
    history: {
      title: 'The SNB Gold Sale (1999–2008)',
      year: '1999–2008',
      text: 'The SNB sold 1,550 tonnes of gold reserves at an average price of USD 350/oz. That same gold was worth over USD 1,800/oz by 2012. The total "loss" exceeded CHF 20 billion — triggering a national debate and the 2014 Gold Initiative.',
      impact: 'Gold +1,400% from 1999 to 2024 peak',
      lesson: '"Safe" doesn\'t mean low-return — gold massively outperformed savings accounts over 25 years.',
    },
    swissContext: 'Switzerland refines ~70% of the world\'s gold (Valcambi, Argor-Heraeus in Ticino). The SNB still holds ~1,040 tonnes of gold (≈7% of reserves). For Swiss investors, buying gold in CHF adds an extra layer of protection since both are safe-haven assets.',
    portfolioRole: '"Portfolio insurance" — it protects against tail risks but doesn\'t drive growth. Gold has low correlation with stocks and bonds, making it a genuine diversifier.',
    allocation: { conservative: '5–10%', balanced: '5–10%', aggressive: '0–5%' },
    watchOut: 'No dividends or coupon — gold earns nothing while you hold it. It can stagnate for a decade (1980–1990: −60%, inflation-adjusted). Storage costs apply for physical gold.',
    tips: [
      'Treat gold as insurance, not as a growth engine — cap at 10%',
      'Gold ETFs (e.g. ZKB Gold ETF) are cheaper and simpler than physical bars',
      'Gold surged +44% in 2024 as central banks bought aggressively',
      'Gold performs best when real interest rates are negative',
    ],
    concept: {
      name: 'Store of Value',
      text: 'A "store of value" is an asset that maintains purchasing power over time. Unlike cash (eroded by inflation) or bonds (dependent on the issuer), gold\'s purchasing power has remained roughly stable for centuries. One gold ounce bought a Roman toga — today it buys a fine suit.',
    },
  },
  smiStocks: {
    riskLevel: 'Medium–High',
    what: 'The SMI (Swiss Market Index) contains the 20 largest companies listed on the SIX Swiss Exchange — Nestlé, Novartis, Roche, UBS, ABB, Zurich Insurance and more. These are globally dominant companies with revenues far exceeding Switzerland\'s GDP.',
    how: 'SMI stocks are known for quality, dividends, and defensive sectors (healthcare, consumer staples, finance). Most SMI companies earn 80–90% of revenues abroad, so a strong CHF is a structural headwind on reported earnings.',
    returnProfile: 'Moderate growth with reliable dividend income',
    bestFor: 'Quality equity exposure, dividend-seeking investors',
    history: {
      title: 'UBS Bailout — 2008',
      year: '2008',
      text: 'UBS, once the world\'s largest wealth manager, accumulated $50B in toxic US mortgage losses. The Swiss government injected CHF 6B and the SNB absorbed CHF 54B in bad assets. UBS\'s share price fell from CHF 70 to CHF 8. The SMI dropped 34% in 2008.',
      impact: 'SMI −34.77% in 2008, recovered fully by 2013',
      lesson: 'Even "Swiss quality" doesn\'t make individual stocks immune to global shocks.',
    },
    swissContext: 'The SMI is unusually concentrated: Nestlé, Novartis, and Roche alone make up ~50% of the index. This means the SMI is less diversified than it looks. Switzerland\'s economy specialises in "hidden champions" — mid-cap companies (in the SMIM) that dominate niche global markets.',
    portfolioRole: 'Home-market equity allocation with defensive characteristics. SMI falls less than global indices in crashes but also lags in strong bull markets.',
    allocation: { conservative: '5–15%', balanced: '15–25%', aggressive: '10–20%' },
    watchOut: 'Three mega-caps dominate the index — sector concentration is high in healthcare. CHF strength persistently hurts the multinationals. Swiss dividends are subject to 35% withholding tax (recoverable for Swiss residents).',
    tips: [
      'Total Return (including dividends reinvested) significantly beats price-only returns',
      'The SMIM (mid-cap index) has historically outperformed the large-cap SMI',
      'Defensive sectors (Novartis, Roche, Nestlé) provide ballast in recessions',
      'Compare SMI vs SPI (all Swiss stocks) for broader exposure',
    ],
    concept: {
      name: 'Dividend Reinvestment',
      text: 'SMI companies pay dividends of ~3% per year. Reinvesting those dividends — automatically buying more shares — creates a compounding effect. Over 20 years, a CHF 10,000 SMI investment with dividends reinvested would be worth significantly more than the same investment without reinvestment.',
    },
  },
  equityIndices: {
    riskLevel: 'Medium–High',
    what: 'Equity index funds hold hundreds or thousands of stocks in one instrument, tracking indices like the MSCI World (1,400+ stocks across 23 countries) or S&P 500 (500 largest US companies). You own a tiny slice of the entire world economy.',
    how: 'Index funds are passively managed — they mirror the index composition with minimal buying and selling. This results in very low fees (0.1–0.2% vs 1–2% for active funds), broad diversification, and historically strong returns that beat most active managers over 10+ years.',
    returnProfile: 'Strong long-term growth with periodic 30–50% crashes',
    bestFor: 'Long-term wealth building, the core of most portfolios',
    history: {
      title: 'COVID Crash & Recovery — 2020',
      year: '2020',
      text: 'The S&P 500 fell 34% in just 33 days (February–March 2020) — the fastest bear market in history. By August 2020, it had fully recovered. Investors who sold at the bottom locked in permanent losses; those who held (or bought more) doubled their money over the next 18 months.',
      impact: 'MSCI World −2.7% for full year 2020, +22.8% in 2021',
      lesson: 'Staying invested through crashes — or buying more — is what generates wealth.',
    },
    swissContext: 'For Swiss investors, US-focused index funds (S&P 500) in USD expose you to currency risk. With the CHF historically strengthening, your USD returns are partially eroded in CHF terms. Hedged share classes (e.g., iShares S&P 500 CHF-hedged) eliminate this but cost ~0.5–1% extra per year.',
    portfolioRole: 'The growth engine of most portfolios. A low-cost global index fund alone can outperform most professionally managed funds over a 20-year horizon.',
    allocation: { conservative: '10–20%', balanced: '30–50%', aggressive: '50–70%' },
    watchOut: 'S&P 500 is now ~30% tech stocks — not as diversified as it sounds. US-dollar exposure hurts CHF investors when the franc strengthens. Don\'t confuse falling prices with "permanent loss" — crashes are temporary for broad indices.',
    tips: [
      '"Time in the market beats timing the market" — every year you\'re out risks missing the best days',
      'The best 10 days of the decade often come right after the worst 10',
      'VT (Vanguard Total World) or IWDA (iShares MSCI World) are popular for Swiss investors',
      'Expense ratio matters enormously over 20+ years — every 0.1% saved is real money',
    ],
    concept: {
      name: 'Compound Growth',
      text: 'At 7% annual return, CHF 10,000 grows to CHF 76,000 in 30 years — the "Rule of 72" says money doubles every 10 years at 7%. The key: growth is exponential, not linear. The last 10 years of a 30-year investment generate more wealth than the first 20 years combined.',
    },
  },
  singleStocks: {
    riskLevel: 'High',
    what: 'Buying individual company shares means you own a fractional stake in that specific business — its future earnings, dividends, and risks. Examples from this game include Nestlé, Roche, Apple, LVMH. Unlike index funds, you bear the full risk of that one company\'s fate.',
    how: 'Stock prices reflect discounted future earnings. Great companies with growing profits, strong competitive moats, and capable management tend to outperform. But picking winners consistently is extremely difficult — even professional fund managers fail more often than not.',
    returnProfile: 'Highest potential upside AND downside of any asset class',
    bestFor: 'Experienced investors with high conviction and long time horizons',
    history: {
      title: 'Credit Suisse Collapse — 2023',
      year: '2023',
      text: 'Credit Suisse, a 167-year-old Swiss institution once worth CHF 70/share, unravelled over years of scandals, risk failures, and client withdrawals. In March 2023, the Swiss government brokered an emergency rescue by UBS at CHF 0.76/share — a 99% loss for long-term shareholders.',
      impact: 'CS: from CHF 70 to CHF 0.76 — a 99% loss',
      lesson: '"Too big to fail" doesn\'t mean "too big to destroy shareholder value."',
    },
    swissContext: 'Swiss investors often suffer from "home bias" — over-investing in familiar Swiss names. This creates hidden concentration risk. Swiss stocks also tend to be more defensive; for growth, global names (US tech, Asian consumer) offer different return drivers.',
    portfolioRole: 'Satellite positions around a core index fund. Max 5–10% of portfolio in any single stock. Use single stocks for conviction ideas where you have genuine insight or long-term belief.',
    allocation: { conservative: '0–5%', balanced: '5–15%', aggressive: '15–30%' },
    watchOut: 'A single earnings miss can drop a stock 20% overnight. Corporate scandals, accounting fraud (Wirecard), or sector disruption can be permanent. Never let one stock become more than 5–10% of your total portfolio.',
    tips: [
      'Own 10–15 stocks minimum, across 4+ sectors, to reduce idiosyncratic risk',
      'Invest in businesses you understand — Buffett calls this your "circle of competence"',
      'Volatility is normal; only sell if your investment thesis has fundamentally changed',
      'Focus on free cash flow — it\'s harder to fake than reported earnings',
    ],
    concept: {
      name: 'Idiosyncratic vs. Market Risk',
      text: 'Every stock has two types of risk: market risk (the whole market falls) and idiosyncratic risk (that specific company fails). Market risk cannot be diversified away. But idiosyncratic risk CAN be — owning 20 uncorrelated stocks eliminates ~85% of company-specific risk. This is why diversification is the only "free lunch" in investing.',
    },
  },
  fx: {
    riskLevel: 'High',
    what: 'FX (foreign exchange) is the trading of currency pairs — EUR/CHF, USD/CHF, GBP/CHF and more. Switzerland\'s strong franc makes currency fluctuations especially significant: a 10% CHF appreciation can wipe out a year of equity returns on unhedged foreign holdings.',
    how: 'Currency values are driven by interest rate differentials (higher rates attract capital), inflation, trade balances, and risk sentiment. FX is the world\'s most liquid market ($7.5 trillion traded daily) but also the hardest to predict consistently.',
    returnProfile: 'Unpredictable — can silently enhance or destroy portfolio value',
    bestFor: 'Hedging currency risk in international holdings; professional traders',
    history: {
      title: 'Black Thursday — 15 January 2015',
      year: '2015',
      text: 'The SNB had pegged EUR/CHF at 1.20 since 2011, selling francs to maintain it. On January 15, 2015, the SNB abandoned the peg without warning. EUR/CHF crashed from 1.20 to 0.97 in minutes — a 19% move. Several FX brokers went bankrupt. Swiss exporters\' stocks lost 10–20% that day.',
      impact: 'EUR/CHF: −19% in minutes on Jan 15, 2015',
      lesson: 'Currency pegs always end eventually — and usually violently.',
    },
    swissContext: 'The CHF is one of the world\'s premier safe-haven currencies. In every major crisis (2008, 2011, 2020), global investors piled into CHF, pushing it up. This is great for Swiss purchasing power but crushes Swiss exporters. In 2011, EUR/CHF touched 1.00 — economic emergency territory.',
    portfolioRole: 'For most retail investors: hedge FX exposure in bond holdings (currency risk adds volatility without expected return). For equity holdings, consider partial hedging. Outright FX speculation is generally unsuitable for long-term investors.',
    allocation: { conservative: '0%', balanced: '0–2%', aggressive: '0–5%' },
    watchOut: 'FX leverage (common in retail FX products) can multiply losses catastrophically — 80%+ of retail FX traders lose money. Even without leverage, a 15% CHF appreciation erases a year of equity returns on a USD portfolio.',
    tips: [
      'Currency-hedged ETFs eliminate FX risk but cost ~0.3–0.8% extra per year in hedging fees',
      'In the long run, currencies revert to purchasing power parity (PPP)',
      'Central bank interventions can suspend normal market logic for years',
      'If you earn in CHF and spend in CHF, most of your investments should be CHF-hedged',
    ],
    concept: {
      name: 'The Carry Trade',
      text: 'The carry trade borrows money in a low-interest currency (historically CHF or JPY) and invests it in high-yield currencies (AUD, NZD). The profit is the interest rate differential. It works smoothly — until a crisis hits and safe-haven currencies surge, wiping out months of carry gains in days. The CHF carry trade unwound violently in 2008, 2011, and 2015.',
    },
  },
}

export default function LibraryModal({ onClose, unlockedAreas, onUnlock }) {
  const [tab, setTab] = useState('learn')
  const [selectedModule, setSelectedModule] = useState(null)
  const [quizState, setQuizState] = useState(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="pf-modal relative bg-[#0d1117] rounded-2xl w-[760px] flex flex-col shadow-2xl" style={{ border: '1px solid #FFD00022', height: '88vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #ffffff10' }}>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base font-black text-white tracking-tight">Investment Library</h2>
              <p className="text-[11px] mt-0.5" style={{ color: '#ffffff44' }}>Learn and test your knowledge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-sm"
            style={{ color: '#ffffff44', background: '#ffffff08' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffffCC'}
            onMouseLeave={e => e.currentTarget.style.color = '#ffffff44'}
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 py-3 shrink-0" style={{ borderBottom: '1px solid #ffffff10' }}>
          {[
            { id: 'learn', label: 'Learning Zone' },
            { id: 'quiz',  label: 'Quizzes' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSelectedModule(null); setQuizState(null) }}
              className="px-5 py-1.5 text-xs font-bold rounded-full transition-all"
              style={tab === t.id
                ? { background: PF_YELLOW, color: '#0d1117' }
                : { background: '#ffffff12', color: '#ffffffBB', border: '1px solid #ffffff18' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {tab === 'learn' ? (
            <LearningZone />
          ) : !selectedModule ? (
            <div className="overflow-y-auto flex-1"><ModuleList unlockedAreas={unlockedAreas} onSelect={setSelectedModule} /></div>
          ) : quizState === null ? (
            <div className="overflow-y-auto flex-1"><ModuleIntro
              moduleId={selectedModule}
              unlocked={unlockedAreas.includes(selectedModule)}
              onStartQuiz={() => setQuizState('quiz')}
              onBack={() => setSelectedModule(null)}
            /></div>
          ) : quizState === 'quiz' ? (
            <div className="overflow-y-auto flex-1"><QuizView
              moduleId={selectedModule}
              onComplete={(result) => setQuizState({ type: 'result', ...result })}
              onBack={() => setQuizState(null)}
            /></div>
          ) : (
            <div className="overflow-y-auto flex-1"><QuizResult
              moduleId={selectedModule}
              result={quizState}
              alreadyUnlocked={unlockedAreas.includes(selectedModule)}
              onUnlock={() => onUnlock(selectedModule, quizState.correctCount)}
              onBack={() => { setSelectedModule(null); setQuizState(null) }}
            /></div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Learning Zone ─────────────────────────────────────────────────────────────
function LearningZone() {
  const [activeId, setActiveId] = useState(ASSET_ORDER[0])
  const asset  = ASSET_CLASSES[activeId]
  const config = AREA_CONFIG[activeId]
  const learn  = LEARN_CONTENT[activeId]
  const returns = asset.returns
  const maxAbs  = Math.max(...returns.map(Math.abs))
  const bestYear  = YEARS[returns.indexOf(Math.max(...returns))]
  const worstYear = YEARS[returns.indexOf(Math.min(...returns))]
  const bestReturn  = Math.max(...returns)
  const worstReturn = Math.min(...returns)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      {/* Asset class tab strip */}
      <div className="flex gap-1.5 px-5 pt-4 pb-3 shrink-0 flex-wrap" style={{ borderBottom: '1px solid #ffffff0a' }}>
        {ASSET_ORDER.map(id => {
          const cfg = AREA_CONFIG[id]
          const ac  = ASSET_CLASSES[id]
          const active = id === activeId
          return (
            <button
              key={id}
              onClick={() => setActiveId(id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={active
                ? { background: cfg.color, color: '#0d1117' }
                : { background: '#ffffff0a', color: '#ffffff88', border: '1px solid #ffffff10' }
              }
            >
              <span>{cfg.icon}</span>
              <span>{ac.label}</span>
            </button>
          )
        })}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Hero row */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: config.color + '22', border: `1.5px solid ${config.color}55` }}>
            {config.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-white font-black text-lg leading-tight">{asset.label}</h3>
              <RiskBadge level={learn.riskLevel} />
            </div>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: '#ffffff66' }}>{asset.description}</p>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Avg Return', value: `${asset.avgReturn > 0 ? '+' : ''}${asset.avgReturn}%`, sub: 'per year', color: config.color },
            { label: 'Volatility', value: `±${asset.volatility}%`, sub: 'annual std dev', color: '#94a3b8' },
            { label: 'Best Year', value: `${bestYear}`, sub: `+${bestReturn}%`, color: '#4ade80' },
            { label: 'Worst Year', value: `${worstYear}`, sub: `${worstReturn}%`, color: '#f87171' },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: '#ffffff07', border: `1px solid ${s.color}22` }}>
              <div className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: '#ffffff33' }}>{s.label}</div>
              <div className="text-sm font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[9px] mt-0.5" style={{ color: s.color + '88' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Return bar chart */}
        <div className="rounded-xl p-4" style={{ background: '#ffffff05', border: '1px solid #ffffff0a' }}>
          <div className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: '#ffffff33' }}>
            Annual Returns 2007 – 2025
          </div>
          <div className="flex items-end gap-0.5 h-16">
            {returns.map((r, i) => {
              const pct = r / maxAbs
              const pos = r >= 0
              return (
                <div
                  key={i}
                  className="flex flex-col items-center flex-1 h-full justify-center group relative"
                  title={`${YEARS[i]}: ${r > 0 ? '+' : ''}${r}%`}
                >
                  {pos ? (
                    <>
                      <div className="w-full rounded-sm transition-opacity group-hover:opacity-70"
                        style={{ height: `${Math.abs(pct) * 52}px`, background: config.color, minHeight: 2 }} />
                      <div style={{ height: '50%' }} />
                    </>
                  ) : (
                    <>
                      <div style={{ height: '50%' }} />
                      <div className="w-full rounded-sm transition-opacity group-hover:opacity-70"
                        style={{ height: `${Math.abs(pct) * 52}px`, background: '#f87171', minHeight: 2 }} />
                    </>
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex justify-between mt-2" style={{ color: '#ffffff22', fontSize: 9 }}>
            <span>{YEARS[0]}</span>
            <span>{YEARS[Math.floor(YEARS.length / 2)]}</span>
            <span>{YEARS[YEARS.length - 1]}</span>
          </div>
        </div>

        {/* What + How */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-4" style={{ background: '#ffffff06', border: '1px solid #ffffff0d' }}>
            <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: config.color + 'AA' }}>What is it?</div>
            <p className="text-xs leading-relaxed" style={{ color: '#ffffffBB' }}>{learn.what}</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: '#ffffff06', border: '1px solid #ffffff0d' }}>
            <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: config.color + 'AA' }}>How it works</div>
            <p className="text-xs leading-relaxed" style={{ color: '#ffffffBB' }}>{learn.how}</p>
          </div>
        </div>

        {/* Historical Moment */}
        <div className="rounded-xl p-4" style={{ background: config.color + '0d', border: `1px solid ${config.color}33` }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">📜</span>
            <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: config.color }}>Historical Moment</div>
            <div className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded"
              style={{ background: config.color + '22', color: config.color }}>
              {learn.history.year}
            </div>
          </div>
          <div className="font-bold text-sm text-white mb-1">{learn.history.title}</div>
          <p className="text-xs leading-relaxed mb-2" style={{ color: '#ffffffBB' }}>{learn.history.text}</p>
          <div className="flex items-center gap-3 pt-2" style={{ borderTop: `1px solid ${config.color}22` }}>
            <div className="text-[10px] font-black" style={{ color: config.color }}>{learn.history.impact}</div>
            <div className="text-[10px] ml-2" style={{ color: '#ffffff55' }}>Key lesson: {learn.history.lesson}</div>
          </div>
        </div>

        {/* Swiss Context + Portfolio Role */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-4" style={{ background: '#ffffff06', border: '1px solid #ffffff0d' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">🇨🇭</span>
              <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: '#ffffff44' }}>Swiss Context</div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#ffffffBB' }}>{learn.swissContext}</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: '#ffffff06', border: '1px solid #ffffff0d' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">🏗️</span>
              <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: '#ffffff44' }}>Portfolio Role</div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#ffffffBB' }}>{learn.portfolioRole}</p>
          </div>
        </div>

        {/* Allocation table */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #ffffff0d' }}>
          <div className="px-4 py-2.5" style={{ background: '#ffffff08', borderBottom: '1px solid #ffffff08' }}>
            <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: '#ffffff44' }}>Typical Allocation by Risk Profile</div>
          </div>
          <div className="grid grid-cols-3">
            {[
              { label: '🛡️ Conservative', value: learn.allocation.conservative, color: '#60a5fa' },
              { label: '⚖️ Balanced',     value: learn.allocation.balanced,     color: '#fbbf24' },
              { label: '🚀 Aggressive',   value: learn.allocation.aggressive,   color: '#f87171' },
            ].map(({ label, value, color }) => (
              <div key={label} className="px-4 py-3 text-center" style={{ background: '#0d1117', borderRight: '1px solid #ffffff08' }}>
                <div className="text-[10px] mb-1" style={{ color: '#ffffff44' }}>{label}</div>
                <div className="text-sm font-black" style={{ color }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Watch out */}
        <div className="rounded-xl p-4" style={{ background: '#f8717108', border: '1px solid #f8717122' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">⚠️</span>
            <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: '#f87171AA' }}>Watch Out For</div>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#ffffffBB' }}>{learn.watchOut}</p>
        </div>

        {/* Key Insights */}
        <div className="rounded-xl p-4" style={{ background: PF_YELLOW + '0a', border: `1px solid ${PF_YELLOW}22` }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">💡</span>
            <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: PF_YELLOW + 'AA' }}>Key Insights</div>
          </div>
          <div className="space-y-2">
            {learn.tips.map((tip, i) => (
              <div key={i} className="flex gap-2 text-xs" style={{ color: '#ffffffCC' }}>
                <span className="shrink-0 font-black" style={{ color: PF_YELLOW }}>›</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Concept spotlight */}
        <div className="rounded-xl p-4" style={{ background: config.color + '10', border: `1px solid ${config.color}44` }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🎓</span>
            <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: config.color + 'AA' }}>Concept Spotlight</div>
          </div>
          <div className="font-bold text-sm mb-1.5" style={{ color: config.color }}>{learn.concept.name}</div>
          <p className="text-xs leading-relaxed" style={{ color: '#ffffffBB' }}>{learn.concept.text}</p>
        </div>

      </div>
    </div>
  )
}

function RiskBadge({ level }) {
  const color = level === 'Low' ? '#4ade80' : level === 'Medium' ? '#fbbf24' : level === 'Medium–High' ? '#f97316' : '#f87171'
  return (
    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide" style={{ background: color + '22', color, border: `1px solid ${color}44` }}>
      {level}
    </span>
  )
}

function Section({ title, text }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: '#ffffff33' }}>{title}</div>
      <p className="text-xs leading-relaxed" style={{ color: '#ffffffBB' }}>{text}</p>
    </div>
  )
}

function InfoBlock({ label, text, accent }) {
  return (
    <div className="rounded-lg p-2.5" style={{ background: '#ffffff06', border: '1px solid #ffffff0a' }}>
      <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: '#ffffff33' }}>{label}</div>
      <div className="text-xs" style={{ color: accent || '#ffffffBB' }}>{text}</div>
    </div>
  )
}

// ── Quiz section (unchanged) ──────────────────────────────────────────────────
function ModuleList({ unlockedAreas, onSelect }) {
  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {ASSET_ORDER.map((id, idx) => {
        const quiz = QUIZZES[id]
        const config = AREA_CONFIG[id]
        const unlocked = unlockedAreas.includes(id)
        const isAvailable = idx === 0 || unlockedAreas.includes(ASSET_ORDER[idx - 1])

        return (
          <button
            key={id}
            onClick={() => isAvailable && onSelect(id)}
            className="text-left p-4 rounded-xl transition-all"
            style={{
              border: unlocked ? `1px solid ${config.color}44` : isAvailable ? '1px solid #ffffff18' : '1px solid #ffffff08',
              background: unlocked ? config.color + '0f' : isAvailable ? '#ffffff08' : '#ffffff04',
              opacity: isAvailable ? 1 : 0.4,
              cursor: isAvailable ? 'pointer' : 'not-allowed',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{config.icon}</span>
                <div>
                  <div className="font-semibold text-white text-sm">{quiz.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#ffffff44' }}>{ASSET_CLASSES[id]?.description?.split('.')[0]}</div>
                </div>
              </div>
              <span className="text-sm mt-0.5">
                {unlocked ? '✅' : isAvailable ? '🔓' : '🔒'}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#ffffff10' }}>
                <div className="h-full rounded-full" style={{ width: unlocked ? '100%' : '0%', backgroundColor: config.color }} />
              </div>
              <span className="text-xs" style={{ color: '#ffffff44' }}>{unlocked ? '5/5' : '0/5'}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function ModuleIntro({ moduleId, unlocked, onStartQuiz, onBack }) {
  const quiz = QUIZZES[moduleId]
  const config = AREA_CONFIG[moduleId]
  const asset = ASSET_CLASSES[moduleId]

  return (
    <div className="p-8">
      <button onClick={onBack} className="text-xs mb-6 flex items-center gap-2 transition-colors" style={{ color: '#ffffff44' }}
        onMouseEnter={e => e.currentTarget.style.color = '#ffffffCC'}
        onMouseLeave={e => e.currentTarget.style.color = '#ffffff44'}>
        ← Back to Quizzes
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: config.color + '22', border: `2px solid ${config.color}44` }}>
          {config.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
          <p className="text-xs mt-0.5" style={{ color: '#ffffff55' }}>5 questions · Earn up to CHF 10,000</p>
        </div>
      </div>

      <div className="rounded-xl p-5 mb-6" style={{ background: '#ffffff08', border: '1px solid #ffffff12' }}>
        <p className="text-sm leading-relaxed" style={{ color: '#ffffffCC' }}>{quiz.intro}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Avg Return" value={`${asset?.avgReturn}%/yr`} color={config.color} />
        <StatCard label="Volatility" value={`${asset?.volatility}%`} color={config.color} />
        <StatCard label="Capital Bonus" value="+CHF 2k/Q" color="#4ade80" />
      </div>

      {unlocked && (
        <div className="rounded-xl p-4 mb-4 text-center text-sm" style={{ background: '#4ade8022', border: '1px solid #4ade8044', color: '#4ade80' }}>
          You've already unlocked this area. Retake the quiz for extra capital.
        </div>
      )}

      <button
        onClick={onStartQuiz}
        className="w-full mt-4 py-3 rounded-xl font-bold text-[#0d1117] transition-all"
        style={{ backgroundColor: config.color }}
      >
        {unlocked ? 'Retake Quiz' : 'Start Quiz & Unlock Area'}
      </button>
    </div>
  )
}

function QuizView({ moduleId, onComplete, onBack }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const quiz = QUIZZES[moduleId]
  const config = AREA_CONFIG[moduleId]
  const q = quiz.questions[current]
  const total = quiz.questions.length

  const handleConfirm = () => {
    if (selected === null) return
    setRevealed(true)
    setAnswers(a => ({ ...a, [current]: selected }))
  }

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setRevealed(false)
    } else {
      const correctCount = Object.entries({ ...answers, [current]: selected })
        .filter(([i, ans]) => ans === quiz.questions[parseInt(i)].correct).length
      onComplete({ correctCount, total })
    }
  }

  const isCorrect = revealed && selected === q.correct

  return (
    <div className="p-8">
      <button onClick={onBack} className="text-xs mb-4 flex items-center gap-2" style={{ color: '#ffffff44' }}>← Back</button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#ffffff10' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${(current / total) * 100}%`, backgroundColor: config.color }} />
        </div>
        <span className="text-xs font-medium" style={{ color: '#ffffff55' }}>{current + 1} / {total}</span>
      </div>

      <h3 className="text-white font-semibold text-lg leading-snug mb-6">{q.question}</h3>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          let style = { borderColor: '#ffffff18', background: '#ffffff08', color: '#ffffffBB' }
          if (!revealed) {
            if (selected === i) style = { borderColor: '#ffffffCC', background: '#ffffff18', color: '#ffffff' }
          } else {
            if (i === q.correct) style = { borderColor: '#4ade8066', background: '#4ade8022', color: '#4ade80' }
            else if (i === selected) style = { borderColor: '#f8717166', background: '#f8717122', color: '#f87171' }
            else style = { borderColor: '#ffffff08', background: 'transparent', color: '#ffffff33' }
          }
          return (
            <button key={i} onClick={() => !revealed && setSelected(i)}
              className="w-full text-left p-4 rounded-xl border text-sm transition-all"
              style={style}>
              <span className="font-semibold mr-2">{['A','B','C','D'][i]}.</span>{opt}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div className="rounded-xl p-4 mb-4 border text-sm"
          style={{ background: isCorrect ? '#4ade8022' : '#f8717122', border: `1px solid ${isCorrect ? '#4ade8044' : '#f8717144'}`, color: isCorrect ? '#4ade80' : '#f87171' }}>
          {isCorrect ? 'Correct! ' : 'Not quite. '}{q.explanation}
        </div>
      )}

      {!revealed ? (
        <button onClick={handleConfirm} disabled={selected === null}
          className="w-full py-3 rounded-xl font-bold text-[#0d1117] disabled:opacity-30"
          style={{ backgroundColor: config.color }}>
          Confirm Answer
        </button>
      ) : (
        <button onClick={handleNext}
          className="w-full py-3 rounded-xl font-bold text-[#0d1117]"
          style={{ backgroundColor: config.color }}>
          {current < total - 1 ? 'Next Question →' : 'See Results'}
        </button>
      )}
    </div>
  )
}

function QuizResult({ moduleId, result, alreadyUnlocked, onUnlock, onBack }) {
  const config = AREA_CONFIG[moduleId]
  const { correctCount, total } = result
  const bonus = correctCount * 2000
  const passed = correctCount >= 3

  return (
    <div className="p-8 text-center">
      <div className="text-5xl mb-4">{passed ? '🎉' : '📖'}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{correctCount}/{total} Correct</h3>
      <p className="text-sm mb-6" style={{ color: '#ffffff55' }}>
        {passed ? "Great job! You've earned capital." : "Keep learning and try again!"}
      </p>

      <div className="rounded-xl p-5 mb-6 space-y-3" style={{ background: '#ffffff08', border: '1px solid #ffffff10' }}>
        <div className="flex justify-between text-sm">
          <span style={{ color: '#ffffff55' }}>Capital Earned</span>
          <span className="font-bold" style={{ color: '#4ade80' }}>+CHF {bonus.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: '#ffffff55' }}>Area Status</span>
          <span className="font-bold" style={{ color: config.color }}>
            {alreadyUnlocked ? 'Already Unlocked' : passed ? 'Ready to Unlock!' : 'Needs 3/5 to unlock'}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack}
          className="flex-1 py-3 rounded-xl font-semibold transition-all text-sm"
          style={{ border: '1px solid #ffffff18', color: '#ffffffBB', background: 'transparent' }}>
          Back to Library
        </button>
        {!alreadyUnlocked && passed && (
          <button onClick={() => { onUnlock(); onBack() }}
            className="flex-1 py-3 rounded-xl font-bold text-[#0d1117] transition-all"
            style={{ backgroundColor: config.color }}>
            Unlock Area
          </button>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: '#ffffff08', border: '1px solid #ffffff10' }}>
      <div className="text-xs mb-1" style={{ color: '#ffffff44' }}>{label}</div>
      <div className="font-bold text-sm" style={{ color }}>{value}</div>
    </div>
  )
}
