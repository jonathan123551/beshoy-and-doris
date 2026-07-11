import { useState } from 'react';
import useLenis from './hooks/useLenis';
import EnvelopeIntro from './components/EnvelopeIntro';
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
import AtmosphericParticles from './components/GoldenParticles';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  useLenis();

  return (
    <>
      {/* Envelope intro — blocks scroll until opened */}
      {!envelopeOpened && (
        <EnvelopeIntro onOpen={() => setEnvelopeOpened(true)} />
      )}

      {/* Global visual layers — only after envelope */}
      {envelopeOpened && <AtmosphericParticles />}
      {envelopeOpened && <MusicPlayer autoStart={envelopeOpened} />}
      <div className="film-grain" />
      <div className="vignette" />

      <main
        style={{
          opacity: envelopeOpened ? 1 : 0,
          transition: 'opacity 0.8s ease',
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
