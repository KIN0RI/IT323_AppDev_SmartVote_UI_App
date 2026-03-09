import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function ProtectedRoute({ children, allowedRole }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userRole').then((role) => {
      if (!role) {
        router.replace('/login');
      } else if (allowedRole && role !== allowedRole) {
        router.replace('/login');
      } else {
        setChecking(false);
      }
    });
  }, []);

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