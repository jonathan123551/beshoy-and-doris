import { useState } from 'react';
import useLenis from './hooks/useLenis';
import Preloader from './components/Preloader';
import OpeningScene from './components/OpeningScene';
import NamesScene from './components/NamesScene';
import CeremonyScene from './components/CeremonyScene';
import ChurchEntrance from './components/ChurchEntrance';
import CelebrationTransition from './components/CelebrationTransition';
import ReceptionScene from './components/ReceptionScene';
import DateSequence from './components/DateSequence';
import Countdown from './components/Countdown';
import PhotoStory from './components/PhotoStory';
import InvitationMessage from './components/InvitationMessage';
import FinalInvitation from './components/FinalInvitation';
import FinalFrame from './components/FinalFrame';

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <OpeningScene />
        <NamesScene />
        <CeremonyScene />
        <ChurchEntrance />
        <CelebrationTransition />
        <ReceptionScene />
        <DateSequence />
        <Countdown />
        <PhotoStory />
        <InvitationMessage />
        <FinalInvitation />
        <FinalFrame />
      </main>
    </>
  );
}
