import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import api from '../api';
import voteAnalysisStyles from '../constants/styles/voteAnalysisStyles';

function VoteAnalysisScreen() {
  const params  = useLocalSearchParams();
  const [votes, setVotes]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If coming from vote screen, use passed votes
    if (params.votes) {
      try {
        setVotes(JSON.parse(params.votes));
        setLoading(false);
        return;
      } catch { /* fall through to API */ }
    }
    // Otherwise fetch from backend
    api.get('/vote/my/')
      .then((res) => {
        const formatted = res.data.map((v) => ({
          position:      v.position,
          candidateName: v.candidate_name,
          candidateId:   v.candidate,
        }));
        setVotes(formatted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 80 }} />;

  if (votes.length === 0) {
    return (
      <View style={voteAnalysisStyles.emptyPage}>
        <Text style={voteAnalysisStyles.emptyIcon}>⚠️</Text>
        <Text style={voteAnalysisStyles.emptyTitle}>No vote data found</Text>
        <Text style={voteAnalysisStyles.emptySub}>Please go back and cast your vote first.</Text>
        <TouchableOpacity style={voteAnalysisStyles.btn} onPress={() => router.replace('/vote')}>
          <Text style={voteAnalysisStyles.btnText}>Go to Vote Page</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={voteAnalysisStyles.page}>
      <View style={voteAnalysisStyles.header}>
        <Text style={voteAnalysisStyles.title}>🗳️ Your Vote Summary</Text>
        <Text style={voteAnalysisStyles.subtitle}>Your votes have been recorded successfully</Text>
      </View>

      <View style={voteAnalysisStyles.grid}>
        {votes.map((v) => (
          <View key={v.position} style={voteAnalysisStyles.card}>
            <Text style={voteAnalysisStyles.positionLabel}>{v.position}</Text>
            <View style={voteAnalysisStyles.avatar}>
              <Text style={voteAnalysisStyles.avatarText}>{v.candidateName.charAt(0)}</Text>
            </View>
            <Text style={voteAnalysisStyles.candidateName}>{v.candidateName}</Text>
            <View style={voteAnalysisStyles.checkBadge}>
              <Text style={voteAnalysisStyles.checkText}>✅ Vote Recorded</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={voteAnalysisStyles.btn}
        onPress={() => router.replace('/student-dashboard')}
      >
        <Text style={voteAnalysisStyles.btnText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default VoteAnalysisScreen;