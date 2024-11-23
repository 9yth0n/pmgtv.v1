// Font Families
export const FONT_FAMILY = {
  primary: 'Inter',
  secondary: 'System',
  mono: 'SF Mono',
};

// Font Weights
export const FONT_WEIGHT = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

// Font Sizes
export const FONT_SIZE = {
  // Headers
  h1: '32px',
  h2: '28px',
  h3: '24px',
  h4: '20px',
  h5: '18px',
  h6: '16px',
  
  // Body Text
  bodyLarge: '18px',
  bodyNormal: '16px',
  bodySmall: '14px',
  bodyMicro: '12px',
  
  // Special Cases
  display: '40px',
  jumbo: '48px',
  mega: '56px',
  
  // UI Elements
  button: '16px',
  input: '16px',
  label: '14px',
  caption: '12px',
  
  // Trading Specific
  price: '20px',
  ticker: '16px',
  change: '14px',
};

// Line Heights
export const LINE_HEIGHT = {
  // Headers
  h1: '40px',
  h2: '36px',
  h3: '32px',
  h4: '28px',
  h5: '24px',
  h6: '20px',
  
  // Body Text
  bodyLarge: '28px',
  bodyNormal: '24px',
  bodySmall: '20px',
  bodyMicro: '16px',
  
  // Special Cases
  display: '48px',
  jumbo: '56px',
  mega: '64px',
  
  // UI Elements
  button: '24px',
  input: '24px',
  label: '20px',
  caption: '16px',
  
  // Trading Specific
  price: '28px',
  ticker: '24px',
  change: '20px',
};

// Letter Spacing
export const LETTER_SPACING = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.02em',
  wider: '0.05em',
  widest: '0.1em',
};

// Text Transform
export const TEXT_TRANSFORM = {
  none: 'none',
  capitalize: 'capitalize',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
};

// Text Styles (Combinations)
export const TEXT_STYLE = {
  // Headers
  h1: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: FONT_SIZE.h1,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT.h1,
    letterSpacing: LETTER_SPACING.tight,
  },
  h2: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: FONT_SIZE.h2,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT.h2,
    letterSpacing: LETTER_SPACING.tight,
  },
  h3: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: FONT_SIZE.h3,
    fontWeight: FONT_WEIGHT.semiBold,
    lineHeight: LINE_HEIGHT.h3,
    letterSpacing: LETTER_SPACING.tight,
  },
  
  // Body Text
  bodyLarge: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: FONT_SIZE.bodyLarge,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.bodyLarge,
    letterSpacing: LETTER_SPACING.normal,
  },
  bodyNormal: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: FONT_SIZE.bodyNormal,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.bodyNormal,
    letterSpacing: LETTER_SPACING.normal,
  },
  bodySmall: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: FONT_SIZE.bodySmall,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.bodySmall,
    letterSpacing: LETTER_SPACING.normal,
  },
  
  // UI Elements
  button: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: FONT_SIZE.button,
    fontWeight: FONT_WEIGHT.semiBold,
    lineHeight: LINE_HEIGHT.button,
    letterSpacing: LETTER_SPACING.wide,
    textTransform: TEXT_TRANSFORM.uppercase,
  },
  label: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: FONT_SIZE.label,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.label,
    letterSpacing: LETTER_SPACING.normal,
  },
  
  // Trading Specific
  price: {
    fontFamily: FONT_FAMILY.mono,
    fontSize: FONT_SIZE.price,
    fontWeight: FONT_WEIGHT.semiBold,
    lineHeight: LINE_HEIGHT.price,
    letterSpacing: LETTER_SPACING.tight,
  },
  ticker: {
    fontFamily: FONT_FAMILY.mono,
    fontSize: FONT_SIZE.ticker,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT.ticker,
    letterSpacing: LETTER_SPACING.wide,
  },
  change: {
    fontFamily: FONT_FAMILY.mono,
    fontSize: FONT_SIZE.change,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.change,
    letterSpacing: LETTER_SPACING.normal,
  },
};
