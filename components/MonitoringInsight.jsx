// components/MonitoringInsight.jsx
// Mirrors web: src/components/MonitoringInsight.jsx
// Web used: <section>, <h3>, <p>, className-based confidence coloring
// Mobile uses: <View>, <Text>, StyleSheet with inline color logic

import { View, Text, StyleSheet } from 'react-native';

export default function MonitoringInsight({ title, status, confidence }) {
  // Same logic as web — confidence level determines color
  let confidenceColor = '#dc2626'; // low  — red
  if (confidence >= 80) {
    confidenceColor = '#16a34a';   // high — green
  } else if (confidence >= 50) {
    confidenceColor = '#d97706';   // mid  — amber
  }

  return (
    <View style={styles.card}>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.status}>
        <Text style={styles.statusLabel}>Status: </Text>
        {status}
      </Text>

      <View style={styles.confidenceRow}>
        <Text style={styles.confidenceLabel}>Confidence: </Text>
        <Text style={[styles.confidenceValue, { color: confidenceColor }]}>
          {confidence}%
        </Text>
      </View>

      {/* Visual confidence bar */}
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${confidence}%`, backgroundColor: confidenceColor }]} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EBF5FB',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#2E86C1',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A3C6E',
    marginBottom: 6,
  },
  status: {
    fontSize: 13,
    color: '#1e293b',
    marginBottom: 6,
  },
  statusLabel: {
    fontWeight: '600',
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  confidenceLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  confidenceValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  barBg: {
    height: 7,
    backgroundColor: '#CBD5E1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 7,
    borderRadius: 4,
  },
});
