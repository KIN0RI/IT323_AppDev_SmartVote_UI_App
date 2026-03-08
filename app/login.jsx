
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';

function LoginScreen() {
 
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [role,     setRole]     = useState('student');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    await AsyncStorage.setItem('userRole', role);
    router.replace('/face-verification'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>

        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImg}
          resizeMode="contain"
        />

        <Text style={styles.title}>USTP SmartVote</Text>
        <Text style={styles.subtitle}>Sign in to access the voting system</Text>

        <View style={styles.roleRow}>
          {['student', 'admin'].map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.roleBtn, role === r && styles.roleBtnActive]}
              onPress={() => setRole(r)}
            >
              <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>
                {r === 'student' ? ' Student' : ' Admin'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}> 
          <Text style={styles.linkText}>
            Don't have an account? <Text style={styles.link}>Register here</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:              { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  card:              { width: '100%', maxWidth: 400, backgroundColor: colors.cardBg, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 },
  logoPlaceholder:   { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  logoImg:            { width: 80, height: 80, marginBottom: spacing.md },
  title:             { fontSize: font.xl, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  subtitle:          { fontSize: font.base, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },
  roleRow:           { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md, width: '100%' },
  roleBtn:           { flex: 1, padding: spacing.sm, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center', backgroundColor: colors.bgLight },
  roleBtnActive:     { backgroundColor: colors.primary, borderColor: colors.primary },
  roleBtnText:       { fontSize: font.base, color: colors.textDark, fontWeight: '600' },
  roleBtnTextActive: { color: '#fff' },
  input:             { width: '100%', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, fontSize: font.md, color: colors.textDark, backgroundColor: '#FAFAFA' },
  btn:               { width: '100%', backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.md },
  btnText:           { color: '#fff', fontWeight: '700', fontSize: font.md },
  linkText:          { fontSize: font.sm, color: colors.textMuted },
  link:              { color: colors.secondary, fontWeight: '600' },
});

export default LoginScreen;