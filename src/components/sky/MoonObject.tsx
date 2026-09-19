import React from 'react';
import { useSky } from '../../context/SkyContext';
<<<<<<< HEAD

export const MoonObject: React.FC = () => {
  const { setActiveModal } = useSky();
=======
import { CodeMoon } from './CodeMoon';

export const MoonObject: React.FC = () => {
  const { openMoon, isMoonOpened } = useSky();
>>>>>>> origin/main

  return (
    <div
      className="moon-wrapper simple-moon-interactive"
      style={{
        position: 'absolute',
        left: '52%',
        top: '18%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 20
      }}
      onClick={(e) => {
        e.stopPropagation();
<<<<<<< HEAD
        setActiveModal('moon-message');
      }}
      title="The Moon"
    >
      <img
        src="/Screenshot_2026-09-02_191319-removebg-preview.png"
        alt="Moon"
        className="moon-supplied-image"
        draggable={false}
      />
      <div className="moon-ambient-halo" />
=======
        openMoon();
      }}
      title="The Moon"
    >
      <CodeMoon size={155} unopened={!isMoonOpened} />
>>>>>>> origin/main
    </div>
  );
};
