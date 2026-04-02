import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

const loginStyles = StyleSheet.create({
  page:              { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  card:              { width: '100%', maxWidth: 400, backgroundColor: colors.cardBg, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 },
  logoPlaceholder:   { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  logoImg:           { width: 80, height: 80, marginBottom: spacing.md },
  title:             { fontSize: font.xl, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  subtitle:          { fontSize: font.base, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },
  roleRow:           { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md, width: '100%' },
  roleBtn:           { flex: 1, padding: spacing.sm, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center', backgroundColor: colors.bgLight },
  roleBtnActive:     { backgroundColor: colors.primary, borderColor: colors.primary },
  roleBtnText:       { fontSize: font.base, color: colors.textDark, fontWeight: '600' },
  roleBtnTextActive: { color: '#fff' },
  input:             { width: '100%', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, fontSize: font.md, color: colors.textDark, backgroundColor: '#FAFAFA' },
  btn:               { width: '100%', backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.md },
  btnText:           { color: '#fff', fontWeight: '700', fontSize: font.md },
  linkText:          { fontSize: font.sm, color: colors.textMuted },
  link:              { color: colors.secondary, fontWeight: '600' },
});

export default loginStyles;
