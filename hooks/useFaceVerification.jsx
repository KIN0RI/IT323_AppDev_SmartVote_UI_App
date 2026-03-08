import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useFaceVerification() {
  const navigation = useNavigation();
  const [status,  setStatus]  = useState('idle'); 
  const [message, setMessage] = useState("Tap 'Start Camera' to begin face verification.");

  const startCamera = () => {
    
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
        navigation.navigate(role === 'admin' ? 'Dashboard' : 'StudentDashboard');
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
