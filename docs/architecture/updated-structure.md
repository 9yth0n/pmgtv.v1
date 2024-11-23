# Updated Application Structure

## Navigation Flow
```
Authentication Flow
├── Splash Screen
├── Login Screen
│   ├── Email/Password
│   ├── OAuth Options
│   └── Biometric Auth
└── Registration Screen

Main Navigation
├── Dashboard (Home)
│   ├── TradingView Widgets
│   │   ├── Advanced Chart
│   │   ├── Market Overview
│   │   ├── Technical Analysis
│   │   └── Crypto Market
│   └── Quick Stats
│
├── Portfolio & Analytics
│   ├── Asset Overview
│   │   ├── Total Value
│   │   ├── Asset Distribution
│   │   └── Performance Metrics
│   ├── Asset List
│   │   ├── Individual Holdings
│   │   └── Asset Details
│   └── Analytics
│       ├── Portfolio Performance
│       ├── Risk Metrics
│       └── Historical Analysis
│
├── Trading Journal
│   ├── Trade Log
│   │   ├── Trade History
│   │   └── Trade Details
│   ├── Performance Metrics
│   │   ├── Win Rate
│   │   ├── Profit Factor
│   │   └── Risk/Reward Ratio
│   └── Trade Calculator
│       ├── Position Size
│       ├── Risk Management
│       └── Profit Targets
│
└── Watchlist
    ├── Favorite Pairs
    ├── Custom Lists
    └── Price Alerts
```

## Project Structure
```
/src
├── auth/
│   ├── components/
│   │   ├── Login/
│   │   └── Register/
│   └── services/
│       ├── auth.service.js
│       └── oauth.service.js
│
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   └── Loading/
│   │
│   ├── dashboard/
│   │   ├── TradingViewWidget/
│   │   ├── MarketOverview/
│   │   └── QuickStats/
│   │
│   ├── portfolio/
│   │   ├── AssetOverview/
│   │   ├── AssetList/
│   │   └── Analytics/
│   │
│   ├── journal/
│   │   ├── TradeLog/
│   │   ├── Performance/
│   │   └── Calculator/
│   │
│   └── watchlist/
│       ├── PairList/
│       └── AlertList/
│
├── screens/
│   ├── auth/
│   │   ├── Splash.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── Dashboard.jsx
│   ├── Portfolio.jsx
│   ├── Journal.jsx
│   └── Watchlist.jsx
│
├── services/
│   ├── tradingview.js
│   ├── storage.js
│   ├── analytics.js
│   └── api.js
│
├── store/
│   ├── auth/
│   ├── portfolio/
│   ├── journal/
│   └── watchlist/
│
└── utils/
    ├── formatters/
    ├── validators/
    └── calculations/
```

## Key Features

### Authentication
- Email/Password login
- OAuth integration (Google, Apple)
- Biometric authentication
- Session management
- Secure token storage

### Dashboard
- Multiple TradingView widgets
- Customizable layout
- Quick access to key metrics
- Real-time market data

### Portfolio & Analytics
- Asset tracking
- Portfolio valuation
- Performance metrics
- Risk analysis
- Historical data visualization

### Trading Journal
- Detailed trade logging
- Performance analytics
- Risk management calculations
- Trade history export
- Notes and screenshots

### Watchlist
- Custom watchlists
- Price alerts
- Market overview
- Quick analysis tools

## Technical Implementation

### State Management
```javascript
// Example Redux structure
const store = {
  auth: {
    user: null,
    token: null,
    loading: false
  },
  portfolio: {
    assets: [],
    totalValue: 0,
    performance: {}
  },
  journal: {
    trades: [],
    metrics: {},
    calculations: {}
  },
  watchlist: {
    pairs: [],
    alerts: []
  }
};
```

### Data Persistence
- Secure local storage
- Cloud synchronization
- Offline capability
- Regular backups

### Performance Optimization
- Lazy loading of widgets
- Data caching
- Efficient re-rendering
- Memory management

### Security
- Encrypted storage
- Secure API calls
- Token management
- Data privacy

## UI/UX Considerations

### Loading States
- Splash screen
- Skeleton loaders
- Progress indicators
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Landscape/portrait handling
- Widget responsiveness

### Theme Support
- Dark/light modes
- Custom color schemes
- Consistent styling
- Figma integration ready
