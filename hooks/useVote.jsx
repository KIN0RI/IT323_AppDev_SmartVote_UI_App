// src/hooks/useVote.jsx
// Same logic as web — useNavigate replaced with useNavigation

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useCandidates from './useCandidates';

const positions = [
  'President',
  'Vice President',
  'Secretary',
  'Treasurer',
  'Auditor',
];

function useVote() {
  const navigation = useNavigation();
  const { candidates, castVote } = useCandidates();
  const [step, setStep] = useState(0);
  const [votedChoices, setVotedChoices] = useState([]);

  const currentPosition = positions[step];
  const currentCandidates = candidates.filter(
    (c) => c.position === currentPosition
  );

  const handleVote = (candidateId) => {
    const chosen = candidates.find((c) => c.id === candidateId);
    if (!chosen) return;
    castVote(candidateId);
    const newChoices = [
      ...votedChoices,
      { position: chosen.position, candidateName: chosen.name },
    ];
    setVotedChoices(newChoices);
    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep >= positions.length) {
      // Same screen name as web route /VoteAnalysis
      navigation.navigate('VoteAnalysis', { votes: newChoices });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setVotedChoices((prev) => prev.slice(0, -1));
      setStep(step - 1);
    }
  };

  return {
    step,
    positions,
    currentPosition,
    currentCandidates,
    handleVote,
    handleBack,
  };
}

export default useVote;
