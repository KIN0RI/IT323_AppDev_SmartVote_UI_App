// components/ProtectedRoute.jsx
// Mirrors web: src/components/ProtectedRoute.jsx
// Web used: <Navigate> from react-router-dom + localStorage
// Mobile uses: Expo Router's useRouter + AsyncStorage
//
// HOW TO USE in Expo Router screens:
//   Wrap your screen content with <ProtectedRoute allowedRole="student">
//   It checks AsyncStorage for userRole and redirects if unauthorized.

import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProtectedRoute({ children, allowedRole }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userRole').then((role) => {
      if (!role) {
        // No role — send to login (mirrors web: <Navigate to="/" />)
        router.replace('/login');
      } else if (allowedRole && role !== allowedRole) {
        // Wrong role — send to unauthorized (mirrors web: <Navigate to="/unauthorized" />)
        router.replace('/unauthorized');
      } else {
        setChecking(false);
      }
    });
  }, []);

  // Show spinner while checking (web had no loading state — this is mobile-friendly)
  if (checking) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1A3C6E" />
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
});
