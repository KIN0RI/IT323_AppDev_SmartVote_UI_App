import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

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
