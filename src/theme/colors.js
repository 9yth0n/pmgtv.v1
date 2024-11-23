// Base Colors
export const baseColors = {
  // Primary Colors
  primary: '#2962FF',
  primaryLight: '#768FFF',
  primaryDark: '#0039CB',
  
  // Secondary Colors
  secondary: '#414BB2',
  secondaryLight: '#7376E5',
  secondaryDark: '#002482',
  
  // Accent Colors
  accent: '#FF6B2B',
  accentLight: '#FF9B58',
  accentDark: '#C53B00',

  // Status Colors
  success: '#00C805',
  successLight: '#66FFA6',
  successDark: '#009624',
  
  error: '#FF5000',
  errorLight: '#FF844D',
  errorDark: '#B23C00',
  
  warning: '#FFA726',
  warningLight: '#FFD95B',
  warningDark: '#C77800',
  
  info: '#29B6F6',
  infoLight: '#73E8FF',
  infoDark: '#0086C3',

  // Grayscale
  white: '#FFFFFF',
  gray100: '#F7F9FC',
  gray200: '#EDF1F7',
  gray300: '#E4E9F2',
  gray400: '#C5CEE0',
  gray500: '#8F9BB3',
  gray600: '#2E3A59',
  gray700: '#222B45',
  gray800: '#1A1F33',
  gray900: '#0B0E11',
  black: '#000000',

  // Transparent Colors
  transparentLight: 'rgba(255, 255, 255, 0.1)',
  transparentDark: 'rgba(0, 0, 0, 0.1)',
};

// Semantic Colors
export const semanticColors = {
  // Text Colors
  text: baseColors.white,
  textSecondary: baseColors.gray500,
  textDisabled: baseColors.gray600,
  textInverse: baseColors.gray900,
  
  // Background Colors
  background: baseColors.gray900,
  backgroundAlt: baseColors.gray800,
  surface: 'rgba(22, 23, 29, 0.6)',
  surfaceAlt: 'rgba(22, 23, 29, 0.8)',
  
  // Border Colors
  border: baseColors.gray700,
  borderLight: baseColors.gray600,
  
  // Chart Colors
  chartUp: baseColors.success,
  chartDown: baseColors.error,
  chartVolume: baseColors.gray500,
  chartGrid: baseColors.gray700,
  chartAxis: baseColors.gray500,
  
  // Trading Colors
  bid: baseColors.success,
  ask: baseColors.error,
  spread: baseColors.warning,
  
  // Indicator Colors
  indicatorPrimary: baseColors.primary,
  indicatorSecondary: baseColors.secondary,
  indicatorTertiary: baseColors.info,
  indicatorQuaternary: baseColors.warning,
  
  // Overlay Colors
  overlay: 'rgba(11, 14, 17, 0.7)',
  modalBackground: baseColors.gray800,
  tooltip: baseColors.gray700,
  
  // Interactive Colors
  hover: 'rgba(41, 98, 255, 0.1)',
  active: 'rgba(41, 98, 255, 0.2)',
  selected: 'rgba(41, 98, 255, 0.15)',
  focus: 'rgba(41, 98, 255, 0.3)',
};

export const COLORS = {
  ...baseColors,
  ...semanticColors,
};
