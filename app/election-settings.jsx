import {
  ScrollView, StyleSheet,
  Switch,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';
import useElectionSettings from '../hooks/useElectionSettings';

function ElectionSettingsScreen() {
  const { settings, saved, handleChange, handleSave, handleToggleStatus } = useElectionSettings();

  return (
    <ScrollView contentContainerStyle={styles.page}>

      {saved && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>✅ Settings saved successfully!</Text>
        </View>
      )}

      {/* Election status toggle */}
      <View style={styles.statusCard}>
        <View style={styles.statusLeft}>
          <Text style={styles.statusTitle}>Election Status</Text>
          <Text style={styles.statusSub}>Control whether voting is currently open or closed</Text>
          <View style={[styles.statusBadge, settings.status === 'open' ? styles.badgeOpen : styles.badgeClosed]}>
            <Text style={[styles.statusBadgeText, settings.status === 'open' ? styles.textOpen : styles.textClosed]}>
              {settings.status === 'open' ? '🟢 Voting Open' : '🔴 Voting Closed'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.toggleStatusBtn, settings.status === 'open' ? styles.toggleClose : styles.toggleOpen]}
          onPress={handleToggleStatus}
        >
          <Text style={styles.toggleStatusText}>
            {settings.status === 'open' ? 'Close Election' : 'Open Election'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* General settings */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📋 General Settings</Text>

        <Text style={styles.label}>Election Title</Text>
        <TextInput
          style={styles.input}
          value={settings.electionTitle}
          onChangeText={(v) => handleChange('electionTitle', v)}
          placeholder="Enter election title"
          placeholderTextColor={colors.textMuted}
        />

        <View style={styles.rowFields}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput style={styles.input} value={settings.startDate} onChangeText={(v) => handleChange('startDate', v)} placeholder="YYYY-MM-DD" placeholderTextColor={colors.textMuted} />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Start Time</Text>
            <TextInput style={styles.input} value={settings.startTime} onChangeText={(v) => handleChange('startTime', v)} placeholder="HH:MM" placeholderTextColor={colors.textMuted} />
          </View>
        </View>

        <View style={styles.rowFields}>
          <View style={styles.halfField}>
            <Text style={styles.label}>End Date</Text>
            <TextInput style={styles.input} value={settings.endDate} onChangeText={(v) => handleChange('endDate', v)} placeholder="YYYY-MM-DD" placeholderTextColor={colors.textMuted} />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>End Time</Text>
            <TextInput style={styles.input} value={settings.endTime} onChangeText={(v) => handleChange('endTime', v)} placeholder="HH:MM" placeholderTextColor={colors.textMuted} />
          </View>
        </View>
      </View>

      {/* Security settings */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🔒 Security Settings</Text>

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleTitle}>Face Verification</Text>
            <Text style={styles.toggleSub}>Require face verification before voting</Text>
          </View>
          <Switch
            value={settings.requireFaceVerification}
            onValueChange={(v) => handleChange('requireFaceVerification', v)}
            trackColor={{ false: colors.border, true: colors.secondary }}
            thumbColor={settings.requireFaceVerification ? colors.primary : '#f4f4f4'}
          />
        </View>

        <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleTitle}>Allow Multiple Votes</Text>
            <Text style={styles.toggleSub}>Allow a voter to cast votes more than once</Text>
          </View>
          <Switch
            value={settings.allowMultipleVotes}
            onValueChange={(v) => handleChange('allowMultipleVotes', v)}
            trackColor={{ false: colors.border, true: colors.secondary }}
            thumbColor={settings.allowMultipleVotes ? colors.primary : '#f4f4f4'}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>💾 Save Settings</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:              { flexGrow: 1, backgroundColor: colors.bgLight, padding: spacing.md, paddingBottom: 40 },
  successBanner:     { backgroundColor: '#dcfce7', borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  successText:       { color: colors.success, fontWeight: '600', textAlign: 'center' },
  statusCard:        { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md, elevation: 2 },
  statusLeft:        { marginBottom: spacing.md },
  statusTitle:       { fontSize: font.md, fontWeight: '700', color: colors.primary },
  statusSub:         { fontSize: font.sm, color: colors.textMuted, marginBottom: spacing.sm },
  statusBadge:       { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.full },
  badgeOpen:         { backgroundColor: '#dcfce7' },
  badgeClosed:       { backgroundColor: '#fee2e2' },
  statusBadgeText:   { fontWeight: '700', fontSize: font.sm },
  textOpen:          { color: colors.success },
  textClosed:        { color: colors.danger },
  toggleStatusBtn:   { borderRadius: radius.md, padding: 12, alignItems: 'center' },
  toggleClose:       { backgroundColor: colors.danger },
  toggleOpen:        { backgroundColor: colors.success },
  toggleStatusText:  { color: '#fff', fontWeight: '700', fontSize: font.base },
  card:              { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md, elevation: 2 },
  sectionTitle:      { fontSize: font.md, fontWeight: '700', color: colors.primary, marginBottom: spacing.md },
  label:             { fontSize: font.sm, fontWeight: '600', color: colors.textDark, marginBottom: 4 },
  input:             { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm, fontSize: font.base, color: colors.textDark, marginBottom: spacing.md, backgroundColor: '#FAFAFA' },
  rowFields:         { flexDirection: 'row', gap: spacing.sm },
  halfField:         { flex: 1 },
  toggleRow:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  toggleInfo:        { flex: 1, marginRight: spacing.md },
  toggleTitle:       { fontSize: font.base, fontWeight: '700', color: colors.textDark },
  toggleSub:         { fontSize: font.sm, color: colors.textMuted },
  saveBtn:           { backgroundColor: colors.primary, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  saveBtnText:       { color: '#fff', fontWeight: '700', fontSize: font.md },
});

export default ElectionSettingsScreen;
