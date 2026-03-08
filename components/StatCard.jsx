// components/StatCard.jsx
// Mirrors web: src/components/StatCard.jsx
// Web used: <article>, <h3>, <p>, className
// Mobile uses: <View>, <Text>, StyleSheet

import { View, Text, StyleSheet } from 'react-native';

export default function StatCard({ icon, title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 26,
    marginBottom: 6,
  },
  title: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A3C6E',
  },
});
