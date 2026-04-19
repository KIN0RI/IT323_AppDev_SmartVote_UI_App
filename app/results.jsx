import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import api from '../api';
import resultsStyles from '../constants/styles/resultsStyles';
import { spacing } from '../constants/theme';

const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'];

function ResultsScreen() {
  const [resultsByPosition, setResultsByPosition] = useState({});
  const [activePosition,    setActivePosition]    = useState('President');
  const [loading,           setLoading]           = useState(true);

  useEffect(() => {
    api.get('/results/')
      .then((res) => setResultsByPosition(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 80 }} />;

  const activeCandidates = resultsByPosition[activePosition] || [];
  const totalVotes       = activeCandidates.reduce((sum, c) => sum + (c.vote_count || 0), 0);
  const winner           = activeCandidates[0];
  const getWinner        = (pos) => (resultsByPosition[pos] || [])[0];

  return (
    <ScrollView contentContainerStyle={resultsStyles.page}>
      <View style={resultsStyles.header}>
        <Text style={resultsStyles.headerTitle}>🏆 Election Results</Text>
        <Text style={resultsStyles.headerSub}>USTP Student Council Election</Text>
      </View>

      <Text style={resultsStyles.sectionTitle}>🎉 Elected Officials</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
        <View style={resultsStyles.winnersRow}>
          {positions.map((pos) => {
            const w = getWinner(pos);
            if (!w) return null;
            return (
              <View key={pos} style={resultsStyles.winnerCard}>
                <Text style={resultsStyles.crown}>👑</Text>
                <View style={resultsStyles.avatar}>
                  <Text style={resultsStyles.avatarText}>{w.name.charAt(0)}</Text>
                </View>
                <Text style={resultsStyles.winnerName} numberOfLines={1}>{w.name}</Text>
                <Text style={resultsStyles.winnerPos}  numberOfLines={1}>{pos}</Text>
                <Text style={resultsStyles.winnerVotes}>{w.vote_count || 0} votes</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Text style={resultsStyles.sectionTitle}>📊 Detailed Results</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
        <View style={resultsStyles.tabsRow}>
          {positions.map((pos) => (
            <TouchableOpacity key={pos}
              style={[resultsStyles.tab, activePosition === pos && resultsStyles.tabActive]}
              onPress={() => setActivePosition(pos)}>
              <Text style={[resultsStyles.tabText, activePosition === pos && resultsStyles.tabTextActive]}>{pos}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {activeCandidates.map((candidate, index) => {
        const votes    = candidate.vote_count || 0;
        const pct      = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        const isWinner = winner && candidate.id === winner.id;
        return (
          <View key={candidate.id} style={[resultsStyles.resultRow, isWinner && resultsStyles.resultRowWinner]}>
            <Text style={resultsStyles.rank}>{isWinner ? '👑' : `#${index + 1}`}</Text>
            <View style={[resultsStyles.resultAvatar, isWinner && resultsStyles.resultAvatarWinner]}>
              <Text style={resultsStyles.resultAvatarText}>{candidate.name.charAt(0)}</Text>
            </View>
            <View style={resultsStyles.resultInfo}>
              <View style={resultsStyles.resultNameRow}>
                <Text style={resultsStyles.resultName} numberOfLines={1}>{candidate.name}</Text>
                {isWinner && (
                  <View style={resultsStyles.electedBadge}>
                    <Text style={resultsStyles.electedText}>✅ Elected</Text>
                  </View>
                )}
              </View>
              <View style={resultsStyles.barRow}>
                <View style={resultsStyles.barBg}>
                  <View style={[resultsStyles.barFill, isWinner && resultsStyles.barFillWinner, { flex: pct }]} />
                  <View style={{ flex: 100 - pct }} />
                </View>
                <Text style={resultsStyles.pctText}>{pct}%</Text>
              </View>
            </View>
            <Text style={resultsStyles.resultVotes}>{votes}</Text>
          </View>
        );
      })}
      {activeCandidates.length === 0 && (
        <Text style={{ textAlign: 'center', color: '#64748b', padding: 32 }}>No results yet.</Text>
      )}

      <TouchableOpacity style={resultsStyles.backBtn} onPress={() => router.back()}>
        <Text style={resultsStyles.backBtnText}>← Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default ResultsScreen;