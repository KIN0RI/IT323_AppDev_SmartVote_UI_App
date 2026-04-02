import {
  ScrollView,
  Switch,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import useElectionSettings from '../hooks/useElectionSettings';
import electionSettingsStyles from '../constants/styles/electionSettingsStyles';
import { colors } from '../constants/theme';

function ElectionSettingsScreen() {
  const { settings, saved, handleChange, handleSave, handleToggleStatus } = useElectionSettings();

  return (
    <ScrollView contentContainerStyle={electionSettingsStyles.page}>

      {saved && (
        <View style={electionSettingsStyles.successBanner}>
          <Text style={electionSettingsStyles.successText}>✅ Settings saved successfully!</Text>
        </View>
      )}


      <View style={electionSettingsStyles.statusCard}>
        <View style={electionSettingsStyles.statusLeft}>
          <Text style={electionSettingsStyles.statusTitle}>Election Status</Text>
          <Text style={electionSettingsStyles.statusSub}>Control whether voting is currently open or closed</Text>
          <View style={[electionSettingsStyles.statusBadge, settings.status === 'open' ? electionSettingsStyles.badgeOpen : electionSettingsStyles.badgeClosed]}>
            <Text style={[electionSettingsStyles.statusBadgeText, settings.status === 'open' ? electionSettingsStyles.textOpen : electionSettingsStyles.textClosed]}>
              {settings.status === 'open' ? '🟢 Voting Open' : '🔴 Voting Closed'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[electionSettingsStyles.toggleStatusBtn, settings.status === 'open' ? electionSettingsStyles.toggleClose : electionSettingsStyles.toggleOpen]}
          onPress={handleToggleStatus}
        >
          <Text style={electionSettingsStyles.toggleStatusText}>
            {settings.status === 'open' ? 'Close Election' : 'Open Election'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={electionSettingsStyles.card}>
        <Text style={electionSettingsStyles.sectionTitle}>📋 General Settings</Text>

        <Text style={electionSettingsStyles.label}>Election Title</Text>
        <TextInput
          style={electionSettingsStyles.input}
          value={settings.electionTitle}
          onChangeText={(v) => handleChange('electionTitle', v)}
          placeholder="Enter election title"
          placeholderTextColor={colors.textMuted}
        />

        <View style={electionSettingsStyles.rowFields}>
          <View style={electionSettingsStyles.halfField}>
            <Text style={electionSettingsStyles.label}>Start Date</Text>
            <TextInput style={electionSettingsStyles.input} value={settings.startDate} onChangeText={(v) => handleChange('startDate', v)} placeholder="YYYY-MM-DD" placeholderTextColor={colors.textMuted} />
          </View>
          <View style={electionSettingsStyles.halfField}>
            <Text style={electionSettingsStyles.label}>Start Time</Text>
            <TextInput style={electionSettingsStyles.input} value={settings.startTime} onChangeText={(v) => handleChange('startTime', v)} placeholder="HH:MM" placeholderTextColor={colors.textMuted} />
          </View>
        </View>

        <View style={electionSettingsStyles.rowFields}>
          <View style={electionSettingsStyles.halfField}>
            <Text style={electionSettingsStyles.label}>End Date</Text>
            <TextInput style={electionSettingsStyles.input} value={settings.endDate} onChangeText={(v) => handleChange('endDate', v)} placeholder="YYYY-MM-DD" placeholderTextColor={colors.textMuted} />
          </View>
          <View style={electionSettingsStyles.halfField}>
            <Text style={electionSettingsStyles.label}>End Time</Text>
            <TextInput style={electionSettingsStyles.input} value={settings.endTime} onChangeText={(v) => handleChange('endTime', v)} placeholder="HH:MM" placeholderTextColor={colors.textMuted} />
          </View>
        </View>
      </View>

      <View style={electionSettingsStyles.card}>
        <Text style={electionSettingsStyles.sectionTitle}>🔒 Security Settings</Text>

        <View style={electionSettingsStyles.toggleRow}>
          <View style={electionSettingsStyles.toggleInfo}>
            <Text style={electionSettingsStyles.toggleTitle}>Face Verification</Text>
            <Text style={electionSettingsStyles.toggleSub}>Require face verification before voting</Text>
          </View>
          <Switch
            value={settings.requireFaceVerification}
            onValueChange={(v) => handleChange('requireFaceVerification', v)}
            trackColor={{ false: colors.border, true: colors.secondary }}
            thumbColor={settings.requireFaceVerification ? colors.primary : '#f4f4f4'}
          />
        </View>

        <View style={[electionSettingsStyles.toggleRow, { borderBottomWidth: 0 }]}>
          <View style={electionSettingsStyles.toggleInfo}>
            <Text style={electionSettingsStyles.toggleTitle}>Allow Multiple Votes</Text>
            <Text style={electionSettingsStyles.toggleSub}>Allow a voter to cast votes more than once</Text>
          </View>
          <Switch
            value={settings.allowMultipleVotes}
            onValueChange={(v) => handleChange('allowMultipleVotes', v)}
            trackColor={{ false: colors.border, true: colors.secondary }}
            thumbColor={settings.allowMultipleVotes ? colors.primary : '#f4f4f4'}
          />
        </View>
      </View>

      <TouchableOpacity style={electionSettingsStyles.saveBtn} onPress={handleSave}>
        <Text style={electionSettingsStyles.saveBtnText}>💾 Save Settings</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

export default ElectionSettingsScreen;
