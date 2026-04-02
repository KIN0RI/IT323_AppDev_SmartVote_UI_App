import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

const studentDashboardStyles = StyleSheet.create({
  page:               { flex: 1, backgroundColor: colors.bgLight },
  content:            { padding: spacing.md },
  statsRow:           { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  statCard:           { flex: 1, backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.sm, alignItems: 'center', elevation: 2 },
  statIcon:           { fontSize: 22, marginBottom: 4 },
  statLabel:          { fontSize: 10, color: colors.textMuted, textAlign: 'center', marginBottom: 4 },
  statValue:          { fontSize: font.lg, fontWeight: '700', color: colors.primary },
  statusBadge:        { fontSize: 10, fontWeight: '700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: radius.sm, overflow: 'hidden' },
  statusOpen:         { backgroundColor: '#dcfce7', color: colors.success },
  statusClosed:       { backgroundColor: '#fee2e2', color: colors.danger },
  actionCard:         { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md, elevation: 2 },
  actionTitle:        { fontSize: font.lg, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  actionSub:          { fontSize: font.base, color: colors.textMuted, marginBottom: spacing.md },
  positionList:       { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md },
  positionBadge:      { backgroundColor: colors.accent, borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  positionBadgeText:  { fontSize: font.sm, color: colors.primary, fontWeight: '600' },
  voteBtn:            { backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center', marginBottom: spacing.sm },
  voteBtnDisabled:    { backgroundColor: colors.textMuted },
  voteBtnText:        { color: '#fff', fontWeight: '700', fontSize: font.md },
  outlineBtn:         { borderWidth: 1, borderColor: colors.primary, borderRadius: radius.md, padding: 12, alignItems: 'center' },
  outlineBtnText:     { color: colors.primary, fontWeight: '600', fontSize: font.base },
  quickLinks:         { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  quickBtn:           { flex: 1, backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', elevation: 2 },
  quickBtnText:       { color: colors.primary, fontWeight: '600', fontSize: font.base },
  sectionTitle:       { fontSize: font.lg, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  announcement:       { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, elevation: 1 },
  announcementIcon:   { fontSize: 18, marginRight: spacing.sm },
  announcementText:   { flex: 1, fontSize: font.base, color: colors.textDark },
});

export default studentDashboardStyles;
