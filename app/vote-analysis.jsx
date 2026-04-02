import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import voteAnalysisStyles from '../constants/styles/voteAnalysisStyles';

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

  
  if (submitted) {
    return (
      <View style={voteAnalysisStyles.successPage}>
        <Text style={voteAnalysisStyles.successEmoji}>🎉</Text>
        <Text style={voteAnalysisStyles.successTitle}>Vote Submitted!</Text>
        <Text style={voteAnalysisStyles.successSub}>
          Your votes have been recorded successfully. Thank you for participating!
        </Text>
        <View style={voteAnalysisStyles.successBadge}>
          <Text style={voteAnalysisStyles.successBadgeText}>✅ {votes.length} positions voted</Text>
        </View>
        <TouchableOpacity
          style={voteAnalysisStyles.btn}
          onPress={() => router.replace('/student-dashboard')}
        >
          <Text style={voteAnalysisStyles.btnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={voteAnalysisStyles.page}>


      <View style={voteAnalysisStyles.header}>
        <Text style={voteAnalysisStyles.title}>🗳️ Review Your Votes</Text>
        <Text style={voteAnalysisStyles.subtitle}>Please review before submitting</Text>
      </View>


      <View style={voteAnalysisStyles.warningBanner}>
        <Text style={voteAnalysisStyles.warningText}>
          ⚠️ Once submitted, your votes cannot be changed.
        </Text>
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
              <Text style={voteAnalysisStyles.checkText}>✅ Selected</Text>
            </View>
          </View>
        ))}
      </View>


      <View style={voteAnalysisStyles.btnRow}>
        <TouchableOpacity
          style={voteAnalysisStyles.backBtn}
          onPress={() => router.replace('/vote')}
        >
          <Text style={voteAnalysisStyles.backBtnText}>← Change Votes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={voteAnalysisStyles.submitBtn}
          onPress={() => setSubmitted(true)}
        >
          <Text style={voteAnalysisStyles.submitBtnText}>Confirm & Submit ✓</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

export default VoteAnalysisScreen;