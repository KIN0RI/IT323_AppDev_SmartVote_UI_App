import {
  ScrollView,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import useVote from '../hooks/useVote';
import voteStyles from '../constants/styles/voteStyles';

function VoteScreen() {
  const {
    step,
    positions,
    currentPosition,
    currentCandidates,
    handleVote,
    handleBack,
  } = useVote();

  return (
    <ScrollView style={voteStyles.scroll} contentContainerStyle={voteStyles.page}>

      <View style={voteStyles.header}>
        <Text style={voteStyles.title}>Cast Your Vote</Text>
        <Text style={voteStyles.subtitle}>
          Step {step + 1} of {positions.length} — Voting for{' '}
          <Text style={{ fontWeight: '700', color: '#fff' }}>{currentPosition}</Text>
        </Text>
      </View>

      <View style={voteStyles.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={voteStyles.progressRow}>
            {positions.map((pos, index) => (
              <View key={pos} style={voteStyles.stepWrapper}>
                <View style={[
                  voteStyles.stepCircle,
                  index < step   && voteStyles.stepDone,
                  index === step && voteStyles.stepActive,
                ]}>
                  <Text style={voteStyles.stepNumber}>{index < step ? '✓' : index + 1}</Text>
                </View>
                <Text style={voteStyles.stepLabel} numberOfLines={1}>{pos}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={voteStyles.positionBanner}>
        <Text style={voteStyles.positionBannerText}>Select a candidate for {currentPosition}</Text>
      </View>

      <View style={voteStyles.candidates}>
        {currentCandidates.map((candidate) => (
          <View key={candidate.id} style={voteStyles.candidateCard}>
            <View style={voteStyles.avatar}>
              <Text style={voteStyles.avatarText}>{candidate.name.charAt(0)}</Text>
            </View>
            <View style={voteStyles.candidateInfo}>
              <Text style={voteStyles.candidateName}>{candidate.name}</Text>
              <Text style={voteStyles.candidatePosition}>{candidate.position}</Text>
            </View>
            <TouchableOpacity style={voteStyles.voteBtn} onPress={() => handleVote(candidate.id)}>
              <Text style={voteStyles.voteBtnText}>Vote</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {step > 0 && (
        <TouchableOpacity style={voteStyles.backBtn} onPress={handleBack}>
          <Text style={voteStyles.backBtnText}>← Back to {positions[step - 1]}</Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
}

export default VoteScreen;