// Quiz questions per asset class — 5 questions each
// Update these with real questions from your team

export const QUIZZES = {
  bonds: {
    title: 'Bonds Basics',
    intro: 'Bonds are loans you give to governments or companies. They pay you back with interest.',
    questions: [
      {
        id: 'bonds_q1',
        question: 'What is a bond?',
        options: [
          'A share of ownership in a company',
          'A loan you give to a government or company in exchange for interest',
          'A type of savings account',
          'A contract to buy currency in the future',
        ],
        correct: 1,
        explanation: 'A bond is essentially a loan. You lend money and receive regular interest payments.',
      },
      {
        id: 'bonds_q2',
        question: 'When interest rates rise, what happens to bond prices?',
        options: ['They rise too', 'They fall', 'They stay the same', 'They become unpredictable'],
        correct: 1,
        explanation: 'Bond prices move opposite to interest rates. When rates rise, existing bonds paying lower rates become less attractive.',
      },
      {
        id: 'bonds_q3',
        question: 'Which type of bond is generally considered safest?',
        options: ['Corporate junk bonds', 'Government bonds from stable countries', 'Bonds from startups', 'Convertible bonds'],
        correct: 1,
        explanation: 'Government bonds from stable countries (like Switzerland) carry the lowest default risk.',
      },
      {
        id: 'bonds_q4',
        question: 'What does "yield" mean for a bond?',
        options: ['The length of the bond term', 'The face value of the bond', 'The annual return you earn relative to the bond price', 'The risk rating'],
        correct: 2,
        explanation: 'Yield is the annual return expressed as a percentage of the bond\'s current price.',
      },
      {
        id: 'bonds_q5',
        question: 'Why might an investor include bonds in a portfolio?',
        options: [
          'For maximum growth potential',
          'To speculate on currency movements',
          'To add stability and reduce overall portfolio risk',
          'Because bonds always outperform stocks',
        ],
        correct: 2,
        explanation: 'Bonds typically move differently to stocks, providing stability and reducing volatility in a mixed portfolio.',
      },
    ],
  },

  gold: {
    title: 'Gold & Commodities',
    intro: 'Gold has been a store of value for thousands of years. It protects against inflation but earns no income.',
    questions: [
      {
        id: 'gold_q1',
        question: 'Why is gold considered a "safe haven" asset?',
        options: [
          'It always increases in value',
          'It tends to hold value during economic crises when other assets fall',
          'It is backed by central banks',
          'It pays regular dividends',
        ],
        correct: 1,
        explanation: 'Gold often holds or gains value during market turmoil, making it a hedge against uncertainty.',
      },
      {
        id: 'gold_q2',
        question: 'What is a major disadvantage of investing in gold?',
        options: [
          'It is illegal in most countries',
          'It produces no income — no dividends or interest',
          'It can only be bought in large quantities',
          'It loses value every year by regulation',
        ],
        correct: 1,
        explanation: 'Unlike stocks or bonds, gold produces no income. You only profit if its price rises.',
      },
      {
        id: 'gold_q3',
        question: 'What typically happens to gold prices when inflation rises?',
        options: ['Gold prices fall sharply', 'Gold prices often rise as investors seek protection', 'Gold prices are unaffected', 'Gold prices become fixed by governments'],
        correct: 1,
        explanation: 'Gold is traditionally seen as a hedge against inflation — its price often rises when purchasing power falls.',
      },
      {
        id: 'gold_q4',
        question: 'If you invest 100% of your portfolio in gold, what is the main risk?',
        options: [
          'You will definitely lose money',
          'You miss out on income and growth from other assets, and gold can be highly volatile',
          'Gold is difficult to sell',
          'You cannot hold gold in Switzerland',
        ],
        correct: 1,
        explanation: 'Concentration in any single asset — even gold — creates vulnerability. Gold can drop significantly and pays no income.',
      },
      {
        id: 'gold_q5',
        question: 'Over the long term, which investment has typically generated higher returns?',
        options: ['Gold', 'Global stock indices', 'They are exactly the same', 'Neither — they both lose to inflation'],
        correct: 1,
        explanation: 'Historically, diversified stock indices have outperformed gold over 20–30 year periods, though gold provides useful diversification.',
      },
    ],
  },

  smiStocks: {
    title: 'SMI Swiss Stocks',
    intro: 'The Swiss Market Index (SMI) tracks Switzerland\'s 20 largest listed companies, including Nestlé, Novartis, and Roche.',
    questions: [
      {
        id: 'smi_q1',
        question: 'What is the SMI?',
        options: [
          'Swiss Money Index — a savings rate set by the SNB',
          'Swiss Market Index — the 20 largest companies listed on the Swiss exchange',
          'A government bond index',
          'A CHF/EUR exchange rate index',
        ],
        correct: 1,
        explanation: 'The SMI (Swiss Market Index) tracks Switzerland\'s 20 largest blue-chip companies.',
      },
      {
        id: 'smi_q2',
        question: 'Which sector dominates the SMI?',
        options: ['Technology', 'Financial services', 'Healthcare and consumer goods (Nestlé, Novartis, Roche)', 'Energy'],
        correct: 2,
        explanation: 'Healthcare (Novartis, Roche) and consumer staples (Nestlé) make up over 50% of the SMI.',
      },
      {
        id: 'smi_q3',
        question: 'What is a dividend?',
        options: [
          'A fee you pay when buying stocks',
          'A portion of company profits paid to shareholders',
          'The price change of a stock over a year',
          'A tax on investment gains',
        ],
        correct: 1,
        explanation: 'Dividends are profit-sharing payments to shareholders, providing income on top of price appreciation.',
      },
      {
        id: 'smi_q4',
        question: 'How does investing in SMI stocks compare to single company stocks?',
        options: [
          'SMI is riskier because it holds fewer companies',
          'SMI provides more diversification across 20 Swiss blue-chips, reducing single-company risk',
          'They are exactly the same',
          'Single stocks always perform better',
        ],
        correct: 1,
        explanation: 'The SMI spreads risk across 20 companies. A single company can go bankrupt — the index cannot.',
      },
      {
        id: 'smi_q5',
        question: 'A company in your portfolio reports a major scandal. What happens to its stock?',
        options: [
          'Nothing — stock prices don\'t reflect company news',
          'It likely falls, but if it\'s one of 20 in a portfolio, the overall impact is limited',
          'All Swiss stocks fall together',
          'The government guarantees the price',
        ],
        correct: 1,
        explanation: 'Diversification protects you — one bad news event affects one company, not your entire portfolio.',
      },
    ],
  },

  equityIndices: {
    title: 'Global Equity Indices',
    intro: 'Equity index funds (like MSCI World or S&P 500) hold hundreds or thousands of companies at once.',
    questions: [
      {
        id: 'eq_q1',
        question: 'What is an index fund?',
        options: [
          'A fund managed by experts who pick the best stocks',
          'A fund that tracks a market index, holding all its constituent companies',
          'A government savings product',
          'A bond fund with fixed interest',
        ],
        correct: 1,
        explanation: 'An index fund passively tracks an index like the MSCI World, holding all its companies proportionally.',
      },
      {
        id: 'eq_q2',
        question: 'What does "passive investing" mean?',
        options: [
          'Not checking your portfolio for years',
          'Following an index without trying to beat the market',
          'Only investing in bonds',
          'Letting a bank manage your money',
        ],
        correct: 1,
        explanation: 'Passive investing means tracking an index rather than trying to pick individual winners.',
      },
      {
        id: 'eq_q3',
        question: 'Why do most active fund managers underperform simple index funds over 15 years?',
        options: [
          'They invest in bonds instead of stocks',
          'Fees and the difficulty of consistently predicting market movements eat into returns',
          'Index funds are guaranteed by the government',
          'Active managers only invest in one country',
        ],
        correct: 1,
        explanation: 'Studies show 80–90% of active managers underperform their benchmark after fees over long periods.',
      },
      {
        id: 'eq_q4',
        question: 'The MSCI World index dropped 38% in 2008. What would a long-term investor do?',
        options: [
          'Sell immediately to avoid further losses',
          'Stay invested — markets historically recover and long-term investors are rewarded for patience',
          'Move everything to FX',
          'Sue the index provider',
        ],
        correct: 1,
        explanation: 'Long-term investing means riding out volatility. The MSCI World fully recovered within 3 years and went on to new highs.',
      },
      {
        id: 'eq_q5',
        question: 'What is the main advantage of a globally diversified index over a single country\'s stocks?',
        options: [
          'It always has higher returns',
          'It spreads risk across many economies, so no single country crisis wipes out your investment',
          'It has lower fees',
          'It is guaranteed to grow',
        ],
        correct: 1,
        explanation: 'Global diversification means a recession in one country doesn\'t devastate your portfolio.',
      },
    ],
  },

  singleStocks: {
    title: 'Single Stocks',
    intro: 'Picking individual stocks can generate high returns — but the risks are significant. Most private investors underperform the market.',
    questions: [
      {
        id: 'ss_q1',
        question: 'What is the biggest risk of investing in a single company\'s stock?',
        options: [
          'The stock might be hard to sell',
          'The company could go bankrupt, losing you everything invested in it',
          'Single stocks don\'t pay dividends',
          'You need a special license',
        ],
        correct: 1,
        explanation: 'A company can fail entirely. Unlike an index, a single stock can go to zero.',
      },
      {
        id: 'ss_q2',
        question: 'What does "diversification" mean in investing?',
        options: [
          'Investing only in one company you know well',
          'Spreading investments across many assets to reduce the impact of any single failure',
          'Buying the same stock at different times',
          'Investing in different currencies',
        ],
        correct: 1,
        explanation: 'Diversification is the key principle: don\'t put all your eggs in one basket.',
      },
      {
        id: 'ss_q3',
        question: 'A friend tells you a "hot tip" about a stock. What should you do?',
        options: [
          'Invest your entire savings immediately',
          'Research it carefully, be sceptical, and never invest more than you can afford to lose',
          'Always follow tips from people you trust',
          'Report them to the police',
        ],
        correct: 1,
        explanation: 'Most hot tips don\'t pan out. Even if legal, concentration in one stock based on a tip is speculative, not investing.',
      },
      {
        id: 'ss_q4',
        question: 'What is volatility?',
        options: [
          'The total return of a stock over 10 years',
          'How much a stock\'s price fluctuates up and down over time',
          'The dividend payment schedule',
          'The stock\'s price relative to competitors',
        ],
        correct: 1,
        explanation: 'High volatility means big price swings — exciting when they go up, terrifying when they go down.',
      },
      {
        id: 'ss_q5',
        question: 'You own stocks in 5 different industries and one sector crashes. What happens?',
        options: [
          'All your stocks crash equally',
          'Only your stocks in that industry are heavily affected; others may even rise',
          'Nothing — sectors are unrelated to stock prices',
          'The government compensates you',
        ],
        correct: 1,
        explanation: 'Sector diversification means a crisis in banking doesn\'t destroy your healthcare or tech holdings.',
      },
    ],
  },

  fx: {
    title: 'Foreign Exchange (FX)',
    intro: 'FX trading involves buying and selling currencies. It is the world\'s largest market — and among the most complex for individuals.',
    questions: [
      {
        id: 'fx_q1',
        question: 'What is FX trading?',
        options: [
          'Investing in fixed-income bonds from foreign countries',
          'Buying one currency while selling another, profiting from exchange rate changes',
          'Buying foreign stocks on Swiss exchanges',
          'Exchanging money at an airport',
        ],
        correct: 1,
        explanation: 'FX (foreign exchange) trading is speculating on or hedging currency pair movements, e.g. CHF/USD.',
      },
      {
        id: 'fx_q2',
        question: 'What caused the "SNB shock" in January 2015?',
        options: [
          'The Swiss stock market crashed 40%',
          'The Swiss National Bank suddenly removed the EUR/CHF floor, causing CHF to surge 20% in minutes',
          'Switzerland left the EU',
          'Inflation in Switzerland reached 10%',
        ],
        correct: 1,
        explanation: 'The SNB unexpectedly removed the EUR/CHF minimum exchange rate, causing extreme volatility and losses for FX traders.',
      },
      {
        id: 'fx_q3',
        question: 'Why is FX considered high-risk for retail investors?',
        options: [
          'It requires a minimum investment of CHF 1 million',
          'Leverage amplifies both gains and losses, and most retail FX traders lose money',
          'FX is illegal in Switzerland',
          'Currencies can only be bought during banking hours',
        ],
        correct: 1,
        explanation: 'Over 70% of retail FX traders lose money. Leverage means small moves create large losses.',
      },
      {
        id: 'fx_q4',
        question: 'For a long-term investor (15+ years), how should FX fit in a portfolio?',
        options: [
          'As the main investment — currencies always grow',
          'As a small hedge or diversifier, not a core holding',
          'FX should be 80% of a conservative portfolio',
          'Only professional traders should ever touch FX',
        ],
        correct: 1,
        explanation: 'FX can provide diversification and hedging, but long-term wealth is built through equities and bonds — not currency speculation.',
      },
      {
        id: 'fx_q5',
        question: 'What is "currency risk" for a Swiss investor buying US stocks?',
        options: [
          'There is no risk — the USD is very stable',
          'If the USD weakens against CHF, your US investment returns in CHF are reduced',
          'Swiss law prevents currency losses',
          'Currency risk only applies to FX trading, not to stocks',
        ],
        correct: 1,
        explanation: 'When you invest abroad, exchange rate movements can reduce returns even if the investment itself performs well.',
      },
    ],
  },
}
