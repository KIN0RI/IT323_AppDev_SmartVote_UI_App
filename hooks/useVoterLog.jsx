import { useState } from 'react';

const mockVoterLog = [
  { id: 1, name: 'Juan Dela Cruz',  studentId: '2024-00101', email: 'juan@gmail.com',   loginTime: '8:02 AM', status: 'Voted' },
  { id: 2, name: 'Maria Santos',    studentId: '2024-00102', email: 'maria@gmail.com',  loginTime: '8:15 AM', status: 'Voted' },
  { id: 3, name: 'Pedro Reyes',     studentId: '2024-00103', email: 'pedro@gmail.com',  loginTime: '8:30 AM', status: 'Not Yet Voted' },
  { id: 4, name: 'Ana Lim',         studentId: '2024-00104', email: 'ana@gmail.com',    loginTime: '8:45 AM', status: 'Voted' },
  { id: 5, name: 'Carlos Mendoza',  studentId: '2024-00105', email: 'carlos@gmail.com', loginTime: '9:00 AM', status: 'Not Yet Voted' },
  { id: 6, name: 'Rosa Garcia',     studentId: '2024-00106', email: 'rosa@gmail.com',   loginTime: '9:10 AM', status: 'Voted' },
  { id: 7, name: 'Jose Torres',     studentId: '2024-00107', email: 'jose@gmail.com',   loginTime: '9:25 AM', status: 'Voted' },
  { id: 8, name: 'Luz Ramos',       studentId: '2024-00108', email: 'luz@gmail.com',    loginTime: '9:40 AM', status: 'Not Yet Voted' },
];

function useVoterLog() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = mockVoterLog.filter((voter) => {
    const matchSearch =
      voter.name.toLowerCase().includes(search.toLowerCase()) ||
      voter.studentId.includes(search);
    const matchFilter = filter === 'All' || voter.status === filter;
    return matchSearch && matchFilter;
  });

  return { search, setSearch, filter, setFilter, filtered };
}

export default useVoterLog;
