import { router } from 'expo-router';
import { useState } from 'react';
import api from '../api';
import useCandidates from './useCandidates';

const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'];

function useVote() {
  const { candidates, loading }     = useCandidates();
  const [step,        setStep]      = useState(0);
  const [selections,  setSelections] = useState([]);
  const [reviewing,   setReviewing]  = useState(false);
  const [submitting,  setSubmitting] = useState(false);
  const [voteError,   setVoteError]  = useState('');

  const currentPosition   = positions[step];
  const currentCandidates = candidates.filter((c) => c.position === currentPosition);
  const currentSelection  = selections.find((s) => s.position === currentPosition);

  const handleSelect = (candidateId) => {
    const chosen = candidates.find((c) => c.id === candidateId);
    if (!chosen) return;
    setVoteError('');
    const updated = [
      ...selections.filter((s) => s.position !== chosen.position),
      { position: chosen.position, candidateId: chosen.id, candidateName: chosen.name },
    ];
    setSelections(updated);
    const nextStep = step + 1;
    if (nextStep >= positions.length) {
      setReviewing(true);
    } else {
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    if (reviewing) {
      setReviewing(false);
      setStep(positions.length - 1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    setVoteError('');
    try {
      for (const sel of selections) {
        try {
          await api.post('/vote/', { candidate: sel.candidateId });
        } catch (err) {
          const msg = err.response?.data?.non_field_errors?.[0] || '';
          if (msg.toLowerCase().includes('already voted')) continue;
          throw err;
        }
      }
      router.push({
        pathname: '/vote-analysis',
        params: { votes: JSON.stringify(selections), fromVote: 'true' },
      });
    } catch (err) {
      setVoteError(
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        'Failed to submit votes. Please try again.'
      );
      setSubmitting(false);
    }
  };

  return {
    step, positions, currentPosition,
    currentCandidates, currentSelection, selections,
    loading, voteError, reviewing, submitting,
    handleSelect, handleBack, handleConfirm,
  };
}

export default useVote;