import { router } from 'expo-router';
import { useState } from 'react';
import useCandidates from './useCandidates';

const positions = [
  'President',
  'Vice President',
  'Secretary',
  'Treasurer',
  'Auditor',
];

function useVote() {
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
      // Pass votes as JSON string — expo-router params must be strings
      router.push({
        pathname: '/vote-analysis',
        params: { votes: JSON.stringify(newChoices) },
      });
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