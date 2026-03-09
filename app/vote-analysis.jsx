import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView, StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';

function VoteAnalysisScreen() {
  const params = useLocalSearchParams();
  const [submitted, setSubmitted] = useState(false);

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
        <TouchableOpacity style={styles.btn} onPress={() => router.replace('/vote')}>
          <Text style={styles.btnText}>Go to Vote Page</Text>
        </TouchableOpacity>
      </View>
    );
  }

  
  if (submitted) {
    return (
      <View style={styles.successPage}>
        <Text style={styles.successEmoji}>🎉</Text>
        <Text style={styles.successTitle}>Vote Submitted!</Text>
        <Text style={styles.successSub}>
          Your votes have been recorded successfully. Thank you for participating!
        </Text>
        <View style={styles.successBadge}>
          <Text style={styles.successBadgeText}>✅ {votes.length} positions voted</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.replace('/student-dashboard')}
        >
          <Text style={styles.btnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.page}>


      <View style={styles.header}>
        <Text style={styles.title}>🗳️ Review Your Votes</Text>
        <Text style={styles.subtitle}>Please review before submitting</Text>
      </View>


      <View style={styles.warningBanner}>
        <Text style={styles.warningText}>
          ⚠️ Once submitted, your votes cannot be changed.
        </Text>
      </View>


      <View style={styles.grid}>
        {votes.map((v) => (
          <View key={v.position} style={styles.card}>
            <Text style={styles.positionLabel}>{v.position}</Text>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{v.candidateName.charAt(0)}</Text>
            </View>
            <Text style={styles.candidateName}>{v.candidateName}</Text>
            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✅ Selected</Text>
            </View>
          </View>
        ))}
      </View>


      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.replace('/vote')}
        >
          <Text style={styles.backBtnText}>← Change Votes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => setSubmitted(true)}
        >
          <Text style={styles.submitBtnText}>Confirm & Submit ✓</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  page:             { flexGrow: 1, backgroundColor: colors.bgLight, paddingBottom: 40 },
  header:           { backgroundColor: colors.primary, padding: spacing.lg },
  title:            { fontSize: font.xl, fontWeight: '700', color: '#fff' },
  subtitle:         { fontSize: font.base, color: 'rgba(255,255,255,0.8)', marginTop: 4 },

  warningBanner:    { backgroundColor: '#fef9c3', borderLeftWidth: 4, borderLeftColor: '#eab308', padding: spacing.md, margin: spacing.md, borderRadius: radius.sm },
  warningText:      { fontSize: font.sm, color: '#854d0e', fontWeight: '600' },

  grid:             { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  card:             { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', width: '47%', elevation: 2 },
  positionLabel:    { fontSize: font.sm, fontWeight: '700', color: colors.secondary, marginBottom: spacing.sm, textAlign: 'center' },
  avatar:           { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  avatarText:       { color: '#fff', fontSize: font.xl, fontWeight: '700' },
  candidateName:    { fontSize: font.base, fontWeight: '700', color: colors.textDark, textAlign: 'center', marginBottom: spacing.xs },
  checkBadge:       { backgroundColor: '#dcfce7', borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 4 },
  checkText:        { fontSize: font.sm, color: colors.success, fontWeight: '600' },

  btnRow:           { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.md },
  backBtn:          { flex: 1, borderWidth: 2, borderColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  backBtnText:      { color: colors.primary, fontWeight: '700', fontSize: font.sm },
  submitBtn:        { flex: 1, backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  submitBtnText:    { color: '#fff', fontWeight: '700', fontSize: font.sm },


  emptyPage:        { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  emptyIcon:        { fontSize: 48, marginBottom: spacing.md },
  emptyTitle:       { fontSize: font.xl, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  emptySub:         { fontSize: font.base, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },

 
  successPage:      { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgLight, padding: spacing.lg },
  successEmoji:     { fontSize: 72, marginBottom: spacing.md },
  successTitle:     { fontSize: font.xxl, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  successSub:       { fontSize: font.base, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.lg },
  successBadge:     { backgroundColor: '#dcfce7', borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, marginBottom: spacing.lg },
  successBadgeText: { color: colors.success, fontWeight: '700', fontSize: font.base },

  btn:              { width: '100%', backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  btnText:          { color: '#fff', fontWeight: '700', fontSize: font.md },
});

export default VoteAnalysisScreen;