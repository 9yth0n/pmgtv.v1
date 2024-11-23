import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingBottom: Platform.OS === 'ios' ? SIZES.xl : SIZES.md,
    paddingTop: SIZES.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backdropFilter: 'blur(10px)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xs,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: COLORS.primary,
    marginTop: -2,
  },
  tabText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
