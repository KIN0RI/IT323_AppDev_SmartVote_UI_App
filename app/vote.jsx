import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import voteStyles from '../constants/styles/voteStyles';
import useVote from '../hooks/useVote';

function VoteScreen() {
  const {
    step, positions, currentPosition,
    currentCandidates, currentSelection, selections,
    loading, voteError, reviewing, submitting,
    handleSelect, handleBack, handleConfirm,
  } = useVote();

  // Review screen
  if (reviewing) {
    return (
      <ScrollView contentContainerStyle={voteStyles.page}>
        <View style={voteStyles.header}>
          <Text style={voteStyles.title}>📋 Review Your Votes</Text>
          <Text style={voteStyles.subtitle}>Please confirm your selections before submitting</Text>
        </View>

        {voteError ? (
          <View style={{ backgroundColor: '#fee2e2', padding: 12, borderRadius: 8, marginHorizontal: 16, marginBottom: 12 }}>
            <Text style={{ color: '#dc2626', textAlign: 'center' }}>{voteError}</Text>
          </View>
        ) : null}

        <View style={{ paddingHorizontal: 16 }}>
          {selections.map((v) => (
            <View key={v.position} style={voteStyles.candidateCard}>
              <View style={voteStyles.avatar}>
                <Text style={voteStyles.avatarText}>{v.candidateName.charAt(0)}</Text>
              </View>
              <View style={voteStyles.candidateInfo}>
                <Text style={voteStyles.candidateName}>{v.candidateName}</Text>
                <Text style={voteStyles.candidatePosition}>{v.position}</Text>
              </View>
              <Text style={{ color: '#16a34a', fontWeight: '700' }}>✅</Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
          <TouchableOpacity style={[voteStyles.backBtn, { flex: 1 }]} onPress={handleBack} disabled={submitting}>
            <Text style={voteStyles.backBtnText}>← Return & Change</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[voteStyles.voteBtn, { flex: 1, opacity: submitting ? 0.6 : 1 }]}
            onPress={handleConfirm}
            disabled={submitting}
          >
            <Text style={voteStyles.voteBtnText}>{submitting ? 'Submitting...' : '✅ Proceed & Submit'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Voting screen
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

      {voteError ? (
        <View style={{ backgroundColor: '#fee2e2', padding: 12, margin: 16, borderRadius: 8 }}>
          <Text style={{ color: '#dc2626', textAlign: 'center' }}>{voteError}</Text>
        </View>
      ) : null}

      <View style={voteStyles.positionBanner}>
        <Text style={voteStyles.positionBannerText}>Select a candidate for {currentPosition}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <View style={voteStyles.candidates}>
          {currentCandidates.map((candidate) => {
            const isSelected = currentSelection?.candidateId === candidate.id;
            return (
              <View key={candidate.id} style={[voteStyles.candidateCard,
                isSelected && { borderColor: '#2563eb', borderWidth: 2 }]}>
                <View style={voteStyles.avatar}>
                  <Text style={voteStyles.avatarText}>{candidate.name.charAt(0)}</Text>
                </View>
                <View style={voteStyles.candidateInfo}>
                  <Text style={voteStyles.candidateName}>{candidate.name}</Text>
                  <Text style={voteStyles.candidatePosition}>{candidate.position}</Text>
                </View>
                <TouchableOpacity
                  style={[voteStyles.voteBtn, isSelected && { backgroundColor: '#16a34a' }]}
                  onPress={() => handleSelect(candidate.id)}
                >
                  <Text style={voteStyles.voteBtnText}>{isSelected ? '✓ Selected' : 'Select'}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          {currentCandidates.length === 0 && (
            <Text style={{ textAlign: 'center', color: '#64748b', padding: 32 }}>
              No candidates for this position yet.
            </Text>
          )}
        </View>
      )}

      {step > 0 && (
        <TouchableOpacity style={voteStyles.backBtn} onPress={handleBack}>
          <Text style={voteStyles.backBtnText}>← Back to {positions[step - 1]}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

export default VoteScreen;