import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';

function RegisterScreen() {
  const [form, setForm] = useState({
    name: '', studentId: '', email: '', password: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.studentId || !form.email || !form.password) return;
    console.log('Registered:', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.successPage}>
        <Text style={styles.successIcon}>🎉</Text>
        <Text style={styles.successTitle}>Registration Complete!</Text>
        <Text style={styles.successSub}>You can now log in to cast your vote.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.replace('/login')}>
          <Text style={styles.btnText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>

        <Text style={styles.icon}>📋</Text>
        <Text style={styles.title}>Voter Registration</Text>
        <Text style={styles.subtitle}>Register to participate in the student election</Text>

        {[
          { field: 'name',      label: 'Full Name',  placeholder: 'Juan Dela Cruz',   type: 'default' },
          { field: 'studentId', label: 'Student ID', placeholder: '2024-00123',       type: 'default' },
          { field: 'email',     label: 'Email',      placeholder: 'student@gmail.com', type: 'email-address' },
          { field: 'password',  label: 'Password',   placeholder: 'Create a password', type: 'default', secure: true },
        ].map(({ field, label, placeholder, type, secure }) => (
          <View key={field} style={styles.formGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor={colors.textMuted}
              value={form[field]}
              onChangeText={(v) => handleChange(field, v)}
              keyboardType={type}
              secureTextEntry={!!secure}
              autoCapitalize={type === 'email-address' ? 'none' : 'words'}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.link}>Sign in here</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:         { flexGrow: 1, backgroundColor: colors.bgLight, padding: spacing.lg, alignItems: 'center', justifyContent: 'center' },
  card:         { width: '100%', maxWidth: 420, backgroundColor: colors.cardBg, borderRadius: radius.lg, padding: spacing.lg, elevation: 4, shadowColor: '#000', shadowOpacity: 0.08 },
  icon:         { fontSize: 36, textAlign: 'center', marginBottom: spacing.sm },
  title:        { fontSize: font.xl, fontWeight: '700', color: colors.primary, textAlign: 'center', marginBottom: 4 },
  subtitle:     { fontSize: font.base, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.lg },
  formGroup:    { marginBottom: spacing.md },
  label:        { fontSize: font.sm, fontWeight: '600', color: colors.textDark, marginBottom: 4 },
  input:        { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, fontSize: font.md, color: colors.textDark, backgroundColor: '#FAFAFA' },
  btn:          { backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.md },
  btnText:      { color: '#fff', fontWeight: '700', fontSize: font.md },
  linkText:     { textAlign: 'center', fontSize: font.sm, color: colors.textMuted },
  link:         { color: colors.secondary, fontWeight: '600' },
  successPage:  { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  successIcon:  { fontSize: 56, marginBottom: spacing.md },
  successTitle: { fontSize: font.xl, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  successSub:   { fontSize: font.md, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },
});

export default RegisterScreen;
