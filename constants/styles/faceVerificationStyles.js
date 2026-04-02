import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

const faceVerificationStyles = StyleSheet.create({
  page:          { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  card:          { width: '100%', maxWidth: 400, backgroundColor: colors.cardBg, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', elevation: 4 },
  icon:          { fontSize: 48, marginBottom: spacing.sm },
  title:         { fontSize: font.xl, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  subtitle:      { fontSize: font.base, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },
  cameraBox:     { width: '100%', aspectRatio: 4 / 3, borderRadius: radius.md, overflow: 'hidden', marginBottom: spacing.md, backgroundColor: '#0f172a' },
  camera:        { flex: 1 },
  cameraOff:     { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cameraEmoji:   { fontSize: 48, marginBottom: spacing.sm },
  cameraOffText: { color: '#fff', fontSize: font.base, fontWeight: '600' },
  scanOverlay:   { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(26,61,124,0.5)', justifyContent: 'center', alignItems: 'center' },
  scanText:      { color: '#fff', fontSize: font.xl, fontWeight: '700' },
  message:       { fontSize: font.base, fontWeight: '500', textAlign: 'center', marginBottom: spacing.lg },
  btn:           { width: '100%', backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  btnOutline:    { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.primary },
  btnText:       { color: '#fff', fontWeight: '700', fontSize: font.md },
});

export default faceVerificationStyles;
