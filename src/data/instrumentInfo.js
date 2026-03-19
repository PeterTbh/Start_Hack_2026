// Long-term investor perspective for each instrument
// Shown via the ⓘ button in the market modal

export const INSTRUMENT_INFO = {

  // ── Bonds ──────────────────────────────────────────────────────────────────
  SWISS_BOND: {
    horizon: 'Long-term (5–20 yrs)',
    horizonColor: '#60A5FA',
    thesis: 'Swiss government and investment-grade corporate bonds are the bedrock of capital preservation. The Swiss National Bank has maintained one of the most stable monetary regimes in the world, meaning CHF bonds rarely default and act as a shock absorber when equities crash.',
    drivers: ['SNB interest rate decisions', 'Swiss inflation trajectory', 'Flight-to-safety during global crises'],
    risks: ['Low nominal returns in low-rate environments', 'Purchasing power erosion if inflation spikes', 'CHF appreciation hurts exporters but helps bond holders'],
    verdict: 'Core holding for stability. Don\'t expect fireworks — expect a cushion.',
  },

  GLOBAL_BOND: {
    horizon: 'Medium-term (3–10 yrs)',
    horizonColor: '#60A5FA',
    thesis: 'The Bloomberg Global Aggregate gives you exposure to thousands of bonds across 70+ countries, CHF-hedged so currency swings don\'t eat your return. A true diversifier that captures income from the entire global fixed-income market.',
    drivers: ['Global central bank rate cycles', 'Credit spreads between developed and emerging markets', 'Hedging cost (CHF forward rates)'],
    risks: ['Hedging cost erodes yield in periods of high CHF interest rate differential', 'Correlated losses if global rates rise simultaneously (2022 proved this)', 'Lower yield than equities long-term'],
    verdict: 'Better diversification than a single country. Still a defensive instrument, not a growth engine.',
  },

  // ── Gold ───────────────────────────────────────────────────────────────────
  GOLD_CHF: {
    horizon: 'Very long-term (10–30 yrs)',
    horizonColor: '#FBBF24',
    thesis: 'Gold has been a store of value for 5,000 years and has no earnings, no dividends — only scarcity. It thrives when investors distrust paper money, central banks print aggressively, or geopolitical risk spikes. Over long periods it roughly tracks inflation. In CHF terms it has been exceptional as the USD weakened vs CHF over time.',
    drivers: ['Real interest rates (lower real rates → gold rallies)', 'USD weakness', 'Central bank gold purchases', 'Geopolitical uncertainty', 'Inflation fears'],
    risks: ['Pays zero income — no dividends, no coupons', 'Can underperform stocks for decades (1980–2000 was brutal)', 'Purely sentiment-driven short term', 'CHF strength sometimes offsets USD gold gains'],
    verdict: '5–15% allocation as insurance. Not a growth asset — a crisis shield.',
  },

  // ── Equity Indices ─────────────────────────────────────────────────────────
  IDX_SMI: {
    horizon: 'Long-term (7–15 yrs)',
    horizonColor: '#4ADE80',
    thesis: 'The SMI is dominated by three defensive giants — Nestlé, Novartis, and Roche — which together make up ~50% of the index. This gives the SMI a uniquely defensive character: it tends to fall less than other indices in downturns. Swiss political stability and the strong CHF make it a haven even within equities.',
    drivers: ['Performance of Nestlé, Novartis, Roche (the "Big Three")', 'Global pharma and consumer staples cycles', 'CHF exchange rate (many SMI companies earn abroad)', 'Swiss National Bank policy'],
    risks: ['Heavy sector concentration (pharma + consumer = >60%)', 'CHF strength hurts export earnings of Swiss companies', 'Limited tech exposure compared to US indices', 'Slow GDP growth in Switzerland'],
    verdict: 'More conservative than DJIA or Nasdaq. Good anchor for a Swiss-based investor.',
  },

  IDX_DJIA: {
    horizon: 'Long-term (7–20 yrs)',
    horizonColor: '#4ADE80',
    thesis: 'The 30 largest US blue-chip companies, from Apple to Boeing to JPMorgan. Despite being price-weighted (a quirk), it closely tracks US economic health. The US has the world\'s deepest capital markets, strongest rule of law for investors, and the reserve currency — a long-term structural advantage.',
    drivers: ['US corporate earnings growth', 'Federal Reserve interest rates', 'USD/CHF exchange rate', 'US economic cycle'],
    risks: ['USD weakness erodes CHF returns significantly', 'US-specific political/regulatory risk', 'Price-weighting makes high-priced stocks disproportionately influential', 'Not exposed to tech mega-caps as much as the Nasdaq'],
    verdict: 'Solid long-term compounder. Currency risk is the main concern for CHF investors.',
  },

  IDX_DAX: {
    horizon: 'Long-term (7–15 yrs)',
    horizonColor: '#4ADE80',
    thesis: 'Germany\'s 40 largest companies — the industrial engine of Europe. Heavy in autos (BMW, Mercedes, VW), chemicals (BASF), finance, and engineering. DAX companies are global exporters, so the index reflects global trade health more than German domestic demand. Historically cheap vs US valuations.',
    drivers: ['Global trade volumes and China demand', 'EUR/CHF rate', 'European Central Bank policy', 'German energy costs (major factor post-Ukraine war)'],
    risks: ['Heavy auto industry exposure facing EV transition disruption', 'Energy dependency (Russia crisis 2022 hit hard)', 'EUR depreciation vs CHF erodes returns', 'Slower structural reform than US peers'],
    verdict: 'Cyclical play on global industrial growth. Buy when valuations are cheap vs US.',
  },

  IDX_STOXX: {
    horizon: 'Long-term (7–15 yrs)',
    horizonColor: '#4ADE80',
    thesis: 'The Eurozone\'s 50 biggest companies across France, Germany, Spain, Italy, Netherlands and more. More diversified than DAX alone — includes luxury (LVMH), energy (TotalEnergies), and telecom. Historically trades at a large discount to US equities, which may eventually revert.',
    drivers: ['ECB monetary policy', 'EUR/CHF exchange rate', 'European economic integration and fiscal policy', 'Global risk appetite'],
    risks: ['Fragmented regulation across member states', 'Persistent EUR weakness vs CHF', 'Political risk (France elections, Italy debt)', 'Underweight technology vs US indices'],
    verdict: 'Value opportunity for patient investors. Cheap, but requires patience for rerating.',
  },

  // ── SMI Stocks ─────────────────────────────────────────────────────────────
  NESN: {
    horizon: 'Very long-term (10–30 yrs)',
    horizonColor: '#F97316',
    thesis: 'Nestlé sells food, water, coffee, and pet food — things people buy regardless of recessions. With 2,000+ brands across 190 countries, it has unmatched distribution and pricing power. It continuously sells divisions and acquires higher-margin businesses (e.g., Nespresso, medical nutrition). A classic "buy and forget" compounder.',
    drivers: ['Pricing power in emerging markets', 'Pet food growth (massive structural trend)', 'Nespresso and premium coffee', 'Portfolio optimization (selling low-margin lines)'],
    risks: ['Exposure to agricultural commodity costs (cocoa, coffee, wheat)', 'Slow innovation cycle vs smaller food-tech disruptors', 'Regulatory pressure on sugar/packaging', 'CHF appreciation hurts translated earnings'],
    verdict: 'Steady compounder. Not exciting, but very reliable over decades.',
  },

  ROG: {
    horizon: 'Long-term (10–20 yrs)',
    horizonColor: '#F97316',
    thesis: 'Roche is the world\'s largest oncology company and a diagnostics powerhouse. Cancer treatment is one of the fastest-growing segments in medicine globally, and Roche\'s pipeline is consistently one of the deepest. Its diagnostics division also benefits from precision medicine trends and pandemic-related demand expansion.',
    drivers: ['Cancer immunotherapy and targeted therapy pipeline', 'Biosimilar competition (risk, but also innovation pressure)', 'Diagnostics growth in personalised medicine', 'Aging global population'],
    risks: ['Patent cliffs on blockbuster drugs (biosimilar erosion)', 'Long R&D timelines — a failed trial can swing the stock 10%+', 'Pricing pressure from US drug reform', 'CHF strength compresses margins'],
    verdict: 'One of the best long-term healthcare bets globally. Defensive, growing, dividend-paying.',
  },

  NOVN: {
    horizon: 'Long-term (10–20 yrs)',
    horizonColor: '#F97316',
    thesis: 'Novartis focuses on innovative medicines after spinning off Sandoz (generics) in 2023. Its pipeline includes heart failure drugs (Entresto), CAR-T cell therapies, and multiple sclerosis treatments. The pure-play innovative pharma strategy may unlock higher valuations as the market rewards R&D productivity.',
    drivers: ['Entresto growth in heart failure market', 'CAR-T cell therapy commercialization', 'Radioligand therapy (targeted cancer treatment)', 'Continued pipeline execution'],
    risks: ['Patent expirations on key drugs', 'High R&D costs with uncertain outcomes', 'US drug pricing policy uncertainty', 'Competition from larger peers (Roche, Pfizer)'],
    verdict: 'Turnaround story post-Sandoz spin-off. Higher risk than Roche, but more upside if pipeline delivers.',
  },

  UBSG: {
    horizon: 'Medium-term (5–10 yrs)',
    horizonColor: '#F97316',
    thesis: 'UBS is the world\'s largest wealth manager after acquiring Credit Suisse in 2023. Managing CHF 5+ trillion in assets, it earns fees on the wealth of ultra-high-net-worth clients globally. Wealth management is a capital-light, fee-based model that scales well — and global wealth is structurally growing.',
    drivers: ['Global wealth creation (especially Asia-Pacific)', 'Credit Suisse integration synergies', 'Market performance (AUM-linked fee income)', 'Swiss regulatory environment'],
    risks: ['Credit Suisse integration risk and legacy legal liabilities', 'Market downturns reduce AUM and fees simultaneously', 'Swiss "too big to fail" pressure and capital requirements', 'Key man risk in wealth management relationships'],
    verdict: 'Attractive if integration goes well. A call option on global wealth growth at a discount.',
  },

  ABBN: {
    horizon: 'Long-term (10–20 yrs)',
    horizonColor: '#F97316',
    thesis: 'ABB is a pure-play on electrification and industrial automation — two of the defining mega-trends of the next 20 years. Data centres, EV charging, factory automation, grid modernization — ABB builds the hardware that makes all of it work. After major restructuring (divested power grids, acquired E-mobility), it is leaner and more focused.',
    drivers: ['Global electrification of industry and transport', 'Data centre power infrastructure boom', 'Factory automation and robotics adoption', 'Energy transition investment (IRA in US, EU Green Deal)'],
    risks: ['Cyclical industrial demand — recessions hit capital spending hard', 'Competition from Siemens, Schneider Electric', 'Execution risk in E-mobility division', 'CHF strength a constant headwind'],
    verdict: 'Structural long-term winner. One of the cleanest plays on electrification in Switzerland.',
  },

  CFR: {
    horizon: 'Very long-term (10–30 yrs)',
    horizonColor: '#F97316',
    thesis: 'Richemont owns Cartier — arguably the most powerful jewelry brand on earth — plus IWC, Jaeger-LeCoultre, Van Cleef & Arpels and others. Luxury watches and jewellery are driven by global wealth growth and aspiration in emerging markets. These items appreciate in value and create loyal repeat customers. Hard to disrupt.',
    drivers: ['Wealth creation in China, Middle East, US', 'Cartier brand power (one of the world\'s most recognised luxury names)', 'Jewellery growing faster than watches', 'E-commerce via YNAP (luxury online)'],
    risks: ['China slowdown hits luxury demand immediately (50%+ of revenues)', 'Currency risk (earns in EUR/USD/CNY, reports in CHF/EUR)', 'Grey market and counterfeiting pressure on watches', 'Dependent on consumer sentiment of ultra-wealthy'],
    verdict: 'Buy when China sentiment is bad, hold forever. Cartier is generational wealth.',
  },

  SREN: {
    horizon: 'Long-term (10–20 yrs)',
    horizonColor: '#F97316',
    thesis: 'Swiss Re insures the insurance companies — when a hurricane hits Florida or an earthquake strikes Japan, Swiss Re pays. As climate change increases the frequency of catastrophic events, primary insurers need more reinsurance capacity. Swiss Re\'s pricing power grows with risk. The business is technical and barrier-to-entry is extremely high.',
    drivers: ['Hardening reinsurance pricing cycle (better terms after disasters)', 'Climate change increasing demand for catastrophe coverage', 'Life & Health reinsurance growth (aging populations)', 'Investment portfolio income (bonds + equities)'],
    risks: ['Catastrophic years can cause large losses (2017, 2020 were tough)', 'Low interest rate periods hurt investment income', 'Reserve inadequacy risk if claims exceed estimates', 'Competitor capacity expansion softens pricing'],
    verdict: 'Steady but lumpy. Great for income (dividend). Benefits from a world with more risk.',
  },

  ZURN: {
    horizon: 'Long-term (10–20 yrs)',
    horizonColor: '#F97316',
    thesis: 'Zurich Insurance operates in 215 countries, selling property & casualty and life insurance to individuals and corporations. Insurance is a scale business with recurring premium income. Zurich has been disciplined about underwriting — avoiding bad risks — and has a strong capital position. It pays a very reliable dividend.',
    drivers: ['Global insurance penetration growth (especially emerging markets)', 'Hardening P&C pricing cycles', 'Digital claims efficiency improvements', 'Corporate insurance demand (cyber, climate)'],
    risks: ['Large natural disaster events', 'Low investment returns in bond portfolio', 'Regulatory capital requirements (Solvency II)', 'Competition from InsurTech disruptors in retail lines'],
    verdict: 'Dividend aristocrat. Boring in the best way — steady income through all market cycles.',
  },

  // ── Tech / Single Stocks ───────────────────────────────────────────────────
  AAPL: {
    horizon: 'Long-term (7–15 yrs)',
    horizonColor: '#A78BFA',
    thesis: 'Apple has transitioned from a hardware company to a services ecosystem. Its 2.2 billion active devices generate recurring revenue through the App Store, Apple Music, iCloud, Apple Pay and TV+. Services margins are ~75% vs ~35% for hardware. The installed base is sticky — most users never switch. Its buyback programme is the largest in history.',
    drivers: ['Services revenue mix shift (higher margin, recurring)', 'India market penetration (next billion iPhone users)', 'Apple Silicon / AI on-device capabilities', 'Financial services expansion (Apple Card, Pay Later)'],
    risks: ['Regulatory pressure on App Store (antitrust globally)', 'China manufacturing dependency and geopolitical risk', 'Saturation in developed markets slowing hardware growth', 'Competition in streaming and services from Amazon, Google'],
    verdict: 'Expensive but one of the most powerful ecosystems in history. Core tech holding.',
  },

  MSFT: {
    horizon: 'Long-term (7–20 yrs)',
    horizonColor: '#A78BFA',
    thesis: 'Microsoft is the premier enterprise software platform — Windows, Office 365, Teams, and Azure cloud. Its OpenAI partnership (ChatGPT, Copilot) has positioned it as the AI layer for business software. Azure is the #2 cloud provider and growing fast. Enterprise customers on multi-year contracts provide extreme revenue visibility.',
    drivers: ['Azure cloud market share gains', 'AI Copilot monetization across all Office products', 'Gaming (Xbox, Activision Blizzard acquisition)', 'GitHub and developer tools dominance'],
    risks: ['OpenAI valuation and dependency risk', 'Regulatory scrutiny of cloud dominance and Activision deal', 'Azure losing share to AWS in key segments', 'Cybersecurity incidents (they manage critical infrastructure)'],
    verdict: 'Best-in-class compounder. The infrastructure of global enterprise for decades to come.',
  },

  NVDA: {
    horizon: 'Medium-term (5–10 yrs — very high growth)',
    horizonColor: '#A78BFA',
    thesis: 'NVIDIA dominates the GPU market that powers AI training and inference. Every major AI model — GPT-4, Gemini, LLaMA — runs on NVIDIA H100/B200 chips. Its CUDA software moat makes switching extremely costly. The AI infrastructure build-out is a multi-trillion dollar cycle and NVIDIA captures the margin-rich hardware layer.',
    drivers: ['AI model training and inference compute demand', 'Data centre capex from Microsoft, Google, Amazon, Meta', 'Automotive AI (self-driving chips)', 'Gaming GPU refresh cycles'],
    risks: ['Extremely high valuation — priced for perfection', 'AMD, Intel, and in-house chips (Google TPU, Amazon Trainium) competing', 'Export controls on China (major revenue risk)', 'Customer concentration (hyperscalers = >50% revenue)'],
    verdict: 'Highest risk, highest reward. The pick-and-shovel of the AI gold rush. Volatile — size accordingly.',
  },

  AMZN: {
    horizon: 'Long-term (7–15 yrs)',
    horizonColor: '#A78BFA',
    thesis: 'Amazon is three businesses: e-commerce (low margin, volume play), AWS cloud (high margin, growing fast), and advertising (fastest-growing, very high margin). AWS is the world\'s largest cloud provider and still growing double-digits. Advertising revenue is now larger than Netflix\'s total revenue. The flywheel compounds as Prime membership locks in spending.',
    drivers: ['AWS cloud growth and AI services (Bedrock, CodeWhisperer)', 'Advertising business maturation (structurally high margin)', 'Logistics network (now competing with UPS/FedEx)', 'International e-commerce expansion'],
    risks: ['Antitrust regulation of marketplace practices', 'AWS pricing pressure from Microsoft Azure and Google Cloud', 'Massive capex requirements ($75B+ annually)', 'Thin e-commerce margins sensitive to wages and fuel'],
    verdict: 'Three undervalued businesses in one. AWS and advertising alone justify most of the current price.',
  },

  MCD: {
    horizon: 'Very long-term (10–30 yrs)',
    horizonColor: '#A78BFA',
    thesis: 'McDonald\'s is actually a real estate company that sells franchises — it owns the land and buildings, and franchisees operate 95% of restaurants. This capital-light model generates extremely predictable royalty and rent income. The brand is recognised by more people globally than any other except Coca-Cola. A recession hedge — people trade down to fast food.',
    drivers: ['Franchisee same-store sales growth', 'International expansion (especially in Asia and Africa)', 'Digital loyalty programme (150M+ active users)', 'Menu innovation and value perception'],
    risks: ['Consumer backlash on health concerns (ultra-processed food regulation)', 'Wage inflation compressing franchisee margins', 'Competition from fast-casual (Chipotle, Shake Shack)', 'ESG pressure on meat production and packaging'],
    verdict: 'One of the most durable businesses in the world. Boring, predictable, keeps compounding.',
  },

  KO: {
    horizon: 'Very long-term (10–30 yrs)',
    horizonColor: '#A78BFA',
    thesis: 'Coca-Cola is not just a drink company — it is a distribution and marketing machine with 200+ brands including Fanta, Sprite, Powerade, Honest Tea, and Costa Coffee. It doesn\'t manufacture most products — it concentrates and lets bottlers handle distribution. This asset-light model prints cash. Warren Buffett has held it since 1988.',
    drivers: ['Emerging market volume growth (Africa, South Asia)', 'Premiumisation (Topo Chico, premium mixers)', 'Sports drink and coffee category expansion', 'Pricing power (consistently raises prices above inflation)'],
    risks: ['Sugar tax legislation globally', 'Health consciousness and shift to water/zero-calorie alternatives', 'Plastic packaging regulation', 'Bottler relationship management'],
    verdict: 'Dividend aristocrat. 61 consecutive years of dividend increases. The definition of a forever hold.',
  },

  GS: {
    horizon: 'Medium-term (5–10 yrs)',
    horizonColor: '#A78BFA',
    thesis: 'Goldman Sachs is the premier investment bank for M&A, IPOs, and capital markets — it earns when the economy is confident and dealmaking is active. Under CEO David Solomon, it refocused on its core strengths after the failed Marcus consumer banking experiment. Asset & Wealth Management is the long-term growth engine.',
    drivers: ['M&A and IPO cycle recovery', 'Asset management fee income growth', 'Trading revenues in volatile markets', 'AI-driven efficiency gains in investment banking'],
    risks: ['Highly cyclical — revenues collapse in risk-off environments', 'Regulatory capital requirements limit leverage and returns', 'Competition from Blackstone and other alternative asset managers', 'Reputational risk (historical controversies: 1MDB, Goldman Sachs Malaysia)'],
    verdict: 'Buy at the bottom of M&A cycles. Sell when everyone is talking about IPO booms.',
  },

  NKE: {
    horizon: 'Long-term (7–15 yrs)',
    horizonColor: '#A78BFA',
    thesis: 'Nike is the world\'s most valuable sports brand — it does not manufacture shoes, it designs them and contracts production. The brand commands a 30–40% price premium over competitors and sponsors every major athlete. Direct-to-consumer digital shift is improving margins by cutting retailers out. Emerging market youth aspiration is a powerful secular tailwind.',
    drivers: ['Direct-to-consumer e-commerce growth', 'Emerging market youth consumer (Asia, Africa)', 'Running, training, and lifestyle market expansion', 'SNKRS app and limited edition culture driving full-price demand'],
    risks: ['Current restructuring — laying off 1,600 employees (2024)', 'Competition from On Running, Hoka, Adidas innovation resurgence', 'China consumer nationalism (Li-Ning, Anta competing locally)', 'Supply chain exposure to Southeast Asia (Vietnam, Indonesia tariff risk)'],
    verdict: 'Iconic brand going through a challenging period. Historically a great entry point during Nike down-cycles.',
  },

  // ── FX ─────────────────────────────────────────────────────────────────────
  FX_USDCHF: {
    horizon: 'Short-to-medium (1–5 yrs)',
    horizonColor: '#22D3EE',
    thesis: 'Holding USD vs CHF is a bet that the US dollar stays strong relative to the Swiss franc. Historically the CHF has been the world\'s strongest major currency — it has appreciated against USD over every 10-year period since the 1970s. Short-term, USD can surge (Fed rate hikes, global risk-off), but long-term the CHF structural strength usually wins.',
    drivers: ['Fed vs SNB interest rate differential', 'US economic growth relative to Switzerland', 'Global risk sentiment (USD surges in crises, then reverses)', 'US current account deficit (structural USD weakener)'],
    risks: ['Long-term CHF appreciation trend works against you', 'US fiscal deficit (50-year high) adds secular USD pressure', 'SNB surprise interventions can move CHF sharply', 'Carry cost: holding USD when CHF rates are higher'],
    verdict: 'Tactical, not strategic. Good short-term trade on Fed strength; poor long-term hold for CHF investors.',
  },

  FX_EURCHF: {
    horizon: 'Short-to-medium (1–5 yrs)',
    horizonColor: '#22D3EE',
    thesis: 'EUR/CHF is the most important currency pair for Switzerland — most Swiss trade is with the EU. The SNB has repeatedly intervened to prevent excessive CHF strengthening (2011 floor, 2015 flash crash, ongoing interventions). The long-term trend has been EUR weakness as ECB policy has been looser than SNB. Parity was breached in 2022.',
    drivers: ['ECB vs SNB rate differential', 'Eurozone economic growth and political stability', 'SNB intervention risk (they buy EUR aggressively)', 'European energy prices and current account'],
    risks: ['Political risk in France, Italy can crash EUR suddenly', 'ECB rate hikes can temporarily boost EUR', 'SNB could abandon currency management again (like Jan 2015)', 'Structurally challenging — CHF is systematically stronger than EUR'],
    verdict: 'Slight bias toward further EUR weakness. Mainly tactical. SNB intervention provides a loose floor.',
  },
}
