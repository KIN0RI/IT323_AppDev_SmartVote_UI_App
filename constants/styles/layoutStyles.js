import { Dimensions, StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.72;

export const drawerStyles = StyleSheet.create({
  overlay:         { flex: 1, flexDirection: 'row' },
  drawer:          { width: DRAWER_WIDTH, backgroundColor: '#fff', elevation: 16, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 12 },
  backdrop:        { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  drawerHeader:    { backgroundColor: colors.primary, padding: spacing.lg, paddingTop: spacing.xl, alignItems: 'flex-start' },
  profileCircle:   { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  profileEmoji:    { fontSize: 30 },
  profileName:     { color: '#fff', fontSize: font.md, fontWeight: '700', marginBottom: 6 },
  roleBadge:       { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.full },
  roleBadgeText:   { color: '#fff', fontSize: font.sm, fontWeight: '600' },
  navSection:      { flex: 1, paddingTop: spacing.sm },
  navItem:         { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: 14, position: 'relative' },
  navItemActive:   { backgroundColor: colors.accent },
  activeIndicator: { position: 'absolute', left: 0, top: 8, bottom: 8, width: 4, backgroundColor: colors.primary, borderRadius: 2 },
  navIcon:         { fontSize: 20, marginRight: spacing.md, width: 28 },
  navLabel:        { fontSize: font.md, color: colors.textDark, fontWeight: '600' },
  navLabelActive:  { color: colors.primary },
  divider:         { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: spacing.lg, marginVertical: spacing.sm },
  logoutItem:      { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: 14 },
  logoutLabel:     { fontSize: font.md, color: colors.danger, fontWeight: '600' },
  drawerFooter:    { padding: spacing.lg, paddingTop: spacing.sm },
  footerText:      { fontSize: font.sm, color: colors.textMuted, textAlign: 'center' },
});

export const footerStyles = StyleSheet.create({
  footer: {
    backgroundColor: '#1A3C6E',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export const navbarStyles = StyleSheet.create({
  navbar:       { backgroundColor: '#1A3C6E', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, elevation: 4 },
  hamburger:    { padding: 6, marginRight: 10, gap: 4 },
  bar:          { width: 22, height: 2.5, backgroundColor: '#fff', borderRadius: 2 },
  logoRow:      { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoEmoji:    { fontSize: 18 },
  logoText:     { color: '#fff', fontWeight: '700', fontSize: 15 },
  profileBtn:   { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  profileEmoji: { fontSize: 16 },
  profileRole:  { color: '#fff', fontSize: 12, fontWeight: '600' },
});
