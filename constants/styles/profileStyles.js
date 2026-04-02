import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

const profileStyles = StyleSheet.create({
  page:           { flexGrow: 1, backgroundColor: colors.bgLight, paddingBottom: 40 },
  hero:           { backgroundColor: colors.primary, padding: spacing.xl, alignItems: 'center' },
  avatar:         { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  avatarText:     { color: '#fff', fontSize: 36, fontWeight: '700' },
  heroName:       { color: '#fff', fontSize: font.xl, fontWeight: '700', marginBottom: 4 },
  heroRole:       { color: 'rgba(255,255,255,0.75)', fontSize: font.base },
  successBanner:  { backgroundColor: '#dcfce7', padding: spacing.md, margin: spacing.md, borderRadius: radius.md },
  successText:    { color: colors.success, fontWeight: '600', textAlign: 'center' },
  card:           { margin: spacing.md, backgroundColor: colors.cardBg, borderRadius: radius.lg, padding: spacing.lg, elevation: 2 },
  sectionTitle:   { fontSize: font.lg, fontWeight: '700', color: colors.primary, marginBottom: spacing.md },
  profileRow:     { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  profileLabel:   { fontSize: font.base, color: colors.textMuted, flex: 1 },
  profileValue:   { fontSize: font.base, color: colors.textDark, fontWeight: '600', flex: 1, textAlign: 'right' },
  formGroup:      { marginBottom: spacing.md },
  label:          { fontSize: font.sm, fontWeight: '600', color: colors.textDark, marginBottom: 4 },
  input:          { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, fontSize: font.base, color: colors.textDark },
  btnRow:         { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  btn:            { flex: 1, backgroundColor: colors.primary, borderRadius: radius.md, padding: 13, alignItems: 'center' },
  btnText:        { color: '#fff', fontWeight: '700', fontSize: font.base },
  outlineBtn:     { flex: 1, borderWidth: 1, borderColor: colors.primary, borderRadius: radius.md, padding: 13, alignItems: 'center' },
  outlineBtnText: { color: colors.primary, fontWeight: '600', fontSize: font.base },
});

export default profileStyles;
