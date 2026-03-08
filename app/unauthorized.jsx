
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';

export function UnauthorizedScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <Text style={styles.icon}>🚫</Text>
      <Text style={styles.title}>Unauthorized</Text>
      <Text style={styles.subtitle}>You do not have permission to access this page.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// src/screens/NotFoundScreen.jsx
// Mirrors web: src/pages/NotFound.jsx

export function NotFoundScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <Text style={styles.icon}>404</Text>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.subtitle}>The screen you are looking for does not exist.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page:     { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  icon:     { fontSize: 56, marginBottom: spacing.md },
  title:    { fontSize: font.xl, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  subtitle: { fontSize: font.base, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.lg },
  btn:      { backgroundColor: colors.primary, borderRadius: radius.md, paddingHorizontal: spacing.xl, paddingVertical: 13 },
  btnText:  { color: '#fff', fontWeight: '700', fontSize: font.md },
});

export default UnauthorizedScreen;
