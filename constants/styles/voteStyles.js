import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

const voteStyles = StyleSheet.create({
  scroll:             { flex: 1, backgroundColor: colors.bgLight },
  page:               { paddingBottom: 40 },
  header:             { backgroundColor: colors.primary, padding: spacing.lg, marginBottom: 0 },
  title:              { fontSize: font.xl, fontWeight: '700', color: '#fff' },
  subtitle:           { fontSize: font.base, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  section:            { backgroundColor: colors.cardBg, padding: spacing.md, marginBottom: spacing.sm, elevation: 1 },
  progressRow:        { flexDirection: 'row', paddingVertical: spacing.xs },
  stepWrapper:        { alignItems: 'center', marginRight: spacing.md, width: 64 },
  stepCircle:         { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.border, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  stepDone:           { backgroundColor: colors.success },
  stepActive:         { backgroundColor: colors.primary },
  stepNumber:         { color: '#fff', fontWeight: '700', fontSize: font.sm },
  stepLabel:          { fontSize: 10, color: colors.textMuted, textAlign: 'center' },
  positionBanner:     { backgroundColor: colors.accent, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, marginBottom: spacing.sm },
  positionBannerText: { fontSize: font.sm, color: colors.primary, fontWeight: '600' },
  candidates:         { gap: spacing.sm, paddingHorizontal: spacing.md, marginBottom: spacing.md },
  candidateCard:      { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  avatar:             { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  avatarText:         { color: '#fff', fontSize: font.lg, fontWeight: '700' },
  candidateInfo:      { flex: 1 },
  candidateName:      { fontSize: font.md, fontWeight: '700', color: colors.textDark },
  candidatePosition:  { fontSize: font.sm, color: colors.secondary, marginTop: 2 },
  voteBtn:            { backgroundColor: colors.primary, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  voteBtnText:        { color: '#fff', fontWeight: '700', fontSize: font.base },
  backBtn:            { marginHorizontal: spacing.md, borderWidth: 1, borderColor: colors.primary, borderRadius: radius.md, padding: 12, alignItems: 'center' },
  backBtnText:        { color: colors.primary, fontWeight: '600', fontSize: font.base },
});

export default voteStyles;
