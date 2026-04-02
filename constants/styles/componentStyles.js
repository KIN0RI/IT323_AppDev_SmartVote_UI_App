import { StyleSheet } from 'react-native';

export const candidateRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 8,
  },
  nameCol: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A3C6E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  positionBadge: {
    backgroundColor: '#EBF5FB',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  positionText: {
    fontSize: 11,
    color: '#2E86C1',
    fontWeight: '600',
  },
  barCol: {
    flex: 2,
  },
  barBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    backgroundColor: '#2E86C1',
    borderRadius: 4,
  },
  voteCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A3C6E',
    width: 36,
    textAlign: 'right',
  },
});

export const monitoringInsightStyles = StyleSheet.create({
  card: {
    backgroundColor: '#EBF5FB',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#2E86C1',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A3C6E',
    marginBottom: 6,
  },
  status: {
    fontSize: 13,
    color: '#1e293b',
    marginBottom: 6,
  },
  statusLabel: {
    fontWeight: '600',
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  confidenceLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  confidenceValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  barBg: {
    height: 7,
    backgroundColor: '#CBD5E1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 7,
    borderRadius: 4,
  },
});

export const statCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 26,
    marginBottom: 6,
  },
  title: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A3C6E',
  },
});
