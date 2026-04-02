
import {
  FlatList,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import useVoterLog from '../hooks/useVoterLog';
import voterLogStyles from '../constants/styles/voterLogStyles';
import { colors, spacing } from '../constants/theme';
function VoterLogScreen() {
  const { search, setSearch, filter, setFilter, filtered } = useVoterLog();

  return (
    <View style={voterLogStyles.page}>

      <View style={voterLogStyles.controls}>
        <TextInput
          style={voterLogStyles.searchInput}
          placeholder="Search by name or student ID..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        <View style={voterLogStyles.filterRow}>
          {['All', 'Voted', 'Not Yet Voted'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[voterLogStyles.filterBtn, filter === f && voterLogStyles.filterBtnActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[voterLogStyles.filterBtnText, filter === f && voterLogStyles.filterBtnTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={voterLogStyles.count}>{filtered.length} record(s) found</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }}
        ListEmptyComponent={
          <View style={voterLogStyles.empty}>
            <Text style={voterLogStyles.emptyText}>No records found.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={voterLogStyles.row}>
            <View style={voterLogStyles.rowLeft}>
              <View style={voterLogStyles.avatar}>
                <Text style={voterLogStyles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={voterLogStyles.voterName}>{item.name}</Text>
                <Text style={voterLogStyles.voterMeta}>{item.studentId} · {item.loginTime}</Text>
                <Text style={voterLogStyles.voterEmail}>{item.email}</Text>
              </View>
            </View>
            <View style={[voterLogStyles.statusBadge, item.status === 'Voted' ? voterLogStyles.badgeVoted : voterLogStyles.badgePending]}>
              <Text style={[voterLogStyles.statusText, item.status === 'Voted' ? voterLogStyles.textVoted : voterLogStyles.textPending]}>
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default VoterLogScreen;
