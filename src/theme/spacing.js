// Base Spacing Unit (4px)
const BASE = 4;

// Spacing Scale
export const SPACING = {
  // Absolute Values
  xxs: BASE * 1,    // 4px
  xs: BASE * 2,     // 8px
  sm: BASE * 3,     // 12px
  md: BASE * 4,     // 16px
  lg: BASE * 6,     // 24px
  xl: BASE * 8,     // 32px
  xxl: BASE * 12,   // 48px
  xxxl: BASE * 16,  // 64px
  
  // Component-specific Spacing
  containerPadding: BASE * 4,     // 16px
  sectionSpacing: BASE * 8,       // 32px
  cardPadding: BASE * 4,          // 16px
  buttonPadding: `${BASE * 3}px ${BASE * 6}px`,  // 12px 24px
  inputPadding: `${BASE * 3}px ${BASE * 4}px`,   // 12px 16px
  
  // Layout Spacing
  pageMargin: BASE * 6,          // 24px
  contentWidth: '1200px',
  sidebarWidth: '280px',
  headerHeight: '64px',
  footerHeight: '80px',
  
  // Grid System
  gridGap: BASE * 4,             // 16px
  gridMargin: BASE * 4,          // 16px
  
  // Trading Specific
  chartPadding: BASE * 4,        // 16px
  tickerPadding: BASE * 2,       // 8px
  orderBookSpacing: BASE * 1,    // 4px
};

// Border Radius
export const BORDER_RADIUS = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '24px',
  full: '9999px',
};

// Shadows
export const SHADOWS = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  focus: '0 0 0 3px rgba(41, 98, 255, 0.3)',
  none: 'none',
};

// Z-Index Scale
export const Z_INDEX = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
};

// Breakpoints
export const BREAKPOINTS = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};
