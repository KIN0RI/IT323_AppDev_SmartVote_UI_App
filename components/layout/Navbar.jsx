import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Drawer from './Drawer';

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const [role,        setRole]        = useState('student');
  const [drawerOpen,  setDrawerOpen]  = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userRole').then((r) => { if (r) setRole(r); });
  }, []);

  const homePath = role === 'admin' ? '/dashboard' : '/student-dashboard';

  return (
    <>
      <View style={styles.navbar}>

        <TouchableOpacity style={styles.hamburger} onPress={() => setDrawerOpen(true)}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoRow} onPress={() => router.push(homePath)}>
          <Text style={styles.logoEmoji}>🗳️</Text>
          <Text style={styles.logoText}>USTP SmartVote</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileBtn} onPress={() => setDrawerOpen(true)}>
          <Text style={styles.profileEmoji}>👤</Text>
          <Text style={styles.profileRole}>{role === 'admin' ? 'Admin' : 'Student'}</Text>
        </TouchableOpacity>
      </View>

      <Drawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}

const styles = StyleSheet.create({
  navbar:      { backgroundColor: '#1A3C6E', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, elevation: 4 },
  hamburger:   { padding: 6, marginRight: 10, gap: 4 },
  bar:         { width: 22, height: 2.5, backgroundColor: '#fff', borderRadius: 2 },
  logoRow:     { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoEmoji:   { fontSize: 18 },
  logoText:    { color: '#fff', fontWeight: '700', fontSize: 15 },
  profileBtn:  { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  profileEmoji:{ fontSize: 16 },
  profileRole: { color: '#fff', fontSize: 12, fontWeight: '600' },
});