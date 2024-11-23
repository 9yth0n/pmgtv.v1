import { COLORS, baseColors, semanticColors } from './colors';
import {
  FONT_FAMILY,
  FONT_WEIGHT,
  FONT_SIZE,
  LINE_HEIGHT,
  LETTER_SPACING,
  TEXT_TRANSFORM,
  TEXT_STYLE,
} from './typography';
import {
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  Z_INDEX,
  BREAKPOINTS,
} from './spacing';

// Animation Durations
export const ANIMATION = {
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  slowest: '500ms',
};

// Animation Curves
export const ANIMATION_CURVE = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

// Chart Theme
export const CHART_THEME = {
  // General
  backgroundColor: COLORS.background,
  textColor: COLORS.text,
  
  // Grid
  gridColor: COLORS.chartGrid,
  crosshairColor: COLORS.primary,
  
  // Candlesticks
  upColor: COLORS.chartUp,
  downColor: COLORS.chartDown,
  borderUpColor: COLORS.chartUp,
  borderDownColor: COLORS.chartDown,
  wickUpColor: COLORS.chartUp,
  wickDownColor: COLORS.chartDown,
  
  // Volume
  volumeUpColor: COLORS.chartUp,
  volumeDownColor: COLORS.chartDown,
  
  // Indicators
  ma20Color: COLORS.indicatorPrimary,
  ma50Color: COLORS.indicatorSecondary,
  ma200Color: COLORS.indicatorTertiary,
  
  // Bollinger Bands
  bbUpperColor: COLORS.indicatorPrimary,
  bbMiddleColor: COLORS.indicatorSecondary,
  bbLowerColor: COLORS.indicatorPrimary,
  
  // RSI
  rsiLineColor: COLORS.indicatorPrimary,
  rsiOverboughtColor: COLORS.error,
  rsiOversoldColor: COLORS.success,
  
  // MACD
  macdFastColor: COLORS.indicatorPrimary,
  macdSlowColor: COLORS.indicatorSecondary,
  macdSignalColor: COLORS.indicatorTertiary,
  macdDivergenceUp: COLORS.success,
  macdDivergenceDown: COLORS.error,
};

// Theme Object
const theme = {
  colors: COLORS,
  baseColors,
  semanticColors,
  fonts: {
    family: FONT_FAMILY,
    weight: FONT_WEIGHT,
    size: FONT_SIZE,
    lineHeight: LINE_HEIGHT,
    letterSpacing: LETTER_SPACING,
    textTransform: TEXT_TRANSFORM,
    style: TEXT_STYLE,
  },
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  zIndex: Z_INDEX,
  breakpoints: BREAKPOINTS,
  animation: {
    duration: ANIMATION,
    curve: ANIMATION_CURVE,
  },
  chart: CHART_THEME,
};

export default theme;
