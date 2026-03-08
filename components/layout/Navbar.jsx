// components/layout/Navbar.jsx
// Mirrors web: src/components/layout/Navbar.jsx
// Web used: <nav>, NavLink, useNavigate, localStorage
// Mobile uses: <View>, useRouter, AsyncStorage, useState

import { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Modal,
  StyleSheet, Image, Pressable,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Nav links per role — mirrors web's conditional NavLink list
const studentLinks = [
  { label: 'Dashboard', path: '/student-dashboard' },
  { label: 'Vote',      path: '/vote'              },
  { label: 'Results',   path: '/results'           },
  { label: 'Profile',   path: '/profile'           },
];

const adminLinks = [
  { label: 'Dashboard', path: '/dashboard'          },
  { label: 'Voter Log', path: '/voter-log'          },
  { label: 'Candidates',path: '/manage-candidates'  },
  { label: 'Results',   path: '/results'            },
  { label: 'Settings',  path: '/election-settings'  },
];

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const [role,          setRole]          = useState('student');
  const [dropdownOpen,  setDropdownOpen]  = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userRole').then((r) => { if (r) setRole(r); });
  }, []);

  const links = role === 'admin' ? adminLinks : studentLinks;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userRole');
    setDropdownOpen(false);
    router.replace('/login');
  };

  const handleNav = (path) => {
    setDropdownOpen(false);
    router.push(path);
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.inner}>

        {/* Logo */}
        <TouchableOpacity style={styles.logoRow} onPress={() => handleNav(role === 'admin' ? '/dashboard' : '/student-dashboard')}>
          <Text style={styles.logoEmoji}>🗳️</Text>
          <Text style={styles.logoText}>SmartVote</Text>
        </TouchableOpacity>

        {/* Nav links (horizontal scroll for mobile) */}
        <View style={styles.navLinks}>
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <TouchableOpacity key={link.path} onPress={() => handleNav(link.path)}>
                <Text style={[styles.navLink, isActive && styles.navLinkActive]}>
                  {link.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Profile dropdown trigger */}
        <TouchableOpacity style={styles.profileBtn} onPress={() => setDropdownOpen(true)}>
          <Text style={styles.profileIcon}>👤</Text>
          <Text style={styles.profileRole}>{role === 'admin' ? 'Admin' : 'Student'}</Text>
          <Text style={styles.chevron}>▾</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown modal */}
      <Modal transparent visible={dropdownOpen} animationType="fade" onRequestClose={() => setDropdownOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setDropdownOpen(false)}>
          <View style={styles.dropdown}>
            {role === 'student' && (
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNav('/profile')}>
                <Text style={styles.dropdownText}>👤 My Profile</Text>
              </TouchableOpacity>
            )}
            {role === 'admin' && (
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNav('/election-settings')}>
                <Text style={styles.dropdownText}>⚙️ Settings</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.dropdownItem, styles.dropdownLogout]} onPress={handleLogout}>
              <Text style={styles.dropdownLogoutText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar:           { backgroundColor: '#1A3C6E', elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 4 },
  inner:            { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
  logoRow:          { flexDirection: 'row', alignItems: 'center', gap: 6, marginRight: 6 },
  logoEmoji:        { fontSize: 18 },
  logoText:         { color: '#fff', fontWeight: '700', fontSize: 15 },
  navLinks:         { flex: 1, flexDirection: 'row', gap: 4, flexWrap: 'nowrap', overflow: 'hidden' },
  navLink:          { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  navLinkActive:    { color: '#fff', backgroundColor: 'rgba(255,255,255,0.15)' },
  profileBtn:       { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  profileIcon:      { fontSize: 14 },
  profileRole:      { color: '#fff', fontSize: 12, fontWeight: '600' },
  chevron:          { color: '#fff', fontSize: 11 },
  modalOverlay:     { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  dropdown:         { position: 'absolute', top: 56, right: 14, backgroundColor: '#fff', borderRadius: 10, elevation: 8, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, minWidth: 160, overflow: 'hidden' },
  dropdownItem:     { paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  dropdownText:     { fontSize: 14, color: '#1e293b', fontWeight: '600' },
  dropdownLogout:   { borderBottomWidth: 0 },
  dropdownLogoutText: { fontSize: 14, color: '#dc2626', fontWeight: '600' },
});
