import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated, Dimensions, Modal,
  Pressable, StyleSheet, Text,
  TouchableOpacity, View,
} from 'react-native';
import { colors, font, radius, spacing } from '../../constants/theme';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.72;

const studentLinks = [
  { icon: '<', label: 'Dashboard',  path: '/student-dashboard' },
  { icon: '<', label: 'Vote',       path: '/vote'              },
  { icon: '<', label: 'Results',    path: '/results'           },
  { icon: '<', label: 'Profile',    path: '/profile'           },
];

const adminLinks = [
  { icon: '<', label: 'Dashboard',         path: '/dashboard'         },
  { icon: '<', label: 'Voter Log',         path: '/voter-log'         },
  { icon: '<', label: 'Manage Candidates', path: '/manage-candidates' },
  { icon: '<', label: 'Results',           path: '/results'           },
  { icon: '<', label: 'Election Settings', path: '/election-settings' },
];

export default function Drawer({ visible, onClose, currentPath }) {
  const [role, setRole] = useState('student');
  const slideAnim  = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AsyncStorage.getItem('userRole').then((r) => { if (r) setRole(r); });
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const links = role === 'admin' ? adminLinks : studentLinks;
  const roleLabel = role === 'admin' ? 'Admin' : 'Student';

  const handleNav = (path) => {
    onClose();
    setTimeout(() => router.push(path), 250);
  };

  const handleLogout = async () => {
    onClose();
    await AsyncStorage.removeItem('userRole');
    setTimeout(() => router.replace('/login'), 250);
  };

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>

        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>


          <View style={styles.drawerHeader}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileEmoji}>👤</Text>
            </View>
            <Text style={styles.profileName}>USTP Student</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>{roleLabel}</Text>
            </View>
          </View>

          <View style={styles.navSection}>
            {links.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <TouchableOpacity
                  key={link.path}
                  style={[styles.navItem, isActive && styles.navItemActive]}
                  onPress={() => handleNav(link.path)}
                >
                  {isActive && <View style={styles.activeIndicator} />}
                  <Text style={styles.navIcon}>{link.icon}</Text>
                  <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                    {link.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>


          <View style={styles.divider} />

          <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
            <Text style={styles.logoutLabel}>Logout</Text>
          </TouchableOpacity>


          <View style={styles.drawerFooter}>
            <Text style={styles.footerText}>USTP SmartVote v1.0</Text>
          </View>

        </Animated.View>

        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay:         { flex: 1, flexDirection: 'row' },
  drawer:          { width: DRAWER_WIDTH, backgroundColor: '#fff', elevation: 16, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 12 },
  backdrop:        { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },

  drawerHeader:    { backgroundColor: colors.primary, padding: spacing.lg, paddingTop: spacing.xl, alignItems: 'flex-start' },
  profileCircle:   { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  profileEmoji:    { fontSize: 30 },
  profileName:     { color: '#fff', fontSize: font.md, fontWeight: '700', marginBottom: 6 },
  roleBadge:       { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.full },
  roleBadgeText:   { color: '#fff', fontSize: font.sm, fontWeight: '600' },


  navSection:      { flex: 1, paddingTop: spacing.sm },
  navItem:         { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: 14, position: 'relative' },
  navItemActive:   { backgroundColor: colors.accent },
  activeIndicator: { position: 'absolute', left: 0, top: 8, bottom: 8, width: 4, backgroundColor: colors.primary, borderRadius: 2 },
  navIcon:         { fontSize: 20, marginRight: spacing.md, width: 28 },
  navLabel:        { fontSize: font.md, color: colors.textDark, fontWeight: '600' },
  navLabelActive:  { color: colors.primary },

  divider:         { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: spacing.lg, marginVertical: spacing.sm },
  logoutItem:      { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: 14 },
  logoutLabel:     { fontSize: font.md, color: colors.danger, fontWeight: '600' },
  drawerFooter:    { padding: spacing.lg, paddingTop: spacing.sm },
  footerText:      { fontSize: font.sm, color: colors.textMuted, textAlign: 'center' },
});