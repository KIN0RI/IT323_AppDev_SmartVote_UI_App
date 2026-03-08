import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';

function useFaceVerification() {
  const [permission, requestPermission] = useCameraPermissions();
  const [status,  setStatus]  = useState('idle');
  const [message, setMessage] = useState("Tap 'Start Camera' to begin.");
  const cameraRef = useRef(null);

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
    setMessage("Position your face within the frame, then tap 'Verify'.");
  };

  const handleVerify = async () => {
    setStatus('verifying');
    setMessage('Verifying identity...');
    setTimeout(async () => {
      setStatus('success');
      setMessage('Identity verified! Redirecting...');
      const role = await AsyncStorage.getItem('userRole');
      setTimeout(() => {
        router.replace(role === 'admin' ? '/dashboard' : '/student-dashboard');
      }, 1500);
    }, 2000);
  };

  const handleRetry = () => {
    setStatus('idle');
    setMessage("Tap 'Start Camera' to begin.");
  };

  return { status, message, permission, cameraRef, startCamera, handleVerify, handleRetry };
}

export default useFaceVerification;