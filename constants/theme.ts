
export const colors = {
  primary:   '#1A3C6E',
  secondary: '#2E86C1',
  accent:    '#EBF5FB',
  success:   '#16a34a',
  danger:    '#dc2626',
  warning:   '#d97706',
  bgLight:   '#F0F4F8',
  bgWhite:   '#FFFFFF',
  textDark:  '#1e293b',
  textMuted: '#64748b',
  border:    '#CCCCCC',
  cardBg:    '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm:   6,
  md:   10,
  lg:   16,
  full: 999,
};

export const font = {
  sm:   12,
  base: 14,
  md:   16,
  lg:   18,
  xl:   22,
  xxl:  28,
};

// Required by app/(tabs)/_layout.tsx — DO NOT REMOVE
// The tab layout imports Colors[colorScheme].tint
export const Colors = {
  light: {
    tint:            '#1A3C6E',
    background:      '#F0F4F8',
    text:            '#1e293b',
    tabIconDefault:  '#94a3b8',
    tabIconSelected: '#1A3C6E',
  },
  dark: {
    tint:            '#2E86C1',
    background:      '#0f172a',
    text:            '#f1f5f9',
    tabIconDefault:  '#64748b',
    tabIconSelected: '#2E86C1',
  },
};