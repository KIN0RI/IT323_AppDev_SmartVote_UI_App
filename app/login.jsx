import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert, Image, ScrollView,
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import api from '../api';
import loginStyles from '../constants/styles/loginStyles';
import { colors } from '../constants/theme';

function LoginScreen() {
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [role,      setRole]      = useState('student');
  const [loading,   setLoading]   = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    if (role === 'student' && !email.endsWith('@gmail.com')) {
      Alert.alert('Invalid Email', 'Students must use a Gmail address (@gmail.com).');
      return;
    }
    if (role === 'admin' && !email.endsWith('@ustp.edu.ph')) {
      Alert.alert('Invalid Email', 'Admins must use a USTP email address (@ustp.edu.ph).');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login-email/', { email, password });
      await AsyncStorage.setItem('access_token',  res.data.access);
      await AsyncStorage.setItem('refresh_token', res.data.refresh);
      await AsyncStorage.setItem('userRole',      res.data.role);
      await AsyncStorage.setItem('full_name',     res.data.full_name);
      await AsyncStorage.setItem('student_id',    res.data.student_id);
      router.replace('/face-verification');
    } catch (err) {
      const msg = err.response?.data?.detail || 'Invalid email or password.';
      Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={loginStyles.page}>
      <View style={loginStyles.card}>
        <Image
          source={require('../assets/images/logo.png')}
          style={loginStyles.logoImg}
          resizeMode="contain"
        />
        <Text style={loginStyles.title}>USTP SmartVote</Text>
        <Text style={loginStyles.subtitle}>Sign in to access the voting system</Text>

        <View style={loginStyles.roleRow}>
          {['student', 'admin'].map((r) => (
            <TouchableOpacity
              key={r}
              style={[loginStyles.roleBtn, role === r && loginStyles.roleBtnActive]}
              onPress={() => setRole(r)}
            >
              <Text style={[loginStyles.roleBtnText, role === r && loginStyles.roleBtnTextActive]}>
                {r === 'student' ? '🎓 Student' : '🛡️ Admin'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={loginStyles.input}
          placeholder="Email"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Password"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity style={loginStyles.btn} onPress={handleLogin} disabled={loading}>
          <Text style={loginStyles.btnText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={loginStyles.linkText}>
            Don't have an account? <Text style={loginStyles.link}>Register here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default LoginScreen;