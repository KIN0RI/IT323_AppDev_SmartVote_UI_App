import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import Navbar from '../components/layout/Navbar';
import studentDashboardStyles from '../constants/styles/studentDashboardStyles';

const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'];

const announcements = [
  { id: 1, icon: '📢', text: 'Voting ends today at 5:00 PM. Make sure to cast your vote!' },
  { id: 2, icon: '📋', text: 'All registered students are eligible to vote in this election.' },
  { id: 3, icon: '🔒', text: 'Your vote is confidential and secured by the system.' },
];

function StudentDashboardScreen() {
  const [electionStatus] = useState('Voting is Open');
  const [hasVoted]       = useState(false);

  return (
    <ScrollView style={studentDashboardStyles.page} contentContainerStyle={{ paddingBottom: 40 }}>
      <Navbar />

      <View style={studentDashboardStyles.content}>

        <View style={studentDashboardStyles.statsRow}>
          <View style={studentDashboardStyles.statCard}>
            <Text style={studentDashboardStyles.statIcon}>🗳️</Text>
            <Text style={studentDashboardStyles.statLabel}>Election Status</Text>
            <Text style={[studentDashboardStyles.statusBadge, electionStatus === 'Voting is Open' ? studentDashboardStyles.statusOpen : studentDashboardStyles.statusClosed]}>
              {electionStatus}
            </Text>
          </View>
          <View style={studentDashboardStyles.statCard}>
            <Text style={studentDashboardStyles.statIcon}>📋</Text>
            <Text style={studentDashboardStyles.statLabel}>Positions to Vote</Text>
            <Text style={studentDashboardStyles.statValue}>{positions.length}</Text>
          </View>
          <View style={studentDashboardStyles.statCard}>
            <Text style={studentDashboardStyles.statIcon}>✅</Text>
            <Text style={studentDashboardStyles.statLabel}>Your Vote Status</Text>
            <Text style={[studentDashboardStyles.statusBadge, hasVoted ? studentDashboardStyles.statusOpen : studentDashboardStyles.statusClosed]}>
              {hasVoted ? 'Voted' : 'Not Yet Voted'}
            </Text>
          </View>
        </View>

        <View style={studentDashboardStyles.actionCard}>
          <Text style={studentDashboardStyles.actionTitle}>Ready to Cast Your Vote?</Text>
          <Text style={studentDashboardStyles.actionSub}>You will vote for {positions.length} positions one at a time.</Text>

          <View style={studentDashboardStyles.positionList}>
            {positions.map((pos, i) => (
              <View key={pos} style={studentDashboardStyles.positionBadge}>
                <Text style={studentDashboardStyles.positionBadgeText}>{i + 1}. {pos}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[studentDashboardStyles.voteBtn, (electionStatus !== 'Voting is Open' || hasVoted) && studentDashboardStyles.voteBtnDisabled]}
            onPress={() => router.push('/vote')}
            disabled={electionStatus !== 'Voting is Open' || hasVoted}
          >
            <Text style={studentDashboardStyles.voteBtnText}>
              {hasVoted ? '✅ Already Voted' : '🗳️ Proceed to Vote'}
            </Text>
          </TouchableOpacity>

          {hasVoted && (
            <TouchableOpacity style={studentDashboardStyles.outlineBtn} onPress={() => router.push('/vote-analysis')}>
              <Text style={studentDashboardStyles.outlineBtnText}>View My Votes</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={studentDashboardStyles.quickLinks}>
          <TouchableOpacity style={studentDashboardStyles.quickBtn} onPress={() => router.push('/results')}>
            <Text style={studentDashboardStyles.quickBtnText}>🏆 View Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={studentDashboardStyles.quickBtn} onPress={() => router.push('/profile')}>
            <Text style={studentDashboardStyles.quickBtnText}>👤 My Profile</Text>
          </TouchableOpacity>
        </View>

        <Text style={studentDashboardStyles.sectionTitle}>📣 Announcements</Text>
        {announcements.map((a) => (
          <View key={a.id} style={studentDashboardStyles.announcement}>
            <Text style={studentDashboardStyles.announcementIcon}>{a.icon}</Text>
            <Text style={studentDashboardStyles.announcementText}>{a.text}</Text>
          </View>
        ))}

      </View>
    </ScrollView>
  );
}

export default StudentDashboardScreen;