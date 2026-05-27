import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import api from '../api';
import faceVerificationStyles from '../constants/styles/faceVerificationStyles';
import { colors } from '../constants/theme';

function FaceRegistrationScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [status,  setStatus]  = useState('idle');
  const [message, setMessage] = useState("Tap 'Start Camera' to begin face registration.");
  const [capturedUri,    setCapturedUri]    = useState(null);
  const [capturedBase64, setCapturedBase64] = useState(null);
  const cameraRef = useRef(null);

  const messageColor = status === 'success'
    ? colors.success
    : status === 'error'
    ? colors.danger
    : colors.textMuted;

  const startCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        setStatus('error');
        setMessage('Camera permission denied. Please allow camera access.');
        return;
      }
    }
    setStatus('streaming');
    setCapturedUri(null);
    setCapturedBase64(null);
    setMessage("Position your face clearly, then tap 'Capture'.");
  };

  const handleCapture = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
      setCapturedUri(photo.uri);
      setCapturedBase64(photo.base64);
      setStatus('captured');
      setMessage('Photo captured. Tap Submit to register, or Retake to try again.');
    } catch {
      setStatus('error');
      setMessage('Failed to capture photo. Please try again.');
    }
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    setMessage('Registering your face...');
    try {
      await api.post('/face/register-face/', { image: `data:image/jpeg;base64,${capturedBase64}` });
      setStatus('success');
      setMessage('Face registered! Redirecting to verification...');
      setTimeout(() => router.replace('/face-verification'), 1500);
    } catch (err) {
      const detail = err.response?.data?.detail || 'Registration failed. Please try again.';
      setStatus('error');
      setMessage(detail);
    }
  };

  const handleRetake = () => {
    setStatus('streaming');
    setCapturedUri(null);
    setCapturedBase64(null);
    setMessage("Position your face clearly, then tap 'Capture'.");
  };

  const handleRetry = () => {
    setStatus('idle');
    setCapturedUri(null);
    setCapturedBase64(null);
    setMessage("Tap 'Start Camera' to begin face registration.");
  };

  return (
    <ScrollView contentContainerStyle={faceVerificationStyles.page}>
      <View style={faceVerificationStyles.card}>

        <Text style={faceVerificationStyles.icon}>🪪</Text>
        <Text style={faceVerificationStyles.title}>Register Face</Text>
        <Text style={faceVerificationStyles.subtitle}>Take a clear photo to set up face verification</Text>

        <View style={faceVerificationStyles.cameraBox}>
          {status === 'streaming' ? (
            <CameraView ref={cameraRef} style={faceVerificationStyles.camera} facing="front" />
          ) : status === 'captured' || status === 'submitting' ? (
            <Image source={{ uri: capturedUri }} style={faceVerificationStyles.camera} />
          ) : status === 'success' ? (
            <View style={[faceVerificationStyles.cameraOff, { backgroundColor: '#166534' }]}>
              <Text style={faceVerificationStyles.cameraEmoji}>✅</Text>
              <Text style={faceVerificationStyles.cameraOffText}>Registered!</Text>
            </View>
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
          <TouchableOpacity style={faceVerificationStyles.btn} onPress={handleCapture}>
            <Text style={faceVerificationStyles.btnText}>Capture</Text>
          </TouchableOpacity>
        )}

        {status === 'captured' && (
          <View style={{ width: '100%', gap: 12 }}>
            <TouchableOpacity style={faceVerificationStyles.btn} onPress={handleSubmit}>
              <Text style={faceVerificationStyles.btnText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[faceVerificationStyles.btn, faceVerificationStyles.btnOutline]}
              onPress={handleRetake}
            >
              <Text style={[faceVerificationStyles.btnText, { color: colors.primary }]}>Retake</Text>
            </TouchableOpacity>
          </View>
        )}

        {status === 'submitting' && (
          <View style={[faceVerificationStyles.btn, { opacity: 0.7 }]}>
            <Text style={faceVerificationStyles.btnText}>Submitting...</Text>
          </View>
        )}

        {status === 'error' && (
          <TouchableOpacity
            style={[faceVerificationStyles.btn, faceVerificationStyles.btnOutline]}
            onPress={handleRetry}
          >
            <Text style={[faceVerificationStyles.btnText, { color: colors.primary }]}>Try Again</Text>
          </TouchableOpacity>
        )}

      </View>
    </ScrollView>
  );
}

export default FaceRegistrationScreen;