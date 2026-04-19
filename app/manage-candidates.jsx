import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import manageCandidatesStyles from '../constants/styles/manageCandidatesStyles';
import { colors, spacing } from '../constants/theme';
import useCandidates from '../hooks/useCandidates';

const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'];
const emptyForm = { name: '', position: 'President', course: '', year_level: '' };

function ManageCandidatesScreen() {
  const { candidates, loading, addCandidate, updateCandidate, deleteCandidate } = useCandidates();
  const [activePosition, setActivePosition] = useState('President');
  const [showForm,       setShowForm]       = useState(false);
  const [form,           setForm]           = useState(emptyForm);
  const [editId,         setEditId]         = useState(null);
  const [saved,          setSaved]          = useState(false);

  const filtered = candidates.filter((c) => c.position === activePosition);

  const handleSubmit = async () => {
    if (!form.name.trim()) { Alert.alert('Required', 'Please enter a candidate name.'); return; }
    try {
      if (editId !== null) {
        await updateCandidate(editId, form);
        setEditId(null);
      } else {
        await addCandidate(form);
      }
      setForm(emptyForm);
      setShowForm(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      Alert.alert('Error', 'Failed to save candidate.');
    }
  };

  const handleEdit = (candidate) => {
    setForm({ name: candidate.name, position: candidate.position,
              course: candidate.course || '', year_level: candidate.year_level || '' });
    setEditId(candidate.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Candidate', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try { await deleteCandidate(id); }
        catch { Alert.alert('Error', 'Failed to delete.'); }
      }},
    ]);
  };

  const handleCancel = () => { setForm(emptyForm); setEditId(null); setShowForm(false); };

  return (
    <View style={manageCandidatesStyles.page}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {saved && (
          <View style={manageCandidatesStyles.successBanner}>
            <Text style={manageCandidatesStyles.successText}>✅ Candidates updated successfully!</Text>
          </View>
        )}

        {!showForm && (
          <TouchableOpacity style={manageCandidatesStyles.addBtn} onPress={() => setShowForm(true)}>
            <Text style={manageCandidatesStyles.addBtnText}>+ Add Candidate</Text>
          </TouchableOpacity>
        )}

        {showForm && (
          <View style={manageCandidatesStyles.formCard}>
            <Text style={manageCandidatesStyles.formTitle}>{editId ? 'Edit Candidate' : 'Add New Candidate'}</Text>

            <Text style={manageCandidatesStyles.label}>Full Name</Text>
            <TextInput style={manageCandidatesStyles.input} value={form.name}
              onChangeText={(v) => setForm((p) => ({ ...p, name: v }))}
              placeholder="Enter candidate name" placeholderTextColor={colors.textMuted} />

            <Text style={manageCandidatesStyles.label}>Course</Text>
            <TextInput style={manageCandidatesStyles.input} value={form.course}
              onChangeText={(v) => setForm((p) => ({ ...p, course: v }))}
              placeholder="e.g. BS Information Technology" placeholderTextColor={colors.textMuted} />

            <Text style={manageCandidatesStyles.label}>Year Level</Text>
            <TextInput style={manageCandidatesStyles.input} value={form.year_level}
              onChangeText={(v) => setForm((p) => ({ ...p, year_level: v }))}
              placeholder="e.g. 3rd Year" placeholderTextColor={colors.textMuted} />

            <Text style={manageCandidatesStyles.label}>Position</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
              <View style={{ flexDirection: 'row', gap: spacing.xs }}>
                {positions.map((pos) => (
                  <TouchableOpacity key={pos}
                    style={[manageCandidatesStyles.posChip, form.position === pos && manageCandidatesStyles.posChipActive]}
                    onPress={() => setForm((p) => ({ ...p, position: pos }))}>
                    <Text style={[manageCandidatesStyles.posChipText, form.position === pos && manageCandidatesStyles.posChipTextActive]}>{pos}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={manageCandidatesStyles.btnRow}>
              <TouchableOpacity style={manageCandidatesStyles.btn} onPress={handleSubmit}>
                <Text style={manageCandidatesStyles.btnText}>{editId ? 'Save Changes' : 'Add Candidate'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={manageCandidatesStyles.outlineBtn} onPress={handleCancel}>
                <Text style={manageCandidatesStyles.outlineBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={manageCandidatesStyles.tabsScroll}>
          <View style={manageCandidatesStyles.tabsRow}>
            {positions.map((pos) => (
              <TouchableOpacity key={pos}
                style={[manageCandidatesStyles.tab, activePosition === pos && manageCandidatesStyles.tabActive]}
                onPress={() => setActivePosition(pos)}>
                <Text style={[manageCandidatesStyles.tabText, activePosition === pos && manageCandidatesStyles.tabTextActive]}>
                  {pos} ({candidates.filter((c) => c.position === pos).length})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {loading ? <ActivityIndicator size="large" style={{ marginTop: 40 }} /> : (
          filtered.length === 0 ? (
            <View style={manageCandidatesStyles.empty}>
              <Text style={manageCandidatesStyles.emptyText}>No candidates for this position yet.</Text>
            </View>
          ) : (
            filtered.map((candidate, index) => (
              <View key={candidate.id} style={manageCandidatesStyles.candidateRow}>
                <View style={manageCandidatesStyles.avatar}>
                  <Text style={manageCandidatesStyles.avatarText}>{candidate.name.charAt(0)}</Text>
                </View>
                <View style={manageCandidatesStyles.candidateInfo}>
                  <Text style={manageCandidatesStyles.candidateName}>{index + 1}. {candidate.name}</Text>
                  <Text style={manageCandidatesStyles.candidatePos}>{candidate.position}</Text>
                  <Text style={manageCandidatesStyles.candidateVotes}>{candidate.vote_count || 0} votes</Text>
                </View>
                <View style={manageCandidatesStyles.actions}>
                  <TouchableOpacity style={manageCandidatesStyles.editBtn} onPress={() => handleEdit(candidate)}>
                    <Text style={manageCandidatesStyles.editBtnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={manageCandidatesStyles.deleteBtn} onPress={() => handleDelete(candidate.id)}>
                    <Text style={manageCandidatesStyles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )
        )}
      </ScrollView>
    </View>
  );
}

export default ManageCandidatesScreen;