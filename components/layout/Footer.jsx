// components/layout/Footer.jsx
// Mirrors web: src/components/layout/Footer.jsx
// Web used: <footer>, className
// Mobile uses: <View>, <Text>, StyleSheet

import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        USTP SmartVote © 2026 — Database-Driven QR Code Voting System with AI-Assisted Monitoring
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1A3C6E',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
