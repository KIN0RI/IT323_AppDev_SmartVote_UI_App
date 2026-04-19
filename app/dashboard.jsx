import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import api from '../api';
import Navbar from '../components/layout/Navbar';
import dashboardStyles from '../constants/styles/dashboardStyles';
import { colors, spacing } from '../constants/theme';

const positions   = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'];
const adminLinks  = [
  { label: '📋 Voter Log',         screen: '/voter-log'         },
  { label: '👥 Manage Candidates', screen: '/manage-candidates' },
  { label: '⚙️ Election Settings', screen: '/election-settings' },
  { label: '🏆 Results',           screen: '/results'           },
];
const insights = [
  { id: 1, title: 'Anomaly Detection',        status: 'No suspicious voting activity detected', confidence: 91 },
  { id: 2, title: 'Turnout Pattern Analysis', status: 'Normal participation trend observed',     confidence: 84 },
];

function ProgressBar({ percent, color = colors.primary }) {
  return (
    <View style={dashboardStyles.progressTrack}>
      <View style={[dashboardStyles.progressFill, { flex: percent / 100, backgroundColor: color }]} />
      <View style={{ flex: 1 - percent / 100 }} />
    </View>
  );
}

function AdminDashboardScreen() {
  const [stats,          setStats]          = useState(null);
  const [activePosition, setActivePosition] = useState('President');
  const [showInsights,   setShowInsights]   = useState(false);
  const [loading,        setLoading]        = useState(true);

  useEffect(() => {
    api.get('/dashboard/')
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading dashboard...</Text>
    </View>
  );

  const turnoutPercent = stats?.turnout_percent || 0;
  const filtered       = stats?.candidates_by_position?.[activePosition] || [];
  const maxVotes       = Math.max(...filtered.map((c) => c.vote_count || 0), 1);

  return (
    <ScrollView style={dashboardStyles.page} contentContainerStyle={{ paddingBottom: 40 }}>
      <Navbar />
      <View style={dashboardStyles.pageHeader}>
        <Text style={dashboardStyles.pageTitle}>Election Monitoring Dashboard</Text>
      </View>

      <View style={dashboardStyles.content}>
        <View style={dashboardStyles.card}>
          <View style={dashboardStyles.progressLabel}>
            <Text style={dashboardStyles.progressText}>Voter Turnout</Text>
            <Text style={dashboardStyles.progressPercent}>{turnoutPercent}%</Text>
          </View>
          <ProgressBar percent={turnoutPercent} color={colors.primary} />
        </View>

        <View style={dashboardStyles.statsRow}>
          {[
            { icon: '👥', label: 'Total Voters', value: String(stats?.total_voters    || 0) },
            { icon: '✅', label: 'Votes Cast',   value: String(stats?.votes_cast      || 0) },
            { icon: '⏳', label: 'Remaining',    value: String(stats?.remaining_voters || 0) },
          ].map(({ icon, label, value }) => (
            <View key={label} style={dashboardStyles.statCard}>
              <Text style={dashboardStyles.statIcon}>{icon}</Text>
              <Text style={dashboardStyles.statLabel}>{label}</Text>
              <Text style={dashboardStyles.statValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={dashboardStyles.quickGrid}>
          {adminLinks.map(({ label, screen }) => (
            <TouchableOpacity key={screen} style={dashboardStyles.quickBtn} onPress={() => router.push(screen)}>
              <Text style={dashboardStyles.quickBtnText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={dashboardStyles.card}>
          <Text style={dashboardStyles.sectionTitle}>Candidate Vote Tally</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
            <View style={dashboardStyles.tabsRow}>
              {positions.map((pos) => (
                <TouchableOpacity key={pos}
                  style={[dashboardStyles.tab, activePosition === pos && dashboardStyles.tabActive]}
                  onPress={() => setActivePosition(pos)}>
                  <Text style={[dashboardStyles.tabText, activePosition === pos && dashboardStyles.tabTextActive]}>{pos}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {filtered.map((c) => {
            const pct = Math.round(((c.vote_count || 0) / maxVotes) * 100);
            return (
              <View key={c.id} style={dashboardStyles.candidateRow}>
                <View style={dashboardStyles.candidateRowLeft}>
                  <Text style={dashboardStyles.candidateRowName}>{c.name}</Text>
                  <ProgressBar percent={pct} color={colors.secondary} />
                </View>
                <Text style={dashboardStyles.voteCount}>{c.vote_count || 0}</Text>
              </View>
            );
          })}
          {filtered.length === 0 && <Text style={{ textAlign: 'center', color: '#64748b', padding: 16 }}>No candidates yet.</Text>}
        </View>

        <View style={dashboardStyles.card}>
          <View style={dashboardStyles.insightHeader}>
            <Text style={dashboardStyles.sectionTitle}>AI Monitoring Insights</Text>
            <TouchableOpacity onPress={() => setShowInsights((v) => !v)}>
              <Text style={dashboardStyles.insightToggle}>{showInsights ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          {showInsights && insights.map((item) => (
            <View key={item.id} style={dashboardStyles.insightCard}>
              <Text style={dashboardStyles.insightTitle}>{item.title}</Text>
              <Text style={dashboardStyles.insightStatus}>{item.status}</Text>
              <Text style={dashboardStyles.confLabel}>Confidence: {item.confidence}%</Text>
              <ProgressBar percent={item.confidence} color={colors.success} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default AdminDashboardScreen;