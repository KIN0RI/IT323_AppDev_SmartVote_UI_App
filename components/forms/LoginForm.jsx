// components/forms/LoginForm.jsx
// Mirrors web: src/components/forms/LoginForm.jsx
// Web used: <form>, <input>, <select>, onSubmit, e.preventDefault()
// Mobile uses: <TextInput>, <TouchableOpacity>, Switch, onPress

import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm({ onLogin }) {
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [error,        setError]        = useState('');
  const [isLoading,    setIsLoading]    = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role,         setRole]         = useState('student');

  const handleSubmit = () => {
    setError('');

    // Same validation logic as web LoginForm
    if (role === 'student' && !email.endsWith('@gmail.com')) {
      setError('Students must use a Gmail address (@gmail.com).');
      return;
    }
    if (role === 'admin' && !email.endsWith('@ustp.edu.ph')) {
      setError('Admins must use a USTP email address (@ustp.edu.ph).');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    // Same 1s delay as web
    setTimeout(async () => {
      await AsyncStorage.setItem('userRole', role);
      setIsLoading(false);
      onLogin(email, password, role);
    }, 1000);
  };

  return (
    <View style={styles.form}>

      {/* Error message — mirrors web's sv-form-error */}
      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Role selector — replaces web's <select> */}
      <Text style={styles.label}>Login as</Text>
      <View style={styles.roleRow}>
        {['student', 'admin'].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.roleBtn, role === r && styles.roleBtnActive]}
            onPress={() => !isLoading && setRole(r)}
          >
            <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>
              {r === 'student' ? '🎓 Student' : '🛡️ Admin'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Email — replaces web's <input type="email"> */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, isLoading && styles.inputDisabled]}
        placeholder={role === 'admin' ? 'admin@ustp.edu.ph' : 'student@gmail.com'}
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />

      {/* Password — replaces web's <input type="password"> */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.input, isLoading && styles.inputDisabled]}
        placeholder="Enter your password"
        placeholderTextColor="#94a3b8"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        editable={!isLoading}
      />

      {/* Show password toggle — replaces web's <input type="checkbox"> */}
      <TouchableOpacity
        style={styles.showPasswordRow}
        onPress={() => setShowPassword((v) => !v)}
        disabled={isLoading}
      >
        <View style={[styles.checkbox, showPassword && styles.checkboxChecked]}>
          {showPassword && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.showPasswordLabel}>Show password</Text>
      </TouchableOpacity>

      {/* Submit button — replaces web's <button type="submit"> */}
      <TouchableOpacity
        style={[styles.btn, isLoading && styles.btnDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.btnText}>Sign In</Text>
        }
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  form:               { width: '100%' },
  errorBox:           { backgroundColor: '#fee2e2', borderRadius: 8, padding: 10, marginBottom: 12 },
  errorText:          { color: '#dc2626', fontSize: 13, fontWeight: '500' },
  label:              { fontSize: 13, fontWeight: '600', color: '#1e293b', marginBottom: 4 },
  roleRow:            { flexDirection: 'row', gap: 8, marginBottom: 14 },
  roleBtn:            { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#CCCCCC', alignItems: 'center', backgroundColor: '#F8FAFC' },
  roleBtnActive:      { backgroundColor: '#1A3C6E', borderColor: '#1A3C6E' },
  roleBtnText:        { fontSize: 13, color: '#1e293b', fontWeight: '600' },
  roleBtnTextActive:  { color: '#fff' },
  input:              { borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 8, padding: 12, fontSize: 15, color: '#1e293b', backgroundColor: '#FAFAFA', marginBottom: 12 },
  inputDisabled:      { opacity: 0.6 },
  showPasswordRow:    { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  checkbox:           { width: 18, height: 18, borderWidth: 1.5, borderColor: '#CCCCCC', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked:    { backgroundColor: '#1A3C6E', borderColor: '#1A3C6E' },
  checkmark:          { color: '#fff', fontSize: 11, fontWeight: '700' },
  showPasswordLabel:  { fontSize: 13, color: '#64748b' },
  btn:                { backgroundColor: '#1A3C6E', borderRadius: 8, padding: 14, alignItems: 'center' },
  btnDisabled:        { opacity: 0.65 },
  btnText:            { color: '#fff', fontWeight: '700', fontSize: 15 },
});
