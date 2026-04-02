
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import loginStyles from '../constants/styles/loginStyles';
import { colors } from '../constants/theme';

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
                {r === 'student' ? ' Student' : ' Admin'}
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
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Password"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={loginStyles.btn} onPress={handleLogin}>
          <Text style={loginStyles.btnText}>Sign In</Text>
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