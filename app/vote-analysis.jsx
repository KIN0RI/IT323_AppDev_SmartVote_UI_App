import { router, useLocalSearchParams } from 'expo-router';
import {
  ScrollView, StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';

function VoteAnalysisScreen() {
  const params = useLocalSearchParams();

  let votes = [];
  try {
    votes = params.votes ? JSON.parse(params.votes) : [];
  } catch {
    votes = [];
  }

  if (votes.length === 0) {
    return (
      <View style={styles.emptyPage}>
        <Text style={styles.emptyIcon}>⚠️</Text>
        <Text style={styles.emptyTitle}>No vote data found</Text>
        <Text style={styles.emptySub}>Please go back and cast your vote first.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/vote')}>
          <Text style={styles.btnText}>Go to Vote Page</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>🗳️ Vote Analysis</Text>
        <Text style={styles.subtitle}>Review your submitted votes below</Text>
      </View>

      <View style={styles.grid}>
        {votes.map((v) => (
          <View key={v.position} style={styles.card}>
            <Text style={styles.positionLabel}>{v.position}</Text>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{v.candidateName.charAt(0)}</Text>
            </View>
            <Text style={styles.candidateName}>{v.candidateName}</Text>
            <Text style={styles.candidatePosition}>{v.position}</Text>
            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✅ Vote Recorded</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/student-dashboard')}>
        <Text style={styles.btnText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:              { flexGrow: 1, backgroundColor: colors.bgLight, padding: spacing.md, paddingBottom: 40 },
  header:            { marginBottom: spacing.lg },
  title:             { fontSize: font.xl, fontWeight: '700', color: colors.primary },
  subtitle:          { fontSize: font.base, color: colors.textMuted, marginTop: 4 },
  grid:              { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  card:              { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', width: '47%', elevation: 2 },
  positionLabel:     { fontSize: font.sm, fontWeight: '700', color: colors.secondary, marginBottom: spacing.sm, textAlign: 'center' },
  avatar:            { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  avatarText:        { color: '#fff', fontSize: font.xl, fontWeight: '700' },
  candidateName:     { fontSize: font.base, fontWeight: '700', color: colors.textDark, textAlign: 'center' },
  candidatePosition: { fontSize: font.sm, color: colors.secondary, marginBottom: spacing.sm, textAlign: 'center' },
  checkBadge:        { backgroundColor: '#dcfce7', borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 4 },
  checkText:         { fontSize: font.sm, color: colors.success, fontWeight: '600' },
  btn:               { backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  btnText:           { color: '#fff', fontWeight: '700', fontSize: font.md },
  emptyPage:         { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  emptyIcon:         { fontSize: 48, marginBottom: spacing.md },
  emptyTitle:        { fontSize: font.xl, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  emptySub:          { fontSize: font.base, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },
});

export default VoteAnalysisScreen;