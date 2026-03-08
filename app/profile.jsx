import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';
import useProfile from '../hooks/useProfile';

function ProfileScreen() {
  const navigation = useNavigation();
  const [roleState, setRoleState] = React.useState('student');

  React.useEffect(() => {
    AsyncStorage.getItem('userRole').then((r) => { if (r) setRoleState(r); });
  }, []);

  const {
    profile, form, isEditing, saved,
    handleChange, handleSave, handleEdit, handleCancel,
  } = useProfile();

  const fields = [
    { key: 'name',      label: 'Full Name'   },
    { key: 'studentId', label: 'Student ID'  },
    { key: 'email',     label: 'Email'       },
    { key: 'course',    label: 'Course'      },
    { key: 'year',      label: 'Year Level'  },
  ];

  return (
    <ScrollView contentContainerStyle={styles.page}>

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profile.name.charAt(0)}</Text>
        </View>
        <Text style={styles.heroName}>{profile.name}</Text>
        <Text style={styles.heroRole}>{roleState === 'admin' ? 'Administrator' : 'Student'}</Text>
      </View>

      {saved && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>✅ Profile updated successfully!</Text>
        </View>
      )}

      <View style={styles.card}>
        {isEditing ? (
          <>
            <Text style={styles.sectionTitle}>Edit Profile</Text>
            {fields.map(({ key, label }) => (
              <View key={key} style={styles.formGroup}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={form[key]}
                  onChangeText={(v) => handleChange(key, v)}
                  placeholder={label}
                  placeholderTextColor={colors.textMuted}
                  keyboardType={key === 'email' ? 'email-address' : 'default'}
                />
              </View>
            ))}
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btn} onPress={handleSave}>
                <Text style={styles.btnText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn} onPress={handleCancel}>
                <Text style={styles.outlineBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            {fields.map(({ key, label }) => (
              <View key={key} style={styles.profileRow}>
                <Text style={styles.profileLabel}>{label}</Text>
                <Text style={styles.profileValue}>{profile[key]}</Text>
              </View>
            ))}
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btn} onPress={handleEdit}>
                <Text style={styles.btnText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.outlineBtnText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:           { flexGrow: 1, backgroundColor: colors.bgLight, paddingBottom: 40 },
  hero:           { backgroundColor: colors.primary, padding: spacing.xl, alignItems: 'center' },
  avatar:         { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  avatarText:     { color: '#fff', fontSize: 36, fontWeight: '700' },
  heroName:       { color: '#fff', fontSize: font.xl, fontWeight: '700', marginBottom: 4 },
  heroRole:       { color: 'rgba(255,255,255,0.75)', fontSize: font.base },
  successBanner:  { backgroundColor: '#dcfce7', padding: spacing.md, margin: spacing.md, borderRadius: radius.md },
  successText:    { color: colors.success, fontWeight: '600', textAlign: 'center' },
  card:           { margin: spacing.md, backgroundColor: colors.cardBg, borderRadius: radius.lg, padding: spacing.lg, elevation: 2 },
  sectionTitle:   { fontSize: font.lg, fontWeight: '700', color: colors.primary, marginBottom: spacing.md },
  profileRow:     { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  profileLabel:   { fontSize: font.base, color: colors.textMuted, flex: 1 },
  profileValue:   { fontSize: font.base, color: colors.textDark, fontWeight: '600', flex: 1, textAlign: 'right' },
  formGroup:      { marginBottom: spacing.md },
  label:          { fontSize: font.sm, fontWeight: '600', color: colors.textDark, marginBottom: 4 },
  input:          { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, fontSize: font.base, color: colors.textDark },
  btnRow:         { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  btn:            { flex: 1, backgroundColor: colors.primary, borderRadius: radius.md, padding: 13, alignItems: 'center' },
  btnText:        { color: '#fff', fontWeight: '700', fontSize: font.base },
  outlineBtn:     { flex: 1, borderWidth: 1, borderColor: colors.primary, borderRadius: radius.md, padding: 13, alignItems: 'center' },
  outlineBtnText: { color: colors.primary, fontWeight: '600', fontSize: font.base },
});

export default ProfileScreen;
