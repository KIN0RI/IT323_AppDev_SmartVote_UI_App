// src/hooks/useElectionSettings.jsx
// Same logic as web — handleChange adapted for React Native (no e.target)

import { useState } from 'react';

function useElectionSettings() {
  const [settings, setSettings] = useState({
    electionTitle:           'USTP Student Council Election 2026',
    startDate:               '2026-05-03',
    startTime:               '08:00',
    endDate:                 '2026-05-03',
    endTime:                 '17:00',
    status:                  'open',
    allowMultipleVotes:      false,
    requireFaceVerification: true,
  });

  const [saved, setSaved] = useState(false);

  // Called per field: handleChange('electionTitle', 'New Title')
  // or for toggles:   handleChange('requireFaceVerification', true)
  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleToggleStatus = () => {
    setSettings((prev) => ({
      ...prev,
      status: prev.status === 'open' ? 'closed' : 'open',
    }));
  };

  return { settings, saved, handleChange, handleSave, handleToggleStatus };
}

export default useElectionSettings;
