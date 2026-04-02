import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import useCandidates from '../hooks/useCandidates';
import manageCandidatesStyles from '../constants/styles/manageCandidatesStyles';
import { colors, spacing } from '../constants/theme';

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

        {/* Form */}
        {showForm && (
          <View style={manageCandidatesStyles.formCard}>
            <Text style={manageCandidatesStyles.formTitle}>{editId ? 'Edit Candidate' : 'Add New Candidate'}</Text>

            <Text style={manageCandidatesStyles.label}>Full Name</Text>
            <TextInput
              style={manageCandidatesStyles.input}
              value={form.name}
              onChangeText={(v) => setForm((p) => ({ ...p, name: v }))}
              placeholder="Enter candidate name"
              placeholderTextColor={colors.textMuted}
            />

            <Text style={manageCandidatesStyles.label}>Position</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
              <View style={{ flexDirection: 'row', gap: spacing.xs }}>
                {positions.map((pos) => (
                  <TouchableOpacity
                    key={pos}
                    style={[manageCandidatesStyles.posChip, form.position === pos && manageCandidatesStyles.posChipActive]}
                    onPress={() => setForm((p) => ({ ...p, position: pos }))}
                  >
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
              <TouchableOpacity
                key={pos}
                style={[manageCandidatesStyles.tab, activePosition === pos && manageCandidatesStyles.tabActive]}
                onPress={() => setActivePosition(pos)}
              >
                <Text style={[manageCandidatesStyles.tabText, activePosition === pos && manageCandidatesStyles.tabTextActive]}>
                  {pos} ({localCandidates.filter((c) => c.position === pos).length})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>


        {filtered.length === 0 ? (
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
                <Text style={manageCandidatesStyles.candidateVotes}>{candidate.votes} votes</Text>
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
        )}
      </ScrollView>
    </View>
  );
}

export default ManageCandidatesScreen;
