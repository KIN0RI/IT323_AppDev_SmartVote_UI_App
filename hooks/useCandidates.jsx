// src/hooks/useCandidates.jsx
// Same logic as web project — only localStorage removed (not needed here)

import { useState } from 'react';

const initialCandidates = [
  { id: 1,  name: 'Ronald Yu',                position: 'President',      votes: 320 },
  { id: 2,  name: 'Vhon Salilo',              position: 'President',      votes: 280 },
  { id: 3,  name: 'Dan Ivan Labin',           position: 'Vice President', votes: 260 },
  { id: 4,  name: 'Christian Paul Bahian',    position: 'Vice President', votes: 200 },
  { id: 5,  name: 'Nepthalie Brynt Asinero', position: 'Secretary',      votes: 180 },
  { id: 6,  name: 'Dan Ronald Salilo',        position: 'Secretary',      votes: 150 },
  { id: 7,  name: 'Christian Ivan Yu',        position: 'Treasurer',      votes: 145 },
  { id: 8,  name: 'Ronald Paul Asinero',      position: 'Treasurer',      votes: 130 },
  { id: 9,  name: 'Vhon Brynt Labin',         position: 'Auditor',        votes: 120 },
  { id: 10, name: 'Dan Angelico Bahian',      position: 'Auditor',        votes: 110 },
];

function useCandidates() {
  const [candidates, setCandidates] = useState(initialCandidates);

  const castVote = (candidateId) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
      )
    );
  };

  return { candidates, castVote };
}

export default useCandidates;
