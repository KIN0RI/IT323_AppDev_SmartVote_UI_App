
import {
  FlatList, StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { colors, font, radius, spacing } from '../constants/theme';
import useVoterLog from '../hooks/useVoterLog';
function VoterLogScreen() {
  const { search, setSearch, filter, setFilter, filtered } = useVoterLog();

  return (
    <View style={styles.page}>

      {/* Search */}
      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or student ID..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.filterRow}>
          {['All', 'Voted', 'Not Yet Voted'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterBtnText, filter === f && styles.filterBtnTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.count}>{filtered.length} record(s) found</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No records found.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.voterName}>{item.name}</Text>
                <Text style={styles.voterMeta}>{item.studentId} · {item.loginTime}</Text>
                <Text style={styles.voterEmail}>{item.email}</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, item.status === 'Voted' ? styles.badgeVoted : styles.badgePending]}>
              <Text style={[styles.statusText, item.status === 'Voted' ? styles.textVoted : styles.textPending]}>
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page:              { flex: 1, backgroundColor: colors.bgLight },
  controls:          { backgroundColor: colors.cardBg, padding: spacing.md, elevation: 2 },
  searchInput:       { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm, fontSize: font.base, color: colors.textDark, marginBottom: spacing.sm, backgroundColor: '#FAFAFA' },
  filterRow:         { flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.sm },
  filterBtn:         { paddingHorizontal: 14, paddingVertical: 6, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgLight },
  filterBtnActive:   { backgroundColor: colors.primary, borderColor: colors.primary },
  filterBtnText:     { fontSize: font.sm, color: colors.textMuted, fontWeight: '600' },
  filterBtnTextActive: { color: '#fff' },
  count:             { fontSize: font.sm, color: colors.textMuted },
  row:               { backgroundColor: colors.cardBg, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  rowLeft:           { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar:            { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  avatarText:        { color: '#fff', fontWeight: '700', fontSize: font.md },
  voterName:         { fontSize: font.base, fontWeight: '700', color: colors.textDark },
  voterMeta:         { fontSize: font.sm, color: colors.textMuted },
  voterEmail:        { fontSize: font.sm, color: colors.textMuted },
  statusBadge:       { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm },
  badgeVoted:        { backgroundColor: '#dcfce7' },
  badgePending:      { backgroundColor: '#fef3c7' },
  statusText:        { fontSize: font.sm, fontWeight: '700' },
  textVoted:         { color: colors.success },
  textPending:       { color: colors.warning },
  empty:             { alignItems: 'center', padding: spacing.xl },
  emptyText:         { color: colors.textMuted, fontSize: font.base },
});

export default VoterLogScreen;
