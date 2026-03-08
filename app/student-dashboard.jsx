import { useState } from 'react';
import {
  ScrollView, StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import Navbar from '../components/layout/Navbar';
import { colors, font, radius, spacing } from '../constants/theme';

const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'];

const announcements = [
  { id: 1, icon: '📢', text: 'Voting ends today at 5:00 PM. Make sure to cast your vote!' },
  { id: 2, icon: '📋', text: 'All registered students are eligible to vote in this election.' },
  { id: 3, icon: '🔒', text: 'Your vote is confidential and secured by the system.' },
];

function StudentDashboardScreen() {
  const [electionStatus] = useState('Voting is Open');
  const [hasVoted]       = useState(false);

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 40 }}>
      <Navbar />

      <View style={styles.content}>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🗳️</Text>
            <Text style={styles.statLabel}>Election Status</Text>
            <Text style={[styles.statusBadge, electionStatus === 'Voting is Open' ? styles.statusOpen : styles.statusClosed]}>
              {electionStatus}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📋</Text>
            <Text style={styles.statLabel}>Positions to Vote</Text>
            <Text style={styles.statValue}>{positions.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statLabel}>Your Vote Status</Text>
            <Text style={[styles.statusBadge, hasVoted ? styles.statusOpen : styles.statusClosed]}>
              {hasVoted ? 'Voted' : 'Not Yet Voted'}
            </Text>
          </View>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Ready to Cast Your Vote?</Text>
          <Text style={styles.actionSub}>You will vote for {positions.length} positions one at a time.</Text>

          <View style={styles.positionList}>
            {positions.map((pos, i) => (
              <View key={pos} style={styles.positionBadge}>
                <Text style={styles.positionBadgeText}>{i + 1}. {pos}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.voteBtn, (electionStatus !== 'Voting is Open' || hasVoted) && styles.voteBtnDisabled]}
            onPress={() => router.push('/vote')}
            disabled={electionStatus !== 'Voting is Open' || hasVoted}
          >
            <Text style={styles.voteBtnText}>
              {hasVoted ? '✅ Already Voted' : '🗳️ Proceed to Vote'}
            </Text>
          </TouchableOpacity>

          {hasVoted && (
            <TouchableOpacity style={styles.outlineBtn} onPress={() => router.push('/vote-analysis')}>
              <Text style={styles.outlineBtnText}>View My Votes</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.quickLinks}>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/results')}>
            <Text style={styles.quickBtnText}>🏆 View Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/profile')}>
            <Text style={styles.quickBtnText}>👤 My Profile</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.sectionTitle}>📣 Announcements</Text>
        {announcements.map((a) => (
          <View key={a.id} style={styles.announcement}>
            <Text style={styles.announcementIcon}>{a.icon}</Text>
            <Text style={styles.announcementText}>{a.text}</Text>
          </View>
        ))}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:               { flex: 1, backgroundColor: colors.bgLight },
  header:             { backgroundColor: colors.primary, padding: spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  badge:              { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: font.sm, paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.full, alignSelf: 'flex-start', marginBottom: 4, overflow: 'hidden' },
  headerTitle:        { color: '#fff', fontSize: font.xl, fontWeight: '700' },
  headerSub:          { color: 'rgba(255,255,255,0.75)', fontSize: font.sm },
  logoutBtn:          { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: radius.md },
  logoutText:         { color: '#fff', fontSize: font.sm, fontWeight: '600' },
  content:            { padding: spacing.md },
  statsRow:           { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  statCard:           { flex: 1, backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.sm, alignItems: 'center', elevation: 2 },
  statIcon:           { fontSize: 22, marginBottom: 4 },
  statLabel:          { fontSize: 10, color: colors.textMuted, textAlign: 'center', marginBottom: 4 },
  statValue:          { fontSize: font.lg, fontWeight: '700', color: colors.primary },
  statusBadge:        { fontSize: 10, fontWeight: '700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: radius.sm, overflow: 'hidden' },
  statusOpen:         { backgroundColor: '#dcfce7', color: colors.success },
  statusClosed:       { backgroundColor: '#fee2e2', color: colors.danger },
  actionCard:         { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md, elevation: 2 },
  actionTitle:        { fontSize: font.lg, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  actionSub:          { fontSize: font.base, color: colors.textMuted, marginBottom: spacing.md },
  positionList:       { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md },
  positionBadge:      { backgroundColor: colors.accent, borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  positionBadgeText:  { fontSize: font.sm, color: colors.primary, fontWeight: '600' },
  voteBtn:            { backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center', marginBottom: spacing.sm },
  voteBtnDisabled:    { backgroundColor: colors.textMuted },
  voteBtnText:        { color: '#fff', fontWeight: '700', fontSize: font.md },
  outlineBtn:         { borderWidth: 1, borderColor: colors.primary, borderRadius: radius.md, padding: 12, alignItems: 'center' },
  outlineBtnText:     { color: colors.primary, fontWeight: '600', fontSize: font.base },
  quickLinks:         { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  quickBtn:           { flex: 1, backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', elevation: 2 },
  quickBtnText:       { color: colors.primary, fontWeight: '600', fontSize: font.base },
  sectionTitle:       { fontSize: font.lg, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  announcement:       { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, elevation: 1 },
  announcementIcon:   { fontSize: 18, marginRight: spacing.sm },
  announcementText:   { flex: 1, fontSize: font.base, color: colors.textDark },
});

export default StudentDashboardScreen;