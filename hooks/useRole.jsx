// src/hooks/useRole.jsx
// Web used localStorage — mobile uses AsyncStorage

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useRole() {
  const [role, setRole] = useState('student');

  useEffect(() => {
    AsyncStorage.getItem('userRole').then((stored) => {
      if (stored) setRole(stored);
    });
  }, []);

  return role;
}

export default useRole;
