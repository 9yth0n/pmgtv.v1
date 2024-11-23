# Application Structure

## Main Navigation
```
1. Dashboard (TradingView Charts)
   ├── Full-screen chart
   ├── Quick trade entry
   └── Market overview

2. Trading Journal
   ├── Trade Entry Calculator
   │   ├── Position calculator
   │   ├── Risk management
   │   └── Compounding projector
   │
   ├── Trade Log
   │   ├── Daily records
   │   ├── Performance metrics
   │   └── Trade history
   │
   └── Analytics Dashboard
       ├── Win/Loss ratio
       ├── Pair performance
       └── Risk analysis

3. Watchlist
   ├── Favorite pairs
   ├── Price alerts
   └── Quick analysis
```

## Project Split Recommendation

### Project 1: TradingView Mobile (Current)
Focus:
- TradingView chart integration
- Market data display
- Basic order interface
- Watchlist management

Files to Keep:
```
/src
├── components/
│   ├── TradingViewChart/
│   ├── MarketOverview/
│   └── WatchlistItem/
├── services/
│   └── tradingview.js
└── screens/
    ├── Dashboard/
    └── Watchlist/
```

### Project 2: Trade Journal & Calculator (New)
Focus:
- Trade logging
- Risk calculation
- Performance tracking
- Compounding projections

Suggested Structure:
```
/src
├── components/
│   ├── calculator/
│   │   ├── RiskCalculator/
│   │   ├── PositionSizer/
│   │   └── CompoundingCalculator/
│   │
│   ├── journal/
│   │   ├── TradeEntry/
│   │   ├── TradeLog/
│   │   └── Performance/
│   │
│   └── common/
│       ├── Button/
│       ├── Input/
│       └── Card/
│
├── screens/
│   ├── Calculator/
│   ├── Journal/
│   └── Analytics/
│
├── services/
│   ├── storage/
│   └── calculations/
│
└── utils/
    ├── formatters/
    └── validators/
```

## Development Priority

### Phase 1: TradingView Integration
1. Full-screen chart component
2. Market data integration
3. Basic watchlist functionality

### Phase 2: Trade Journal
1. Trade entry form
2. Risk calculator
3. Position size calculator
4. Trade log

### Phase 3: Analytics
1. Performance metrics
2. Compounding calculator
3. Analytics dashboard
4. Export functionality

## Technical Considerations

### TradingView Project
- Focus on chart performance
- Real-time data handling
- Mobile-optimized controls
- Efficient state management

### Calculator Project
- Offline-first approach
- Local data persistence
- Complex calculations
- Data export/import

## UI/UX Focus

### TradingView Screens
- Minimal interface
- Chart-focused design
- Quick access controls
- Gesture navigation

### Calculator Screens
- Form-based interface
- Clear data visualization
- Step-by-step calculations
- Detailed trade records
