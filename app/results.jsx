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
  const winner = getWinner(activePosition);

  return (
    <ScrollView contentContainerStyle={styles.page}>
  
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Election Results</Text>
        <Text style={styles.headerSub}>USTP Student Council Election 2026</Text>
      </View>


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
                <Text style={styles.winnerName} numberOfLines={1}>{w.name}</Text>
                <Text style={styles.winnerPos} numberOfLines={1}>{pos}</Text>
                <Text style={styles.winnerVotes}>{w.votes} votes</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

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
            <View style={[styles.resultAvatar, isWinner && styles.resultAvatarWinner]}>
              <Text style={styles.resultAvatarText}>{candidate.name.charAt(0)}</Text>
            </View>
            <View style={styles.resultInfo}>
              <View style={styles.resultNameRow}>
                <Text style={styles.resultName} numberOfLines={1}>{candidate.name}</Text>
                {isWinner && (
                  <View style={styles.electedBadge}>
                    <Text style={styles.electedText}>✅ Elected</Text>
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
  page:              { flexGrow: 1, backgroundColor: colors.bgLight, paddingBottom: 40 },

  header:            { backgroundColor: colors.primary, padding: spacing.lg, marginBottom: spacing.md },
  headerTitle:       { color: '#fff', fontSize: font.xl, fontWeight: '700' },
  headerSub:         { color: 'rgba(255,255,255,0.75)', fontSize: font.sm, marginTop: 2 },

  sectionTitle:      { fontSize: font.md, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm, paddingHorizontal: spacing.md },

  winnersRow:        { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.md, alignItems: 'flex-start' },
  winnerCard:        { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.sm, alignItems: 'center', width: 110, elevation: 2, alignSelf: 'flex-start' },
  crown:             { fontSize: 16, marginBottom: 4 },
  avatar:            { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  avatarText:        { color: '#fff', fontSize: font.md, fontWeight: '700' },
  winnerName:        { fontSize: 11, fontWeight: '700', color: colors.textDark, textAlign: 'center' },
  winnerPos:         { fontSize: 10, color: colors.secondary, textAlign: 'center', marginTop: 2 },
  winnerVotes:       { fontSize: 10, color: colors.textMuted, marginTop: 2 },

  tabsRow:           { flexDirection: 'row', gap: 6, paddingVertical: 6, paddingHorizontal: spacing.md },
  tab:               { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.cardBg, height: 34, justifyContent: 'center', alignItems: 'center' },
  tabActive:         { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText:           { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  tabTextActive:     { color: '#fff' },


  resultRow:         { backgroundColor: colors.cardBg, marginHorizontal: spacing.md, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  resultRowWinner:   { borderLeftWidth: 3, borderLeftColor: '#f59e0b', backgroundColor: '#fffbeb' },
  rank:              { width: 26, fontSize: font.sm, fontWeight: '700', color: colors.textMuted },
  resultAvatar:      { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  resultAvatarWinner:{ backgroundColor: '#f59e0b' },
  resultAvatarText:  { color: '#fff', fontWeight: '700', fontSize: font.sm },
  resultInfo:        { flex: 1 },
  resultNameRow:     { flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap', gap: 4 },
  resultName:        { fontSize: font.sm, fontWeight: '700', color: colors.textDark },
  electedBadge:      { backgroundColor: '#dcfce7', borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  electedText:       { fontSize: 10, color: colors.success, fontWeight: '700' },
  barRow:            { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  barBg:             { flex: 1, height: 6, backgroundColor: '#e2e8f0', borderRadius: 3, overflow: 'hidden', flexDirection: 'row' },
  barFill:           { height: 6, backgroundColor: colors.secondary, borderRadius: 3 },
  barFillWinner:     { backgroundColor: '#f59e0b' },
  pctText:           { fontSize: 11, color: colors.textMuted, width: 30, textAlign: 'right' },
  resultVotes:       { fontSize: font.sm, fontWeight: '700', color: colors.primary, width: 34, textAlign: 'right' },

  backBtn:           { margin: spacing.md, marginTop: spacing.lg, borderWidth: 1, borderColor: colors.primary, borderRadius: radius.md, padding: 12, alignItems: 'center' },
  backBtnText:       { color: colors.primary, fontWeight: '600', fontSize: font.base },
});

export default ResultsScreen;