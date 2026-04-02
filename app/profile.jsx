import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import useProfile from '../hooks/useProfile';
import profileStyles from '../constants/styles/profileStyles';
import { colors } from '../constants/theme';

function ProfileScreen() {
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
    <ScrollView contentContainerStyle={profileStyles.page}>

      {/* Hero */}
      <View style={profileStyles.hero}>
        <View style={profileStyles.avatar}>
          <Text style={profileStyles.avatarText}>{profile.name.charAt(0)}</Text>
        </View>
        <Text style={profileStyles.heroName}>{profile.name}</Text>
        <Text style={profileStyles.heroRole}>{roleState === 'admin' ? 'Administrator' : 'Student'}</Text>
      </View>

      {saved && (
        <View style={profileStyles.successBanner}>
          <Text style={profileStyles.successText}>✅ Profile updated successfully!</Text>
        </View>
      )}

      <View style={profileStyles.card}>
        {isEditing ? (
          <>
            <Text style={profileStyles.sectionTitle}>Edit Profile</Text>
            {fields.map(({ key, label }) => (
              <View key={key} style={profileStyles.formGroup}>
                <Text style={profileStyles.label}>{label}</Text>
                <TextInput
                  style={profileStyles.input}
                  value={form[key]}
                  onChangeText={(v) => handleChange(key, v)}
                  placeholder={label}
                  placeholderTextColor={colors.textMuted}
                  keyboardType={key === 'email' ? 'email-address' : 'default'}
                />
              </View>
            ))}
            <View style={profileStyles.btnRow}>
              <TouchableOpacity style={profileStyles.btn} onPress={handleSave}>
                <Text style={profileStyles.btnText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={profileStyles.outlineBtn} onPress={handleCancel}>
                <Text style={profileStyles.outlineBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={profileStyles.sectionTitle}>Profile Information</Text>
            {fields.map(({ key, label }) => (
              <View key={key} style={profileStyles.profileRow}>
                <Text style={profileStyles.profileLabel}>{label}</Text>
                <Text style={profileStyles.profileValue}>{profile[key]}</Text>
              </View>
            ))}
            <View style={profileStyles.btnRow}>
              <TouchableOpacity style={profileStyles.btn} onPress={handleEdit}>
                <Text style={profileStyles.btnText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={profileStyles.outlineBtn} onPress={() => router.back()}>
                <Text style={profileStyles.outlineBtnText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
