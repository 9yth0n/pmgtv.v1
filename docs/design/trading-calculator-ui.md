# Trading Calculator UI/UX Design Guide

## Main Screens Layout

### 1. Dashboard Screen
```
+------------------+------------------+
|   Account Stats  |  Daily Progress  |
+------------------+------------------+
|                                    |
|        Performance Charts          |
|                                    |
+------------------+------------------+
|  Recent Trades   | Risk Available  |
+------------------+------------------+
```

### 2. Trade Entry Screen
```
+------------------+------------------+
|   Pair Selection | Position Type   |
+------------------+------------------+
|   Entry Price    | Stop Loss       |
+------------------+------------------+
|   Take Profit    | Leverage        |
+------------------+------------------+
|        Risk Calculator            |
+----------------------------------+
|      Position Size Preview        |
+----------------------------------+
```

### 3. Trade Log Screen
```
+----------------------------------+
|        Date Filter Bar           |
+----------------------------------+
|                                  |
|     Scrollable Trade History     |
|     - Expandable Trade Cards     |
|     - Quick Stats               |
|                                  |
+----------------------------------+
|     Summary Statistics Bar       |
+----------------------------------+
```

## Color Scheme

### Trading Colors
```css
:root {
  /* Position Colors */
  --long-color: #25B685;  /* Green */
  --short-color: #E54666; /* Red */
  
  /* Risk Levels */
  --safe-risk: #4CAF50;
  --medium-risk: #FFC107;
  --high-risk: #FF5722;
  
  /* UI Colors */
  --background: #1C1C28;
  --surface: #2A2A3C;
  --primary: #6B8AFE;
  --secondary: #8E59FF;
}
```

## Component Design

### 1. Trade Entry Form
- Clean, step-by-step layout
- Real-time validation
- Quick preset buttons
- Clear error indicators
- Auto-calculation displays

### 2. Risk Calculator
```
+----------------------------------+
|  Starting Capital: $10,000       |
+----------------------------------+
|  Risk Per Trade: 1% ($100)       |
|  [================] Slider       |
+----------------------------------+
|  Position Size: 0.5 BTC          |
|  Leverage: 10x                   |
|  Liquidation Price: $45,000      |
+----------------------------------+
```

### 3. Performance Metrics
- Clear, large numbers
- Color-coded indicators
- Trend arrows
- Mini charts
- Progress bars

## Interactive Elements

### 1. Input Fields
```css
.input-field {
  background: var(--surface);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 12px;
  color: white;
}

.input-field:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(107,138,254,0.2);
}
```

### 2. Buttons
```css
.button {
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
}

.button-primary {
  background: var(--primary);
  color: white;
}

.button-risk {
  background: var(--safe-risk);
}
```

## Mobile Responsiveness

### 1. Trade Entry
- Stack inputs vertically
- Full-width buttons
- Collapsible sections
- Bottom sheet for advanced options

### 2. Trade Log
- Swipeable trade cards
- Pull to refresh
- Infinite scroll
- Quick actions menu

## Animations

### 1. State Changes
```css
.transition-all {
  transition: all 0.3s ease;
}

.slide-up {
  transform: translateY(0);
  opacity: 1;
}

.slide-down {
  transform: translateY(20px);
  opacity: 0;
}
```

### 2. Loading States
- Skeleton screens
- Smooth transitions
- Progress indicators
- Success/error animations

## Typography

```css
:root {
  --font-heading: 'Inter', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  
  --size-heading-1: 24px;
  --size-heading-2: 20px;
  --size-body: 16px;
  --size-small: 14px;
}
```

## Accessibility

### 1. Color Contrast
- All text meets WCAG 2.1 standards
- Alternative color schemes
- Clear focus states

### 2. Touch Targets
- Minimum 44x44px
- Adequate spacing
- Clear feedback

## Error States

### 1. Validation Errors
```css
.input-error {
  border-color: var(--high-risk);
  background: rgba(229,70,102,0.1);
}

.error-message {
  color: var(--high-risk);
  font-size: var(--size-small);
  margin-top: 4px;
}
```

### 2. Error Messages
- Clear, actionable text
- Icon indicators
- Recovery suggestions

## Loading States

### 1. Skeleton Screens
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--surface) 0%,
    rgba(255,255,255,0.1) 50%,
    var(--surface) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### 2. Progress Indicators
- Minimal spinners
- Progress bars
- Loading messages
