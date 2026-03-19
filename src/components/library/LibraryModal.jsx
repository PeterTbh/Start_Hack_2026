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
    what: 'A bond is a loan you give to a government or company. They pay you regular interest (the "coupon") and return your money at the end. Bonds are the bedrock of conservative portfolios.',
    how: 'When interest rates rise, bond prices fall — and vice versa. Swiss government bonds (Eidgenossen) are among the safest in the world.',
    riskLevel: 'Low',
    returnProfile: 'Steady income, minimal growth',
    bestFor: 'Capital preservation, portfolio stability',
    watchOut: 'Inflation can erode real returns. Long-duration bonds are sensitive to rate changes.',
    tips: [
      'Use bonds to balance the volatility of stocks',
      'Short-duration bonds are less affected by rate hikes',
      'Corporate bonds pay more but carry default risk',
    ],
  },
  gold: {
    what: 'Gold is a precious metal that has stored value for thousands of years. Unlike stocks or bonds, it pays no income — its value comes purely from what others are willing to pay.',
    how: 'Gold typically rises when investors are fearful (recessions, wars, inflation). It is priced in USD, so CHF investors also carry currency risk.',
    riskLevel: 'Medium',
    returnProfile: 'Highly variable — can surge or stagnate for years',
    bestFor: 'Hedging against crises and inflation',
    watchOut: 'No dividends or interest. Can underperform for a decade during bull markets.',
    tips: [
      'Allocate 5–10% as a "crisis insurance" position',
      'Gold surged in 2007–2012 and again in 2019–2024',
      'ETFs (e.g. XAUUSD trackers) are easier than physical gold',
    ],
  },
  smiStocks: {
    what: 'The SMI (Swiss Market Index) contains the 20 largest Swiss companies — Nestlé, Novartis, Roche, UBS, Zurich Insurance and more. These are global champions headquartered in Switzerland.',
    how: "SMI stocks pay solid dividends and are known for quality and defensive sectors (healthcare, food, insurance). The Swiss franc's strength can be a headwind for exporters.",
    riskLevel: 'Medium–High',
    returnProfile: 'Moderate growth with dividend income',
    bestFor: 'Investors wanting quality Swiss exposure',
    watchOut: 'Concentrated in 3 mega-caps (Nestlé, Novartis, Roche ≈ 50% of index). CHF strength hurts earnings.',
    tips: [
      'SMI is defensive — it falls less in crashes but also lags in bull runs',
      'Dividend reinvestment significantly boosts long-term returns',
      'The 2008 crisis hit SMI hard (-35%) but recovered fully by 2013',
    ],
  },
  equityIndices: {
    what: 'Equity index funds like the MSCI World or S&P 500 hold hundreds or thousands of stocks across the globe in one instrument. You own a tiny slice of the world economy.',
    how: 'Index funds are passively managed — they just track the index. This means very low fees, broad diversification, and historically strong long-term returns.',
    riskLevel: 'Medium–High',
    returnProfile: 'Strong long-term growth with periodic crashes',
    bestFor: 'Long-term wealth building, core portfolio holdings',
    watchOut: 'Still drops 30–50% in major crashes. US-heavy indices (S&P 500) have high tech concentration.',
    tips: [
      '"Time in the market beats timing the market" — stay invested',
      'A global index fund can replace most of a portfolio on its own',
      '2009, 2020, 2022 were great buying opportunities after crashes',
    ],
  },
  singleStocks: {
    what: 'Buying individual company shares means you own a piece of that specific business — its profits, dividends, and future prospects. Examples: Apple, Alphabet, LVMH, Nestlé.',
    how: 'Single stocks can massively outperform the market (Apple 10x in a decade) or collapse entirely (Wirecard, Credit Suisse). Research and conviction are essential.',
    riskLevel: 'High',
    returnProfile: 'Highest potential upside AND downside',
    bestFor: 'Experienced investors with conviction in specific companies',
    watchOut: 'A single bad earnings report can drop a stock 20% overnight. Never put more than 5–10% in one stock.',
    tips: [
      'Diversify across at least 10–15 stocks across different sectors',
      'Focus on businesses you understand — stick to your circle of competence',
      'Volatility is normal; only sell if the investment thesis has changed',
    ],
  },
  fx: {
    what: 'FX (foreign exchange) is the trading of currency pairs — e.g. EUR/CHF, USD/CHF. Switzerland\'s strong franc makes currency moves especially impactful for Swiss investors.',
    how: 'Currency values shift based on interest rate differentials, trade balances, and geopolitical events. FX is the world\'s largest market, trading $7 trillion per day.',
    riskLevel: 'High',
    returnProfile: 'Unpredictable; can add or destroy portfolio value',
    bestFor: 'Hedging international holdings; professional traders',
    watchOut: 'The CHF is a safe-haven — it strengthens in crises, hurting exporters and foreign asset returns. Leverage in FX can wipe out capital.',
    tips: [
      'For most investors, hedging currency risk is smarter than speculating on it',
      '2015: SNB removed the EUR/CHF floor — franc surged 20% overnight',
      'If you hold USD assets, a strong CHF silently erodes your returns',
    ],
  },
}

export default function LibraryModal({ onClose, unlockedAreas, onUnlock }) {
  const [tab, setTab] = useState('learn')
  const [selectedModule, setSelectedModule] = useState(null)
  const [quizState, setQuizState] = useState(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="pf-modal relative bg-[#0d1117] rounded-2xl w-[760px] max-h-[88vh] flex flex-col shadow-2xl" style={{ border: '1px solid #FFD00022' }}>

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
        <div className="flex-1 overflow-y-auto">
          {tab === 'learn' ? (
            <LearningZone />
          ) : !selectedModule ? (
            <ModuleList unlockedAreas={unlockedAreas} onSelect={setSelectedModule} />
          ) : quizState === null ? (
            <ModuleIntro
              moduleId={selectedModule}
              unlocked={unlockedAreas.includes(selectedModule)}
              onStartQuiz={() => setQuizState('quiz')}
              onBack={() => setSelectedModule(null)}
            />
          ) : quizState === 'quiz' ? (
            <QuizView
              moduleId={selectedModule}
              onComplete={(result) => setQuizState({ type: 'result', ...result })}
              onBack={() => setQuizState(null)}
            />
          ) : (
            <QuizResult
              moduleId={selectedModule}
              result={quizState}
              alreadyUnlocked={unlockedAreas.includes(selectedModule)}
              onUnlock={() => onUnlock(selectedModule, quizState.correctCount)}
              onBack={() => { setSelectedModule(null); setQuizState(null) }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ── Learning Zone ─────────────────────────────────────────────────────────────
function LearningZone() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="p-5 space-y-4">
      <p className="text-xs pb-1" style={{ color: '#ffffff44' }}>
        Scroll to explore each asset class — tap a card to read more.
      </p>
      {ASSET_ORDER.map(id => {
        const asset  = ASSET_CLASSES[id]
        const config = AREA_CONFIG[id]
        const learn  = LEARN_CONTENT[id]
        const isOpen = expanded === id
        const returns = asset.returns
        const maxAbs = Math.max(...returns.map(Math.abs))
        const bestYear  = YEARS[returns.indexOf(Math.max(...returns))]
        const worstYear = YEARS[returns.indexOf(Math.min(...returns))]

        return (
          <div
            key={id}
            className="rounded-xl overflow-hidden transition-all"
            style={{ border: `1px solid ${isOpen ? config.color + '55' : '#ffffff12'}`, background: isOpen ? config.color + '08' : '#ffffff05' }}
          >
            {/* Card header — always visible */}
            <button
              className="w-full text-left px-5 py-4 flex items-center gap-4"
              onClick={() => setExpanded(isOpen ? null : id)}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                style={{ background: config.color + '22', border: `1px solid ${config.color}44` }}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-black text-sm text-white">{asset.label}</span>
                  <RiskBadge level={learn.riskLevel} />
                </div>
                <div className="text-[11px] mt-0.5 truncate" style={{ color: '#ffffff55' }}>{asset.description}</div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <div className="text-xs font-black" style={{ color: config.color }}>{asset.avgReturn > 0 ? '+' : ''}{asset.avgReturn}%</div>
                <div className="text-[10px]" style={{ color: '#ffffff33' }}>avg/yr</div>
              </div>
              <div className="text-xs ml-3" style={{ color: '#ffffff33' }}>{isOpen ? '▲' : '▼'}</div>
            </button>

            {/* Expanded content */}
            {isOpen && (
              <div className="px-5 pb-5 space-y-4">

                {/* Mini return bar chart */}
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#ffffff33' }}>
                    Annual Returns 2007–2025
                  </div>
                  <div className="flex items-end gap-0.5 h-14">
                    {returns.map((r, i) => {
                      const pct = r / maxAbs
                      const pos = r >= 0
                      return (
                        <div key={i} className="flex flex-col items-center flex-1 h-full justify-center" title={`${YEARS[i]}: ${r > 0 ? '+' : ''}${r}%`}>
                          {pos ? (
                            <>
                              <div className="w-full rounded-sm" style={{ height: `${Math.abs(pct) * 44}px`, background: config.color, minHeight: 2 }} />
                              <div style={{ height: '50%' }} />
                            </>
                          ) : (
                            <>
                              <div style={{ height: '50%' }} />
                              <div className="w-full rounded-sm" style={{ height: `${Math.abs(pct) * 44}px`, background: '#f87171', minHeight: 2 }} />
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex justify-between mt-1" style={{ color: '#ffffff22', fontSize: 9 }}>
                    <span>{YEARS[0]}</span><span>{YEARS[Math.floor(YEARS.length / 2)]}</span><span>{YEARS[YEARS.length - 1]}</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Avg Return', value: `${asset.avgReturn > 0 ? '+' : ''}${asset.avgReturn}%/yr`, color: config.color },
                    { label: 'Volatility', value: `±${asset.volatility}%`, color: '#ffffff88' },
                    { label: 'Best Year', value: `${bestYear}`, color: '#4ade80' },
                    { label: 'Worst Year', value: `${worstYear}`, color: '#f87171' },
                  ].map(s => (
                    <div key={s.label} className="rounded-lg p-2.5 text-center" style={{ background: '#ffffff08', border: '1px solid #ffffff0a' }}>
                      <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: '#ffffff33' }}>{s.label}</div>
                      <div className="text-xs font-black" style={{ color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* What / How */}
                <div className="space-y-3">
                  <Section title="What is it?" text={learn.what} />
                  <Section title="How it works" text={learn.how} />
                </div>

                {/* Profile row */}
                <div className="grid grid-cols-2 gap-2">
                  <InfoBlock label="Return profile" text={learn.returnProfile} />
                  <InfoBlock label="Best for" text={learn.bestFor} />
                </div>
                <InfoBlock label="Watch out for" text={learn.watchOut} accent="#f87171" />

                {/* Tips */}
                <div className="rounded-lg p-3 space-y-1.5" style={{ background: PF_YELLOW + '0a', border: `1px solid ${PF_YELLOW}22` }}>
                  <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: PF_YELLOW + 'AA' }}>Key Insights</div>
                  {learn.tips.map((tip, i) => (
                    <div key={i} className="flex gap-2 text-xs" style={{ color: '#ffffffBB' }}>
                      <span style={{ color: PF_YELLOW }}>›</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
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
