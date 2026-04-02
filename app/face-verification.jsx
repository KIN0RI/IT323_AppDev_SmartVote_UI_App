import { CameraView } from 'expo-camera';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useFaceVerification from '../hooks/useFaceVerification';
import faceVerificationStyles from '../constants/styles/faceVerificationStyles';
import { colors } from '../constants/theme';

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
    <ScrollView contentContainerStyle={faceVerificationStyles.page}>
      <View style={faceVerificationStyles.card}>

        <Text style={faceVerificationStyles.icon}>📸</Text>
        <Text style={faceVerificationStyles.title}>Face Verification</Text>
        <Text style={faceVerificationStyles.subtitle}>Confirm your identity to proceed</Text>

        <View style={faceVerificationStyles.cameraBox}>
          {status === 'streaming' || status === 'verifying' || status === 'success' ? (
            <CameraView
              ref={cameraRef}
              style={faceVerificationStyles.camera}
              facing="front"
            >
              {status === 'verifying' && (
                <View style={faceVerificationStyles.scanOverlay}>
                  <Text style={faceVerificationStyles.scanText}>🔍 Scanning...</Text>
                </View>
              )}
              {status === 'success' && (
                <View style={faceVerificationStyles.scanOverlay}>
                  <Text style={faceVerificationStyles.scanText}>✅ Verified!</Text>
                </View>
              )}
            </CameraView>
          ) : (
            <View style={faceVerificationStyles.cameraOff}>
              <Text style={faceVerificationStyles.cameraEmoji}>📷</Text>
              <Text style={faceVerificationStyles.cameraOffText}>Camera Off</Text>
            </View>
          )}
        </View>

        <Text style={[faceVerificationStyles.message, { color: messageColor }]}>{message}</Text>

        {status === 'idle' && (
          <TouchableOpacity style={faceVerificationStyles.btn} onPress={startCamera}>
            <Text style={faceVerificationStyles.btnText}>Start Camera</Text>
          </TouchableOpacity>
        )}

        {status === 'streaming' && (
          <TouchableOpacity style={faceVerificationStyles.btn} onPress={handleVerify}>
            <Text style={faceVerificationStyles.btnText}>Verify Identity</Text>
          </TouchableOpacity>
        )}

        {status === 'error' && (
          <TouchableOpacity style={[faceVerificationStyles.btn, faceVerificationStyles.btnOutline]} onPress={handleRetry}>
            <Text style={[faceVerificationStyles.btnText, { color: colors.primary }]}>Retry</Text>
          </TouchableOpacity>
        )}

        {status === 'verifying' && (
          <View style={[faceVerificationStyles.btn, { opacity: 0.7 }]}>
            <Text style={faceVerificationStyles.btnText}>Verifying...</Text>
          </View>
        )}

      </View>
    </ScrollView>
  );
}

export default FaceVerificationScreen;