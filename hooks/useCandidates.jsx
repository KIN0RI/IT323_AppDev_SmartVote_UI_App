import { useEffect, useState } from 'react';
import api from '../api';

function useCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');

  useEffect(() => {
    api.get('/candidates/')
      .then((res) => setCandidates(res.data))
      .catch(() => setError('Failed to load candidates.'))
      .finally(() => setLoading(false));
  }, []);

  const addCandidate = async (data) => {
    const res = await api.post('/candidates/', data);
    setCandidates((prev) => [...prev, res.data]);
  };

  const updateCandidate = async (id, data) => {
    const res = await api.put(`/candidates/${id}/`, data);
    setCandidates((prev) => prev.map((c) => (c.id === id ? res.data : c)));
  };

  const deleteCandidate = async (id) => {
    await api.delete(`/candidates/${id}/`);
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  return { candidates, loading, error, addCandidate, updateCandidate, deleteCandidate };
}

export default useCandidates;