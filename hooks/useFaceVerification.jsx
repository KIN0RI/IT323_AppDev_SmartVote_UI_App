import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCameraPermissions } from 'expo-camera';
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

    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
      const imageBase64 = `data:image/jpeg;base64,${photo.base64}`;

      const response = await api.post('/face/verify/', { image: imageBase64 });
      const { verified, confidence, message: msg } = response.data;

      if (verified) {
        setStatus('success');
        setMessage(`Identity verified! Confidence: ${Math.round(confidence * 100)}%`);
        const role = await AsyncStorage.getItem('userRole');
        setTimeout(() => {
          router.replace(role === 'admin' ? '/dashboard' : '/student-dashboard');
        }, 1500);
      } else {
        setStatus('error');
        setMessage(msg || 'Face does not match. Please try again.');
      }
    } catch (err) {
      const detail = err.response?.data?.detail || 'Verification failed. Please try again.';
      if (detail.toLowerCase().includes('no registered face')) {
        setStatus('error');
        setMessage('No face registered. Redirecting to face registration...');
        setTimeout(() => router.replace('/face-registration'), 2000);
      } else {
        setStatus('error');
        setMessage(detail);
      }
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setMessage("Tap 'Start Camera' to begin.");
  };

  return { status, message, permission, cameraRef, startCamera, handleVerify, handleRetry };
}

export default useFaceVerification;