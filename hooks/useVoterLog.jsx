import { useEffect, useState } from 'react';
import api from '../api';

function useVoterLog() {
  const [logs,    setLogs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [filter,  setFilter]  = useState('All');

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (filter !== 'All') params.status = filter;
    setLoading(true);
    api.get('/voter-log/', { params })
      .then((res) => setLogs(res.data))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [search, filter]);

  // Map backend fields to what voter-log.jsx expects
  const filtered = logs.map((item) => ({
    ...item,
    studentId: item.student_id,
    loginTime: item.login_time
      ? new Date(item.login_time).toLocaleTimeString()
      : 'Not logged in yet',
  }));

  return { search, setSearch, filter, setFilter, filtered, loading };
}

export default useVoterLog;
