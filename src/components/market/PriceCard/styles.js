import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: SIZES.md,
    borderRadius: SIZES.sm,
    marginBottom: SIZES.sm,
  },
  symbol: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SIZES.xs,
  },
  price: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: SIZES.xs,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
  positive: {
    color: COLORS.success,
  },
  negative: {
    color: COLORS.error,
  },
});
