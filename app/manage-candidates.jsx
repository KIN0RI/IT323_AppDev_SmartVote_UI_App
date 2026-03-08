import { useState } from 'react';
import {
  Alert,
  ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';
import useCandidates from '../hooks/useCandidates';

const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'];
const emptyForm = { name: '', position: 'President' };

function ManageCandidatesScreen() {
  const { candidates }    = useCandidates();
  const [localCandidates, setLocalCandidates] = useState(candidates);
  const [activePosition,  setActivePosition]  = useState('President');
  const [showForm,        setShowForm]        = useState(false);
  const [form,            setForm]            = useState(emptyForm);
  const [editId,          setEditId]          = useState(null);
  const [saved,           setSaved]           = useState(false);

  const filtered = localCandidates.filter((c) => c.position === activePosition);

  const handleSubmit = () => {
    if (!form.name.trim()) { Alert.alert('Required', 'Please enter a candidate name.'); return; }
    if (editId !== null) {
      setLocalCandidates((prev) => prev.map((c) => c.id === editId ? { ...c, ...form } : c));
      setEditId(null);
    } else {
      setLocalCandidates((prev) => [...prev, { id: Date.now(), name: form.name, position: form.position, votes: 0 }]);
    }
    setForm(emptyForm);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleEdit = (candidate) => {
    setForm({ name: candidate.name, position: candidate.position });
    setEditId(candidate.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Candidate', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setLocalCandidates((prev) => prev.filter((c) => c.id !== id)) },
    ]);
  };

  const handleCancel = () => { setForm(emptyForm); setEditId(null); setShowForm(false); };

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {saved && (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>✅ Candidates updated successfully!</Text>
          </View>
        )}

        {/* Add button */}
        {!showForm && (
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)}>
            <Text style={styles.addBtnText}>+ Add Candidate</Text>
          </TouchableOpacity>
        )}

        {/* Form */}
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>{editId ? 'Edit Candidate' : 'Add New Candidate'}</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={(v) => setForm((p) => ({ ...p, name: v }))}
              placeholder="Enter candidate name"
              placeholderTextColor={colors.textMuted}
            />

            <Text style={styles.label}>Position</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
              <View style={{ flexDirection: 'row', gap: spacing.xs }}>
                {positions.map((pos) => (
                  <TouchableOpacity
                    key={pos}
                    style={[styles.posChip, form.position === pos && styles.posChipActive]}
                    onPress={() => setForm((p) => ({ ...p, position: pos }))}
                  >
                    <Text style={[styles.posChipText, form.position === pos && styles.posChipTextActive]}>{pos}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>{editId ? 'Save Changes' : 'Add Candidate'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn} onPress={handleCancel}>
                <Text style={styles.outlineBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Position tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          <View style={styles.tabsRow}>
            {positions.map((pos) => (
              <TouchableOpacity
                key={pos}
                style={[styles.tab, activePosition === pos && styles.tabActive]}
                onPress={() => setActivePosition(pos)}
              >
                <Text style={[styles.tabText, activePosition === pos && styles.tabTextActive]}>
                  {pos} ({localCandidates.filter((c) => c.position === pos).length})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Candidate list */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No candidates for this position yet.</Text>
          </View>
        ) : (
          filtered.map((candidate, index) => (
            <View key={candidate.id} style={styles.candidateRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{candidate.name.charAt(0)}</Text>
              </View>
              <View style={styles.candidateInfo}>
                <Text style={styles.candidateName}>{index + 1}. {candidate.name}</Text>
                <Text style={styles.candidatePos}>{candidate.position}</Text>
                <Text style={styles.candidateVotes}>{candidate.votes} votes</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(candidate)}>
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(candidate.id)}>
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page:               { flex: 1, backgroundColor: colors.bgLight },
  successBanner:      { backgroundColor: '#dcfce7', padding: spacing.md, margin: spacing.md, borderRadius: radius.md },
  successText:        { color: colors.success, fontWeight: '600', textAlign: 'center' },
  addBtn:             { backgroundColor: colors.primary, margin: spacing.md, borderRadius: radius.md, padding: 13, alignItems: 'center' },
  addBtnText:         { color: '#fff', fontWeight: '700', fontSize: font.md },
  formCard:           { backgroundColor: colors.cardBg, margin: spacing.md, borderRadius: radius.md, padding: spacing.lg, elevation: 2 },
  formTitle:          { fontSize: font.md, fontWeight: '700', color: colors.primary, marginBottom: spacing.md },
  label:              { fontSize: font.sm, fontWeight: '600', color: colors.textDark, marginBottom: 4 },
  input:              { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, fontSize: font.base, color: colors.textDark, marginBottom: spacing.md, backgroundColor: '#FAFAFA' },
  posChip:            { paddingHorizontal: 14, paddingVertical: 7, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgLight },
  posChipActive:      { backgroundColor: colors.primary, borderColor: colors.primary },
  posChipText:        { fontSize: font.sm, color: colors.textMuted, fontWeight: '600' },
  posChipTextActive:  { color: '#fff' },
  btnRow:             { flexDirection: 'row', gap: spacing.sm },
  btn:                { flex: 1, backgroundColor: colors.primary, borderRadius: radius.md, padding: 12, alignItems: 'center' },
  btnText:            { color: '#fff', fontWeight: '700', fontSize: font.base },
  outlineBtn:         { flex: 1, borderWidth: 1, borderColor: colors.primary, borderRadius: radius.md, padding: 12, alignItems: 'center' },
  outlineBtnText:     { color: colors.primary, fontWeight: '600', fontSize: font.base },
  tabsScroll:         { marginHorizontal: spacing.md, marginBottom: spacing.sm },
  tabsRow:            { flexDirection: 'row', gap: spacing.xs, paddingVertical: spacing.sm },
  tab:                { paddingHorizontal: 14, paddingVertical: 7, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgLight },
  tabActive:          { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText:            { fontSize: font.sm, color: colors.textMuted, fontWeight: '600' },
  tabTextActive:      { color: '#fff' },
  candidateRow:       { backgroundColor: colors.cardBg, marginHorizontal: spacing.md, marginBottom: spacing.sm, borderRadius: radius.md, padding: spacing.md, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  avatar:             { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  avatarText:         { color: '#fff', fontWeight: '700', fontSize: font.lg },
  candidateInfo:      { flex: 1 },
  candidateName:      { fontSize: font.base, fontWeight: '700', color: colors.textDark },
  candidatePos:       { fontSize: font.sm, color: colors.secondary },
  candidateVotes:     { fontSize: font.sm, color: colors.textMuted },
  actions:            { gap: spacing.xs },
  editBtn:            { backgroundColor: colors.accent, borderRadius: radius.sm, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 4 },
  editBtnText:        { color: colors.primary, fontSize: font.sm, fontWeight: '600' },
  deleteBtn:          { backgroundColor: '#fee2e2', borderRadius: radius.sm, paddingHorizontal: 12, paddingVertical: 5 },
  deleteBtnText:      { color: colors.danger, fontSize: font.sm, fontWeight: '600' },
  empty:              { alignItems: 'center', padding: spacing.xl },
  emptyText:          { color: colors.textMuted, fontSize: font.base },
});

export default ManageCandidatesScreen;
