import { useEffect, useState } from 'react';
import api from '../api';

function useElectionSettings() {
  const [settings, setSettings] = useState({
    electionTitle:           '',
    startDate:               '',
    startTime:               '',
    endDate:                 '',
    endTime:                 '',
    status:                  'upcoming',
    allowMultipleVotes:      false,
    requireFaceVerification: true,
  });
  const [saved,    setSaved]   = useState(false);
  const [loading,  setLoading] = useState(true);

  useEffect(() => {
    api.get('/election-settings/')
      .then((res) => {
        const d = res.data;
        setSettings({
          electionTitle:           d.title || '',
          startDate:               d.start_date ? d.start_date.slice(0, 10) : '',
          startTime:               d.start_date ? d.start_date.slice(11, 16) : '',
          endDate:                 d.end_date   ? d.end_date.slice(0, 10)   : '',
          endTime:                 d.end_date   ? d.end_date.slice(11, 16)  : '',
          status:                  d.status,
          allowMultipleVotes:      d.allow_multiple_votes,
          requireFaceVerification: d.require_face_verification,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field, value) =>
    setSettings((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    try {
      await api.put('/election-settings/', {
        title:                    settings.electionTitle,
        start_date:               `${settings.startDate}T${settings.startTime}`,
        end_date:                 `${settings.endDate}T${settings.endTime}`,
        status:                   settings.status,
        allow_multiple_votes:     settings.allowMultipleVotes,
        require_face_verification: settings.requireFaceVerification,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Failed to save settings.');
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = settings.status === 'open' ? 'closed' : 'open';
    try {
      await api.put('/election-settings/', { status: newStatus });
      setSettings((prev) => ({ ...prev, status: newStatus }));
    } catch {
      alert('Failed to update status.');
    }
  };

  return { settings, saved, loading, handleChange, handleSave, handleToggleStatus };
}

export default useElectionSettings;