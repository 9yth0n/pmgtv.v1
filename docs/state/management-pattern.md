# State Management Pattern

## Overview

Our trading platform uses a combination of global state (Redux) and local state (React hooks) to manage different types of data:

```
Global State (Redux)
├── Market Data
├── User Data
├── Trading State
└── App Settings

Local State (Hooks)
├── UI State
├── Form Data
└── Component State
```

## Global State Structure

### Market Data
```javascript
{
  markets: {
    pairs: {
      'BTC/USD': {
        price: 50000,
        change24h: 2.5,
        volume: 1000000,
        high24h: 51000,
        low24h: 49000
      }
    },
    orderBooks: {
      'BTC/USD': {
        bids: [[50000, 1.5], [49900, 2.0]],
        asks: [[50100, 1.0], [50200, 2.0]]
      }
    }
  }
}
```

### Trading State
```javascript
{
  orders: {
    pending: [],
    active: [],
    filled: [],
    cancelled: []
  },
  positions: {
    'BTC/USD': {
      size: 1.5,
      entryPrice: 50000,
      unrealizedPnL: 500
    }
  }
}
```

## State Updates

### Market Data Updates
```javascript
// Action creator for price updates
const updatePrice = (pair, price) => ({
  type: 'MARKET/PRICE_UPDATE',
  payload: { pair, price }
});

// Reducer
const marketReducer = (state, action) => {
  switch (action.type) {
    case 'MARKET/PRICE_UPDATE':
      return {
        ...state,
        pairs: {
          ...state.pairs,
          [action.payload.pair]: {
            ...state.pairs[action.payload.pair],
            price: action.payload.price
          }
        }
      };
  }
};
```

## WebSocket Integration

### Connection Management
```javascript
function* watchWebSocket() {
  while (true) {
    try {
      const socket = new WebSocket(WS_URL);
      yield put(wsConnected());
      
      const channel = yield call(createWebSocketChannel, socket);
      
      while (true) {
        const action = yield take(channel);
        yield put(action);
      }
    } catch (err) {
      yield put(wsError(err));
      yield delay(1000); // Reconnection delay
    }
  }
}
```

## Local State Patterns

### Chart State
```javascript
const ChartComponent = () => {
  const [timeframe, setTimeframe] = useState('1D');
  const [indicators, setIndicators] = useState([]);
  const [chartType, setChartType] = useState('candlestick');
  
  // Local state for chart-specific features
  const [crosshair, setCrosshair] = useState(null);
  const [selectedCandle, setSelectedCandle] = useState(null);
  
  return (/* Chart JSX */);
};
```

## Performance Optimizations

### Selector Memoization
```javascript
const selectPairPrice = createSelector(
  state => state.markets.pairs,
  (_, pair) => pair,
  (pairs, pair) => pairs[pair]?.price
);
```

### Component Updates
```javascript
const PriceDisplay = React.memo(({ pair }) => {
  const price = useSelector(state => selectPairPrice(state, pair));
  return <Text>{price}</Text>;
});
```

## Error Handling

### Action Error Structure
```javascript
{
  type: 'MARKET/PRICE_UPDATE_ERROR',
  error: true,
  payload: {
    message: 'WebSocket disconnected',
    code: 'WS_DISCONNECT',
    timestamp: Date.now()
  }
}
```

## State Persistence

### Storage Configuration
```javascript
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings', 'user'],
  blacklist: ['markets', 'orderBook']
};
```
