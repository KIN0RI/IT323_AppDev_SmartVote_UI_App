import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import Navbar from '../components/layout/Navbar';
import useCandidates from '../hooks/useCandidates';
import dashboardStyles from '../constants/styles/dashboardStyles';
import { colors, spacing } from '../constants/theme';

const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'];

const insights = [
  { id: 1, title: 'Anomaly Detection',        status: 'No suspicious voting activity detected', confidence: 91 },
  { id: 2, title: 'Turnout Pattern Analysis', status: 'Normal participation trend observed',     confidence: 84 },
];

const electionStats = { totalVoters: 2000, votesCast: 1895, remainingVoters: 105 };

const adminLinks = [
  { label: '📋 Voter Log',         screen: '/voter-log'         },
  { label: '👥 Manage Candidates', screen: '/manage-candidates' },
  { label: '⚙️ Election Settings', screen: '/election-settings' },
  { label: '🏆 Results',           screen: '/results'           },
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
  const { candidates }   = useCandidates();
  const [activePosition, setActivePosition] = useState('President');
  const [showInsights,   setShowInsights]   = useState(false);

  const turnoutPercent = Math.round((electionStats.votesCast / electionStats.totalVoters) * 100);
  const filtered       = candidates.filter((c) => c.position === activePosition);
  const maxVotes       = Math.max(...filtered.map((c) => c.votes), 1);

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
            { icon: '👥', label: 'Total Voters', value: electionStats.totalVoters.toLocaleString() },
            { icon: '✅', label: 'Votes Cast',   value: electionStats.votesCast.toLocaleString()   },
            { icon: '⏳', label: 'Remaining',    value: electionStats.remainingVoters.toLocaleString() },
          ].map(({ icon, label, value }) => (
            <View key={label} style={dashboardStyles.statCard}>
              <Text style={dashboardStyles.statIcon}>{icon}</Text>
              <Text style={dashboardStyles.statLabel}>{label}</Text>
              <Text style={dashboardStyles.statValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Quick links */}
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
                <TouchableOpacity
                  key={pos}
                  style={[dashboardStyles.tab, activePosition === pos && dashboardStyles.tabActive]}
                  onPress={() => setActivePosition(pos)}
                >
                  <Text style={[dashboardStyles.tabText, activePosition === pos && dashboardStyles.tabTextActive]}>{pos}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {filtered.map((c) => {
            const pct = Math.round((c.votes / maxVotes) * 100);
            return (
              <View key={c.id} style={dashboardStyles.candidateRow}>
                <View style={dashboardStyles.candidateRowLeft}>
                  <Text style={dashboardStyles.candidateRowName}>{c.name}</Text>
                  <ProgressBar percent={pct} color={colors.secondary} />
                </View>
                <Text style={dashboardStyles.voteCount}>{c.votes}</Text>
              </View>
            );
          })}
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