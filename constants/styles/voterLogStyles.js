import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

const voterLogStyles = StyleSheet.create({
  page:                { flex: 1, backgroundColor: colors.bgLight },
  controls:            { backgroundColor: colors.cardBg, padding: spacing.md, elevation: 2 },
  searchInput:         { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm, fontSize: font.base, color: colors.textDark, marginBottom: spacing.sm, backgroundColor: '#FAFAFA' },
  filterRow:           { flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.sm },
  filterBtn:           { paddingHorizontal: 14, paddingVertical: 6, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgLight },
  filterBtnActive:     { backgroundColor: colors.primary, borderColor: colors.primary },
  filterBtnText:       { fontSize: font.sm, color: colors.textMuted, fontWeight: '600' },
  filterBtnTextActive: { color: '#fff' },
  count:               { fontSize: font.sm, color: colors.textMuted },
  row:                 { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  rowLeft:             { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar:              { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  avatarText:          { color: '#fff', fontWeight: '700', fontSize: font.md },
  voterName:           { fontSize: font.base, fontWeight: '700', color: colors.textDark },
  voterMeta:           { fontSize: font.sm, color: colors.textMuted },
  voterEmail:          { fontSize: font.sm, color: colors.textMuted },
  statusBadge:         { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm },
  badgeVoted:          { backgroundColor: '#dcfce7' },
  badgePending:        { backgroundColor: '#fef3c7' },
  statusText:          { fontSize: font.sm, fontWeight: '700' },
  textVoted:           { color: colors.success },
  textPending:         { color: colors.warning },
  empty:               { alignItems: 'center', padding: spacing.xl },
  emptyText:           { color: colors.textMuted, fontSize: font.base },
});

export default voterLogStyles;
