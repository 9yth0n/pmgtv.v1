# Trading UI Component Examples

This document showcases various UI components built with our Tailwind CSS classes, designed specifically for our trading platform.

## Order Book Component

```jsx
<div className="card w-full max-h-96 overflow-hidden">
  <div className="card-header flex justify-between items-center">
    <h3 className="text-h4">Order Book</h3>
    <div className="flex space-x-2">
      <button className="btn-secondary text-sm">0.1</button>
      <button className="btn-secondary text-sm">0.01</button>
      <button className="btn-secondary text-sm">0.001</button>
    </div>
  </div>
  <div className="card-body p-0">
    {/* Asks */}
    <div className="scrollbar-thin overflow-y-auto h-40">
      <div className="hover:bg-surface/50 p-2 grid grid-cols-3 gap-4">
        <span className="text-error font-mono">45,123.45</span>
        <span className="text-right font-mono">0.5432</span>
        <span className="text-right font-mono text-text-secondary">24,567.89</span>
      </div>
      {/* More ask rows... */}
    </div>
    
    {/* Current Price */}
    <div className="p-3 border-y border-border bg-surface/50 text-center">
      <span className="ticker-symbol">45,123.45</span>
      <span className="price-up ml-2">+2.45%</span>
    </div>
    
    {/* Bids */}
    <div className="scrollbar-thin overflow-y-auto h-40">
      <div className="hover:bg-surface/50 p-2 grid grid-cols-3 gap-4">
        <span className="text-success font-mono">45,122.45</span>
        <span className="text-right font-mono">0.6543</span>
        <span className="text-right font-mono text-text-secondary">29,567.89</span>
      </div>
      {/* More bid rows... */}
    </div>
  </div>
</div>
```

## Trade Form Component

```jsx
<div className="card w-full">
  <div className="card-header">
    <div className="flex justify-between items-center">
      <div className="flex space-x-4">
        <button className="btn-primary">Buy</button>
        <button className="btn-secondary">Sell</button>
      </div>
      <select className="input text-sm">
        <option>Limit</option>
        <option>Market</option>
        <option>Stop Limit</option>
      </select>
    </div>
  </div>
  <div className="card-body space-y-4">
    <div className="space-y-2">
      <label className="text-sm text-text-secondary">Price</label>
      <div className="relative">
        <input type="text" className="input w-full pr-16" placeholder="0.00" />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">USDT</span>
      </div>
    </div>
    <div className="space-y-2">
      <label className="text-sm text-text-secondary">Amount</label>
      <div className="relative">
        <input type="text" className="input w-full pr-16" placeholder="0.00" />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">BTC</span>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-2">
      <button className="btn-secondary text-sm">25%</button>
      <button className="btn-secondary text-sm">50%</button>
      <button className="btn-secondary text-sm">75%</button>
      <button className="btn-secondary text-sm">100%</button>
    </div>
    <button className="btn-primary w-full">Place Buy Order</button>
  </div>
</div>
```

## Market Overview Card

```jsx
<div className="card hover:border-primary/50 transition-colors">
  <div className="card-body space-y-4">
    <div className="flex justify-between items-start">
      <div>
        <span className="ticker-symbol">BTC/USDT</span>
        <div className="text-sm text-text-secondary">Bitcoin</div>
      </div>
      <div className="text-right">
        <div className="price-up text-lg">$45,123.45</div>
        <div className="price-up text-sm">+2.45%</div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">24h Volume</span>
        <span className="font-mono">12,345.67 BTC</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">24h High</span>
        <span className="font-mono text-success">46,789.12</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">24h Low</span>
        <span className="font-mono text-error">44,123.45</span>
      </div>
    </div>
  </div>
</div>
```

## Position Card

```jsx
<div className="card bg-surface/80 backdrop-blur-sm">
  <div className="card-body space-y-4">
    <div className="flex justify-between items-center">
      <div>
        <div className="ticker-symbol">BTC/USDT</div>
        <div className="text-sm text-text-secondary">Long • 10x</div>
      </div>
      <div className="text-right">
        <div className="price-up text-lg">+$1,234.56</div>
        <div className="price-up text-sm">+12.34%</div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <div className="text-text-secondary">Entry Price</div>
        <div className="font-mono">41,234.56</div>
      </div>
      <div>
        <div className="text-text-secondary">Mark Price</div>
        <div className="font-mono">45,123.45</div>
      </div>
      <div>
        <div className="text-text-secondary">Size</div>
        <div className="font-mono">0.5 BTC</div>
      </div>
      <div>
        <div className="text-text-secondary">Margin</div>
        <div className="font-mono">$2,500</div>
      </div>
    </div>
    <div className="flex space-x-2">
      <button className="btn-secondary flex-1">TP/SL</button>
      <button className="btn-primary flex-1">Close</button>
    </div>
  </div>
</div>
```

## Alert Dialog

```jsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
  <div className="card max-w-md w-full mx-4">
    <div className="card-header flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
        <span className="text-warning">⚠️</span>
      </div>
      <h3 className="text-h4">Confirm Order</h3>
    </div>
    <div className="card-body space-y-4">
      <p className="text-text-secondary">
        Are you sure you want to place a market buy order for 0.5 BTC at approximately $45,123.45?
      </p>
      <div className="space-y-2 bg-surface/50 p-3 rounded-md">
        <div className="flex justify-between">
          <span>Order Type</span>
          <span className="font-mono">Market Buy</span>
        </div>
        <div className="flex justify-between">
          <span>Amount</span>
          <span className="font-mono">0.5 BTC</span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-mono">$22,561.73</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <button className="btn-secondary flex-1">Cancel</button>
        <button className="btn-primary flex-1">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

## Loading States

```jsx
{/* Skeleton Loading */}
<div className="card animate-pulse">
  <div className="card-body space-y-4">
    <div className="h-6 bg-surface rounded-md w-1/3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-surface rounded-md w-full"></div>
      <div className="h-4 bg-surface rounded-md w-2/3"></div>
    </div>
  </div>
</div>

{/* Spinner */}
<div className="flex items-center justify-center p-4">
  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
</div>
```

## Toast Notifications

```jsx
{/* Success Toast */}
<div className="fixed bottom-4 right-4 max-w-sm w-full">
  <div className="card bg-success/10 border-success/20 transform transition-all duration-300 hover:scale-102">
    <div className="card-body flex items-center space-x-3">
      <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
        <span className="text-success">✓</span>
      </div>
      <div className="flex-1">
        <div className="font-semibold text-success">Order Placed</div>
        <div className="text-sm">Successfully placed limit buy order for 0.5 BTC</div>
      </div>
      <button className="text-text-secondary hover:text-text">×</button>
    </div>
  </div>
</div>

{/* Error Toast */}
<div className="fixed bottom-4 right-4 max-w-sm w-full">
  <div className="card bg-error/10 border-error/20">
    <div className="card-body flex items-center space-x-3">
      <div className="w-6 h-6 rounded-full bg-error/20 flex items-center justify-center">
        <span className="text-error">!</span>
      </div>
      <div className="flex-1">
        <div className="font-semibold text-error">Order Failed</div>
        <div className="text-sm">Insufficient balance to place order</div>
      </div>
      <button className="text-text-secondary hover:text-text">×</button>
    </div>
  </div>
</div>
```

## Compounding Tracker Components

### Compounding Goal Card

```jsx
<div className="card">
  <div className="card-header flex justify-between items-center">
    <h3 className="text-h4">Compounding Goal</h3>
    <button className="btn-secondary text-sm">Edit Goal</button>
  </div>
  <div className="card-body space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-text-secondary text-sm">Starting Capital</div>
        <div className="font-mono text-lg">$10,000</div>
      </div>
      <div>
        <div className="text-text-secondary text-sm">Target Amount</div>
        <div className="font-mono text-lg">$100,000</div>
      </div>
      <div>
        <div className="text-text-secondary text-sm">Daily Goal</div>
        <div className="font-mono text-lg">1.5%</div>
      </div>
      <div>
        <div className="text-text-secondary text-sm">Time Frame</div>
        <div className="font-mono text-lg">90 days</div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span className="font-mono">45%</span>
      </div>
      <div className="h-2 bg-surface rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
      </div>
    </div>
  </div>
</div>
```

### Daily Performance Tracker

```jsx
<div className="card">
  <div className="card-header flex justify-between items-center">
    <h3 className="text-h4">Daily Performance</h3>
    <div className="flex space-x-2">
      <button className="btn-secondary text-sm">Week</button>
      <button className="btn-primary text-sm">Month</button>
    </div>
  </div>
  <div className="card-body space-y-4">
    <div className="grid grid-cols-7 gap-2">
      {/* Day Performance Card */}
      <div className="p-3 rounded-lg bg-surface/50 text-center">
        <div className="text-sm text-text-secondary">Mon</div>
        <div className="font-mono text-success">+1.2%</div>
        <div className="text-xs text-text-secondary">$120</div>
      </div>
      {/* Repeat for other days... */}
    </div>
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-text-secondary">Weekly Target</span>
        <span className="font-mono text-success">+7.5%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-text-secondary">Weekly Achieved</span>
        <span className="font-mono text-success">+5.2%</span>
      </div>
    </div>
  </div>
</div>
```

### Compound Calculator

```jsx
<div className="card">
  <div className="card-header">
    <h3 className="text-h4">Compound Calculator</h3>
  </div>
  <div className="card-body space-y-4">
    <div className="space-y-3">
      <div>
        <label className="text-sm text-text-secondary">Initial Investment</label>
        <input type="text" className="input w-full" placeholder="$10,000" />
      </div>
      <div>
        <label className="text-sm text-text-secondary">Daily Return (%)</label>
        <input type="text" className="input w-full" placeholder="1.5%" />
      </div>
      <div>
        <label className="text-sm text-text-secondary">Time Period (Days)</label>
        <input type="text" className="input w-full" placeholder="90" />
      </div>
      <div>
        <label className="text-sm text-text-secondary">Compound Frequency</label>
        <select className="input w-full">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
    </div>
    <div className="p-4 bg-surface/50 rounded-lg space-y-2">
      <div className="flex justify-between">
        <span className="text-text-secondary">Final Amount</span>
        <span className="font-mono text-lg">$25,431.23</span>
      </div>
      <div className="flex justify-between">
        <span className="text-text-secondary">Total Profit</span>
        <span className="font-mono text-success">+$15,431.23</span>
      </div>
      <div className="flex justify-between">
        <span className="text-text-secondary">Return</span>
        <span className="font-mono text-success">+154.31%</span>
      </div>
    </div>
  </div>
</div>
```

## Trading Journal Components

### Trade Entry Form

```jsx
<div className="card">
  <div className="card-header">
    <h3 className="text-h4">New Trade Entry</h3>
  </div>
  <div className="card-body space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-text-secondary">Symbol</label>
        <input type="text" className="input w-full" placeholder="BTC/USDT" />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-text-secondary">Setup Type</label>
        <select className="input w-full">
          <option>Break and Retest</option>
          <option>Range Breakout</option>
          <option>Trend Continuation</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-text-secondary">Entry Price</label>
        <input type="text" className="input w-full" placeholder="45,123.45" />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-text-secondary">Position Size</label>
        <input type="text" className="input w-full" placeholder="0.5 BTC" />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-text-secondary">Stop Loss</label>
        <input type="text" className="input w-full" placeholder="44,500.00" />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-text-secondary">Take Profit</label>
        <input type="text" className="input w-full" placeholder="46,000.00" />
      </div>
    </div>
    <div className="space-y-2">
      <label className="text-sm text-text-secondary">Trade Notes</label>
      <textarea className="input w-full h-24" placeholder="Enter your trade analysis, setup description, and emotional state..."></textarea>
    </div>
    <div className="space-y-2">
      <label className="text-sm text-text-secondary">Trade Screenshots</label>
      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
        <div className="text-text-secondary">Drop files here or click to upload</div>
      </div>
    </div>
    <button className="btn-primary w-full">Save Trade</button>
  </div>
</div>
```

### Trade Statistics Card

```jsx
<div className="card">
  <div className="card-header flex justify-between items-center">
    <h3 className="text-h4">Trading Statistics</h3>
    <select className="input text-sm">
      <option>This Week</option>
      <option>This Month</option>
      <option>Last 3 Months</option>
    </select>
  </div>
  <div className="card-body">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 bg-surface/50 rounded-lg">
        <div className="text-text-secondary text-sm">Win Rate</div>
        <div className="font-mono text-lg text-success">65%</div>
        <div className="text-xs text-text-secondary">+5% vs last period</div>
      </div>
      <div className="p-4 bg-surface/50 rounded-lg">
        <div className="text-text-secondary text-sm">Profit Factor</div>
        <div className="font-mono text-lg">2.5</div>
        <div className="text-xs text-text-secondary">+0.3 vs last period</div>
      </div>
      <div className="p-4 bg-surface/50 rounded-lg">
        <div className="text-text-secondary text-sm">Avg Win/Loss</div>
        <div className="font-mono text-lg">1.8</div>
        <div className="text-xs text-text-secondary">+0.2 vs last period</div>
      </div>
      <div className="p-4 bg-surface/50 rounded-lg">
        <div className="text-text-secondary text-sm">Total Trades</div>
        <div className="font-mono text-lg">42</div>
        <div className="text-xs text-text-secondary">-3 vs last period</div>
      </div>
    </div>
  </div>
</div>
```

### Trade History Table

```jsx
<div className="card">
  <div className="card-header flex justify-between items-center">
    <h3 className="text-h4">Trade History</h3>
    <div className="flex space-x-2">
      <button className="btn-secondary text-sm">Export</button>
      <button className="btn-secondary text-sm">Filter</button>
    </div>
  </div>
  <div className="card-body p-0">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left text-text-secondary font-medium">Date</th>
            <th className="p-4 text-left text-text-secondary font-medium">Symbol</th>
            <th className="p-4 text-left text-text-secondary font-medium">Type</th>
            <th className="p-4 text-right text-text-secondary font-medium">Entry</th>
            <th className="p-4 text-right text-text-secondary font-medium">Exit</th>
            <th className="p-4 text-right text-text-secondary font-medium">P/L</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border hover:bg-surface/50">
            <td className="p-4">
              <div>2024-01-20</div>
              <div className="text-sm text-text-secondary">14:30:45</div>
            </td>
            <td className="p-4">
              <div className="font-mono">BTC/USDT</div>
              <div className="text-sm text-text-secondary">Break and Retest</div>
            </td>
            <td className="p-4">
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-success/20 text-success text-sm">Long</div>
            </td>
            <td className="p-4 text-right font-mono">45,123.45</td>
            <td className="p-4 text-right font-mono">45,678.90</td>
            <td className="p-4 text-right">
              <div className="font-mono text-success">+$555.45</div>
              <div className="text-sm text-success">+1.23%</div>
            </td>
          </tr>
          {/* More trade rows... */}
        </tbody>
      </table>
    </div>
  </div>
</div>
```

### Trade Analysis Chart

```jsx
<div className="card">
  <div className="card-header flex justify-between items-center">
    <h3 className="text-h4">Performance Analysis</h3>
    <div className="flex space-x-2">
      <button className="btn-secondary text-sm">Daily</button>
      <button className="btn-primary text-sm">Weekly</button>
      <button className="btn-secondary text-sm">Monthly</button>
    </div>
  </div>
  <div className="card-body">
    <div className="h-64 w-full bg-surface/50 rounded-lg">
      {/* Chart component will go here */}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      <div>
        <div className="text-sm text-text-secondary">Best Day</div>
        <div className="font-mono text-success">+$1,234.56</div>
      </div>
      <div>
        <div className="text-sm text-text-secondary">Worst Day</div>
        <div className="font-mono text-error">-$567.89</div>
      </div>
      <div>
        <div className="text-sm text-text-secondary">Avg Daily Profit</div>
        <div className="font-mono text-success">+$345.67</div>
      </div>
      <div>
        <div className="text-sm text-text-secondary">Standard Deviation</div>
        <div className="font-mono">$123.45</div>
      </div>
    </div>
  </div>
</div>
```

These components are designed to work seamlessly with our theme system and can be easily customized when you bring in your Figma designs. The components use:

1. Consistent spacing and typography from our theme
2. Glass morphism effects for modern UI
3. Smooth animations and transitions
4. Responsive design patterns
5. Accessibility considerations
6. Loading states and error handling
7. Dark theme optimization

When you bring in your Figma designs, you can easily:
1. Adjust colors using our semantic color tokens
2. Modify spacing using our spacing scale
3. Update typography using our text styles
4. Customize border radius and shadows
5. Add brand-specific animations and transitions

Would you like me to create any additional components or explain how to customize these further?