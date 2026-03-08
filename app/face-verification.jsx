import { CameraView } from 'expo-camera';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';
import useFaceVerification from '../hooks/useFaceVerification';

function FaceVerificationScreen() {
  const {
    status, message, cameraRef,
    startCamera, handleVerify, handleRetry
  } = useFaceVerification();

  const messageColor = status === 'success'
    ? colors.success
    : status === 'error'
    ? colors.danger
    : colors.textMuted;

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>

        <Text style={styles.icon}>📸</Text>
        <Text style={styles.title}>Face Verification</Text>
        <Text style={styles.subtitle}>Confirm your identity to proceed</Text>

        {/* Camera Box */}
        <View style={styles.cameraBox}>
          {status === 'streaming' || status === 'verifying' || status === 'success' ? (
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="front"
            >
              {status === 'verifying' && (
                <View style={styles.scanOverlay}>
                  <Text style={styles.scanText}>🔍 Scanning...</Text>
                </View>
              )}
              {status === 'success' && (
                <View style={styles.scanOverlay}>
                  <Text style={styles.scanText}>✅ Verified!</Text>
                </View>
              )}
            </CameraView>
          ) : (
            <View style={styles.cameraOff}>
              <Text style={styles.cameraEmoji}>📷</Text>
              <Text style={styles.cameraOffText}>Camera Off</Text>
            </View>
          )}
        </View>

        <Text style={[styles.message, { color: messageColor }]}>{message}</Text>

        {status === 'idle' && (
          <TouchableOpacity style={styles.btn} onPress={startCamera}>
            <Text style={styles.btnText}>Start Camera</Text>
          </TouchableOpacity>
        )}

        {status === 'streaming' && (
          <TouchableOpacity style={styles.btn} onPress={handleVerify}>
            <Text style={styles.btnText}>Verify Identity</Text>
          </TouchableOpacity>
        )}

        {status === 'error' && (
          <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={handleRetry}>
            <Text style={[styles.btnText, { color: colors.primary }]}>Retry</Text>
          </TouchableOpacity>
        )}

        {status === 'verifying' && (
          <View style={[styles.btn, { opacity: 0.7 }]}>
            <Text style={styles.btnText}>Verifying...</Text>
          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:          { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  card:          { width: '100%', maxWidth: 400, backgroundColor: colors.cardBg, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', elevation: 4 },
  icon:          { fontSize: 48, marginBottom: spacing.sm },
  title:         { fontSize: font.xl, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  subtitle:      { fontSize: font.base, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },
  cameraBox:     { width: '100%', aspectRatio: 4/3, borderRadius: radius.md, overflow: 'hidden', marginBottom: spacing.md, backgroundColor: '#0f172a' },
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

export default FaceVerificationScreen;