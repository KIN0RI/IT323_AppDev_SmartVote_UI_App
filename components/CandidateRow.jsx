// components/CandidateRow.jsx
// Mirrors web: src/components/CandidateRow.jsx
// Web used: <tr>, <td>, HTML table row
// Mobile uses: <View>, <Text> — no HTML tables in React Native

import { View, Text, StyleSheet } from 'react-native';

export default function CandidateRow({ candidate, maxVotes }) {
  const percentage = maxVotes > 0 ? (candidate.votes / maxVotes) * 100 : 0;

  return (
    <View style={styles.row}>

      {/* Candidate name */}
      <View style={styles.nameCol}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{candidate.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name} numberOfLines={1}>{candidate.name}</Text>
      </View>

      {/* Position badge */}
      <View style={styles.positionBadge}>
        <Text style={styles.positionText}>{candidate.position}</Text>
      </View>

      {/* Vote progress bar */}
      <View style={styles.barCol}>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${percentage}%` }]} />
        </View>
      </View>

      {/* Vote count */}
      <Text style={styles.voteCount}>{candidate.votes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 8,
  },
  nameCol: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A3C6E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  positionBadge: {
    backgroundColor: '#EBF5FB',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  positionText: {
    fontSize: 11,
    color: '#2E86C1',
    fontWeight: '600',
  },
  barCol: {
    flex: 2,
  },
  barBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    backgroundColor: '#2E86C1',
    borderRadius: 4,
  },
  voteCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A3C6E',
    width: 36,
    textAlign: 'right',
  },
});
