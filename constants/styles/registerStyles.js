import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

const registerStyles = StyleSheet.create({
  page:         { flexGrow: 1, backgroundColor: colors.bgLight, padding: spacing.lg, alignItems: 'center', justifyContent: 'center' },
  card:         { width: '100%', maxWidth: 420, backgroundColor: colors.cardBg, borderRadius: radius.lg, padding: spacing.lg, elevation: 4, shadowColor: '#000', shadowOpacity: 0.08 },
  icon:         { fontSize: 36, textAlign: 'center', marginBottom: spacing.sm },
  title:        { fontSize: font.xl, fontWeight: '700', color: colors.primary, textAlign: 'center', marginBottom: 4 },
  subtitle:     { fontSize: font.base, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.lg },
  formGroup:    { marginBottom: spacing.md },
  label:        { fontSize: font.sm, fontWeight: '600', color: colors.textDark, marginBottom: 4 },
  input:        { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, fontSize: font.md, color: colors.textDark, backgroundColor: '#FAFAFA' },
  btn:          { backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.md },
  btnText:      { color: '#fff', fontWeight: '700', fontSize: font.md },
  linkText:     { textAlign: 'center', fontSize: font.sm, color: colors.textMuted },
  link:         { color: colors.secondary, fontWeight: '600' },
  successPage:  { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  successIcon:  { fontSize: 56, marginBottom: spacing.md },
  successTitle: { fontSize: font.xl, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  successSub:   { fontSize: font.md, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },
});

export default registerStyles;
