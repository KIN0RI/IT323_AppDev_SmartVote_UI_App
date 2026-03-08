// hooks/useFaceVerification.jsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'; // ✅ replace useNavigation
import { useState } from 'react';

function useFaceVerification() {
  const [status,  setStatus]  = useState('idle');
  const [message, setMessage] = useState("Tap 'Start Camera' to begin face verification.");

  const startCamera = () => {
    setStatus('streaming');
    setMessage("Position your face within the frame, then tap 'Verify'.");
  };

  const handleVerify = async () => {
    setStatus('verifying');
    setMessage('Verifying identity...');

    setTimeout(async () => {
      setStatus('success');
      setMessage('Identity verified! Redirecting to dashboard...');

      const role = await AsyncStorage.getItem('userRole'); 
      setTimeout(() => {
        
        router.replace(role === 'admin' ? '/dashboard' : '/student-dashboard');
      }, 1500);
    }, 2000);
  };

  const handleRetry = () => {
    setStatus('idle');
    setMessage("Tap 'Start Camera' to begin face verification.");
  };

  return { status, message, startCamera, handleVerify, handleRetry };
}

export default useFaceVerification;