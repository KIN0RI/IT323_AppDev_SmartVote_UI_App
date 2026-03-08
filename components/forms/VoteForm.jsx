// components/forms/VoteForm.jsx
// Mirrors web: src/components/forms/VoteForm.jsx
// Web used: <form>, <fieldset>, <legend>, <input type="radio">, onSubmit
// Mobile uses: <View>, <TouchableOpacity> for radio simulation, onPress

import { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';

export default function VoteForm({ candidates, onVote }) {
  const [selected,  setSelected]  = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Same logic as web — derive unique positions from candidates
  const positions = [...new Set(candidates.map((c) => c.position))];

  // Mirrors web's handleChange(position, candidateId)
  const handleSelect = (position, candidateId) => {
    setSelected((prev) => ({ ...prev, [position]: candidateId }));
  };

  // Mirrors web's handleSubmit — checks all positions are selected
  const handleSubmit = () => {
    if (positions.every((pos) => selected[pos])) {
      Object.values(selected).forEach((id) => onVote(id));
      setSubmitted(true);
    }
  };

  const allSelected = positions.every((pos) => selected[pos]);

  // Success state — mirrors web's sv-vote-success section
  if (submitted) {
    return (
      <View style={styles.successCard}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Vote Submitted!</Text>
        <Text style={styles.successSub}>
          Thank you for participating in the USTP Student Election.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.form}>
      {positions.map((position) => (
        // Each position = a <fieldset> in the web version
        <View key={position} style={styles.fieldset}>
          <Text style={styles.legend}>{position}</Text>

          <View style={styles.radioGroup}>
            {candidates
              .filter((c) => c.position === position)
              .map((candidate) => {
                const isSelected = selected[position] === candidate.id;
                return (
                  // Each candidate = a <label><input type="radio"> in the web version
                  <TouchableOpacity
                    key={candidate.id}
                    style={[styles.radioLabel, isSelected && styles.radioLabelSelected]}
                    onPress={() => handleSelect(position, candidate.id)}
                  >
                    {/* Custom radio circle — replaces <input type="radio"> */}
                    <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                    <Text style={[styles.radioText, isSelected && styles.radioTextSelected]}>
                      {candidate.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      ))}

      {/* Submit button — disabled until all positions selected */}
      <TouchableOpacity
        style={[styles.btn, !allSelected && styles.btnDisabled]}
        onPress={handleSubmit}
        disabled={!allSelected}
      >
        <Text style={styles.btnText}>Cast Vote</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form:                 { width: '100%' },
  fieldset:             { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  legend:               { fontSize: 15, fontWeight: '700', color: '#1A3C6E', marginBottom: 10 },
  radioGroup:           { gap: 8 },
  radioLabel:           { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' },
  radioLabelSelected:   { borderColor: '#1A3C6E', backgroundColor: '#EBF5FB' },
  radioCircle:          { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CCCCCC', justifyContent: 'center', alignItems: 'center' },
  radioCircleSelected:  { borderColor: '#1A3C6E' },
  radioDot:             { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1A3C6E' },
  radioText:            { fontSize: 14, color: '#1e293b', flex: 1 },
  radioTextSelected:    { fontWeight: '600', color: '#1A3C6E' },
  btn:                  { backgroundColor: '#1A3C6E', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  btnDisabled:          { backgroundColor: '#94a3b8' },
  btnText:              { color: '#fff', fontWeight: '700', fontSize: 15 },
  successCard:          { alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 32 },
  successIcon:          { fontSize: 52, marginBottom: 12 },
  successTitle:         { fontSize: 20, fontWeight: '700', color: '#1A3C6E', marginBottom: 8 },
  successSub:           { fontSize: 14, color: '#64748b', textAlign: 'center' },
});
