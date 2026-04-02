import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import registerStyles from '../constants/styles/registerStyles';
import { colors } from '../constants/theme';

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
      <View style={registerStyles.successPage}>
        <Text style={registerStyles.successIcon}>🎉</Text>
        <Text style={registerStyles.successTitle}>Registration Complete!</Text>
        <Text style={registerStyles.successSub}>You can now log in to cast your vote.</Text>
        <TouchableOpacity style={registerStyles.btn} onPress={() => router.replace('/login')}>
          <Text style={registerStyles.btnText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={registerStyles.page}>
      <View style={registerStyles.card}>

        <Text style={registerStyles.icon}>📋</Text>
        <Text style={registerStyles.title}>Voter Registration</Text>
        <Text style={registerStyles.subtitle}>Register to participate in the student election</Text>

        {[
          { field: 'name',      label: 'Full Name',  placeholder: 'Juan Dela Cruz',   type: 'default' },
          { field: 'studentId', label: 'Student ID', placeholder: '2024-00123',       type: 'default' },
          { field: 'email',     label: 'Email',      placeholder: 'student@gmail.com', type: 'email-address' },
          { field: 'password',  label: 'Password',   placeholder: 'Create a password', type: 'default', secure: true },
        ].map(({ field, label, placeholder, type, secure }) => (
          <View key={field} style={registerStyles.formGroup}>
            <Text style={registerStyles.label}>{label}</Text>
            <TextInput
              style={registerStyles.input}
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

        <TouchableOpacity style={registerStyles.btn} onPress={handleSubmit}>
          <Text style={registerStyles.btnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={registerStyles.linkText}>
            Already have an account? <Text style={registerStyles.link}>Sign in here</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

export default RegisterScreen;
