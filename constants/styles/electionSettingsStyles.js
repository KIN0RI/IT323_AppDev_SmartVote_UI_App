import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

const electionSettingsStyles = StyleSheet.create({
  page:              { flexGrow: 1, backgroundColor: colors.bgLight, padding: spacing.md, paddingBottom: 40 },
  successBanner:     { backgroundColor: '#dcfce7', borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  successText:       { color: colors.success, fontWeight: '600', textAlign: 'center' },
  statusCard:        { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md, elevation: 2 },
  statusLeft:        { marginBottom: spacing.md },
  statusTitle:       { fontSize: font.md, fontWeight: '700', color: colors.primary },
  statusSub:         { fontSize: font.sm, color: colors.textMuted, marginBottom: spacing.sm },
  statusBadge:       { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.full },
  badgeOpen:         { backgroundColor: '#dcfce7' },
  badgeClosed:       { backgroundColor: '#fee2e2' },
  statusBadgeText:   { fontWeight: '700', fontSize: font.sm },
  textOpen:          { color: colors.success },
  textClosed:        { color: colors.danger },
  toggleStatusBtn:   { borderRadius: radius.md, padding: 12, alignItems: 'center' },
  toggleClose:       { backgroundColor: colors.danger },
  toggleOpen:        { backgroundColor: colors.success },
  toggleStatusText:  { color: '#fff', fontWeight: '700', fontSize: font.base },
  card:              { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md, elevation: 2 },
  sectionTitle:      { fontSize: font.md, fontWeight: '700', color: colors.primary, marginBottom: spacing.md },
  label:             { fontSize: font.sm, fontWeight: '600', color: colors.textDark, marginBottom: 4 },
  input:             { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm, fontSize: font.base, color: colors.textDark, marginBottom: spacing.md, backgroundColor: '#FAFAFA' },
  rowFields:         { flexDirection: 'row', gap: spacing.sm },
  halfField:         { flex: 1 },
  toggleRow:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  toggleInfo:        { flex: 1, marginRight: spacing.md },
  toggleTitle:       { fontSize: font.base, fontWeight: '700', color: colors.textDark },
  toggleSub:         { fontSize: font.sm, color: colors.textMuted },
  saveBtn:           { backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  saveBtnText:       { color: '#fff', fontWeight: '700', fontSize: font.md },
});

export default electionSettingsStyles;
