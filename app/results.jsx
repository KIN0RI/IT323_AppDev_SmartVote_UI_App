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

function ResultsScreen() {
  const { candidates } = useCandidates();
  const [activePosition, setActivePosition] = useState('President');

  const getWinner = (pos) => {
    const group = candidates.filter((c) => c.position === pos);
    return group.reduce((a, b) => (a.votes > b.votes ? a : b));
  };

  const activeCandidates = candidates
    .filter((c) => c.position === activePosition)
    .sort((a, b) => b.votes - a.votes);

  const totalVotes = activeCandidates.reduce((sum, c) => sum + c.votes, 0);
  const winner     = getWinner(activePosition);

  return (
    <ScrollView contentContainerStyle={styles.page}>

      
      <Text style={styles.sectionTitle}>🎉 Elected Officials</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
        <View style={styles.winnersRow}>
          {positions.map((pos) => {
            const w = getWinner(pos);
            return (
              <View key={pos} style={styles.winnerCard}>
                <Text style={styles.crown}>👑</Text>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{w.name.charAt(0)}</Text>
                </View>
                <Text style={styles.winnerName}>{w.name}</Text>
                <Text style={styles.winnerPos}>{pos}</Text>
                <Text style={styles.winnerVotes}>{w.votes} votes</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Detailed Results */}
      <Text style={styles.sectionTitle}>📊 Detailed Results</Text>
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

      {activeCandidates.map((candidate, index) => {
        const pct      = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;
        const isWinner = candidate.id === winner.id;

        return (
          <View key={candidate.id} style={[styles.resultRow, isWinner && styles.resultRowWinner]}>
            <Text style={styles.rank}>{isWinner ? '👑' : `#${index + 1}`}</Text>
            <View style={styles.resultAvatar}>
              <Text style={styles.resultAvatarText}>{candidate.name.charAt(0)}</Text>
            </View>
            <View style={styles.resultInfo}>
              <View style={styles.resultNameRow}>
                <Text style={styles.resultName}>{candidate.name}</Text>
                {isWinner && (
                  <View style={styles.electedBadge}>
                    <Text style={styles.electedText}>Elected</Text>
                  </View>
                )}
              </View>
              <View style={styles.barRow}>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, isWinner && styles.barFillWinner, { flex: pct }]} />
                  <View style={{ flex: 100 - pct }} />
                </View>
                <Text style={styles.pctText}>{pct}%</Text>
              </View>
            </View>
            <Text style={styles.resultVotes}>{candidate.votes}</Text>
          </View>
        );
      })}

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Go Back</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:             { flexGrow: 1, backgroundColor: colors.bgLight, padding: spacing.md, paddingBottom: 40 },
  sectionTitle:     { fontSize: font.lg, fontWeight: '700', color: colors.primary, marginBottom: spacing.md },
  winnersRow:       { flexDirection: 'row', gap: spacing.sm },
  winnerCard:       { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', width: 130, elevation: 2 },
  crown:            { fontSize: 20, marginBottom: 4 },
  avatar:           { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  avatarText:       { color: '#fff', fontSize: font.lg, fontWeight: '700' },
  winnerName:       { fontSize: font.sm, fontWeight: '700', color: colors.textDark, textAlign: 'center' },
  winnerPos:        { fontSize: 10, color: colors.secondary, textAlign: 'center', marginTop: 2 },
  winnerVotes:      { fontSize: font.sm, color: colors.textMuted, marginTop: 4 },
  tabsRow:          { flexDirection: 'row', gap: spacing.xs, paddingVertical: spacing.xs },
  tab:              { paddingHorizontal: 14, paddingVertical: 7, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgLight },
  tabActive:        { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText:          { fontSize: font.sm, color: colors.textMuted, fontWeight: '600' },
  tabTextActive:    { color: '#fff' },
  resultRow:        { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  resultRowWinner:  { borderLeftWidth: 3, borderLeftColor: '#f59e0b', backgroundColor: '#fffbeb' },
  rank:             { width: 28, fontSize: font.base, fontWeight: '700', color: colors.textMuted },
  resultAvatar:     { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  resultAvatarText: { color: '#fff', fontWeight: '700', fontSize: font.base },
  resultInfo:       { flex: 1 },
  resultNameRow:    { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  resultName:       { fontSize: font.base, fontWeight: '700', color: colors.textDark, marginRight: spacing.xs },
  electedBadge:     { backgroundColor: '#fef3c7', borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  electedText:      { fontSize: 10, color: '#d97706', fontWeight: '700' },
  barRow:           { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  barBg:            { flex: 1, height: 7, backgroundColor: colors.bgLight, borderRadius: 4, overflow: 'hidden', flexDirection: 'row' },
  barFill:          { height: 7, backgroundColor: colors.secondary, borderRadius: 4 },
  barFillWinner:    { backgroundColor: '#f59e0b' },
  pctText:          { fontSize: font.sm, color: colors.textMuted, width: 34, textAlign: 'right' },
  resultVotes:      { fontSize: font.base, fontWeight: '700', color: colors.primary, width: 36, textAlign: 'right' },
  backBtn:          { marginTop: spacing.lg, borderWidth: 1, borderColor: colors.primary, borderRadius: radius.md, padding: 12, alignItems: 'center' },
  backBtnText:      { color: colors.primary, fontWeight: '600', fontSize: font.base },
});

export default ResultsScreen;