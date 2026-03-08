import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView, StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';
import useCandidates from '../hooks/useCandidates';

const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'];

const insights = [
  { id: 1, title: 'Anomaly Detection',        status: 'No suspicious voting activity detected', confidence: 91 },
  { id: 2, title: 'Turnout Pattern Analysis', status: 'Normal participation trend observed',     confidence: 84 },
];

const electionStats = { totalVoters: 2000, votesCast: 1895, remainingVoters: 105 };

const adminLinks = [
  { label: '📋 Voter Log',         screen: '/voter-log'         },
  { label: '👥 Manage Candidates', screen: '/manage-candidates' },
  { label: '⚙️ Election Settings', screen: '/election-settings' },
  { label: '🏆 Results',           screen: '/results'           },
];

function ProgressBar({ percent, color = colors.primary }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { flex: percent / 100, backgroundColor: color }]} />
      <View style={{ flex: 1 - percent / 100 }} />
    </View>
  );
}

function AdminDashboardScreen() {
  const { candidates }   = useCandidates();
  const [activePosition, setActivePosition] = useState('President');
  const [showInsights,   setShowInsights]   = useState(false);

  const turnoutPercent = Math.round((electionStats.votesCast / electionStats.totalVoters) * 100);
  const filtered       = candidates.filter((c) => c.position === activePosition);
  const maxVotes       = Math.max(...filtered.map((c) => c.votes), 1);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userRole');
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 40 }}>

      <View style={styles.header}>
        <View>
          <Text style={styles.badge}>Admin Panel</Text>
          <Text style={styles.headerTitle}>USTP SmartVote</Text>
          <Text style={styles.headerSub}>Election Monitoring Dashboard</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>

        {/* Turnout */}
        <View style={styles.card}>
          <View style={styles.progressLabel}>
            <Text style={styles.progressText}>Voter Turnout</Text>
            <Text style={styles.progressPercent}>{turnoutPercent}%</Text>
          </View>
          <ProgressBar percent={turnoutPercent} color={colors.primary} />
        </View>

        {/* Stat cards */}
        <View style={styles.statsRow}>
          {[
            { icon: '👥', label: 'Total Voters', value: electionStats.totalVoters.toLocaleString() },
            { icon: '✅', label: 'Votes Cast',   value: electionStats.votesCast.toLocaleString()   },
            { icon: '⏳', label: 'Remaining',    value: electionStats.remainingVoters.toLocaleString() },
          ].map(({ icon, label, value }) => (
            <View key={label} style={styles.statCard}>
              <Text style={styles.statIcon}>{icon}</Text>
              <Text style={styles.statLabel}>{label}</Text>
              <Text style={styles.statValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Quick links */}
        <View style={styles.quickGrid}>
          {adminLinks.map(({ label, screen }) => (
            <TouchableOpacity key={screen} style={styles.quickBtn} onPress={() => router.push(screen)}>
              <Text style={styles.quickBtnText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Vote tally */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Candidate Vote Tally</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
            <View style={styles.tabsRow}>
              {positions.map((pos) => (
                <TouchableOpacity
                  key={pos}
                  style={[styles.tab, activePosition === pos && styles.tabActive]}
                  onPress={() => setActivePosition(pos)}
                >
                  <Text style={[styles.tabText, activePosition === pos && styles.tabTextActive]}>{pos}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {filtered.map((c) => {
            const pct = Math.round((c.votes / maxVotes) * 100);
            return (
              <View key={c.id} style={styles.candidateRow}>
                <View style={styles.candidateRowLeft}>
                  <Text style={styles.candidateRowName}>{c.name}</Text>
                  <ProgressBar percent={pct} color={colors.secondary} />
                </View>
                <Text style={styles.voteCount}>{c.votes}</Text>
              </View>
            );
          })}
        </View>

        {/* AI Insights */}
        <View style={styles.card}>
          <View style={styles.insightHeader}>
            <Text style={styles.sectionTitle}>AI Monitoring Insights</Text>
            <TouchableOpacity onPress={() => setShowInsights((v) => !v)}>
              <Text style={styles.insightToggle}>{showInsights ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          {showInsights && insights.map((item) => (
            <View key={item.id} style={styles.insightCard}>
              <Text style={styles.insightTitle}>{item.title}</Text>
              <Text style={styles.insightStatus}>{item.status}</Text>
              <Text style={styles.confLabel}>Confidence: {item.confidence}%</Text>
              <ProgressBar percent={item.confidence} color={colors.success} />
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:             { flex: 1, backgroundColor: colors.bgLight },
  header:           { backgroundColor: colors.primary, padding: spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  badge:            { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: font.sm, paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.full, alignSelf: 'flex-start', marginBottom: 4, overflow: 'hidden' },
  headerTitle:      { color: '#fff', fontSize: font.xl, fontWeight: '700' },
  headerSub:        { color: 'rgba(255,255,255,0.75)', fontSize: font.sm },
  logoutBtn:        { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: radius.md },
  logoutText:       { color: '#fff', fontSize: font.sm, fontWeight: '600' },
  content:          { padding: spacing.md },
  card:             { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, elevation: 2 },
  progressLabel:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressText:     { fontSize: font.base, color: colors.textDark, fontWeight: '600' },
  progressPercent:  { fontSize: font.base, color: colors.primary, fontWeight: '700' },
  progressTrack:    { height: 10, backgroundColor: colors.bgLight, borderRadius: 5, overflow: 'hidden', flexDirection: 'row' },
  progressFill:     { height: 10, borderRadius: 5 },
  statsRow:         { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  statCard:         { flex: 1, backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.sm, alignItems: 'center', elevation: 2 },
  statIcon:         { fontSize: 22, marginBottom: 4 },
  statLabel:        { fontSize: 10, color: colors.textMuted, textAlign: 'center' },
  statValue:        { fontSize: font.md, fontWeight: '700', color: colors.primary },
  quickGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  quickBtn:         { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, width: '47%', elevation: 2, alignItems: 'center' },
  quickBtnText:     { color: colors.primary, fontWeight: '600', fontSize: font.base },
  sectionTitle:     { fontSize: font.md, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  tabsRow:          { flexDirection: 'row', gap: spacing.xs },
  tab:              { paddingHorizontal: 14, paddingVertical: 7, borderRadius: radius.full, backgroundColor: colors.bgLight, borderWidth: 1, borderColor: colors.border },
  tabActive:        { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText:          { fontSize: font.sm, color: colors.textMuted, fontWeight: '600' },
  tabTextActive:    { color: '#fff' },
  candidateRow:     { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  candidateRowLeft: { flex: 1, marginRight: spacing.sm },
  candidateRowName: { fontSize: font.base, color: colors.textDark, fontWeight: '600', marginBottom: 4 },
  voteCount:        { fontSize: font.base, fontWeight: '700', color: colors.primary, width: 40, textAlign: 'right' },
  insightHeader:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  insightToggle:    { color: colors.secondary, fontWeight: '600', fontSize: font.base },
  insightCard:      { backgroundColor: colors.accent, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  insightTitle:     { fontSize: font.base, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  insightStatus:    { fontSize: font.sm, color: colors.textDark, marginBottom: spacing.sm },
  confLabel:        { fontSize: font.sm, color: colors.textMuted, marginBottom: 4 },
});

export default AdminDashboardScreen;