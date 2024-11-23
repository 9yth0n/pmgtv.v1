/** @type {import('tailwindcss').Config} */
const { COLORS } = require('./src/theme/colors');
const { FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, LETTER_SPACING } = require('./src/theme/typography');
const { SPACING, BORDER_RADIUS, SHADOWS } = require('./src/theme/spacing');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      // Base Colors
      primary: COLORS.primary,
      'primary-light': COLORS.primaryLight,
      'primary-dark': COLORS.primaryDark,
      secondary: COLORS.secondary,
      'secondary-light': COLORS.secondaryLight,
      'secondary-dark': COLORS.secondaryDark,
      accent: COLORS.accent,
      success: COLORS.success,
      error: COLORS.error,
      warning: COLORS.warning,
      info: COLORS.info,

      // Grayscale
      white: COLORS.white,
      black: COLORS.black,
      gray: {
        100: COLORS.gray100,
        200: COLORS.gray200,
        300: COLORS.gray300,
        400: COLORS.gray400,
        500: COLORS.gray500,
        600: COLORS.gray600,
        700: COLORS.gray700,
        800: COLORS.gray800,
        900: COLORS.gray900,
      },

      // Semantic Colors
      text: COLORS.text,
      'text-secondary': COLORS.textSecondary,
      'text-disabled': COLORS.textDisabled,
      background: COLORS.background,
      surface: COLORS.surface,
      border: COLORS.border,
      
      // Trading Colors
      'chart-up': COLORS.chartUp,
      'chart-down': COLORS.chartDown,
    },
    extend: {
      fontFamily: FONT_FAMILY,
      fontSize: FONT_SIZE,
      lineHeight: LINE_HEIGHT,
      letterSpacing: LETTER_SPACING,
      spacing: SPACING,
      borderRadius: BORDER_RADIUS,
      boxShadow: SHADOWS,
    },
  },
  plugins: [],
};
