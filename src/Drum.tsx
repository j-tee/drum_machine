import React, { useEffect, useCallback } from 'react';
import { AudioClip } from './types';

interface DrumProps {
  audioClip: AudioClip;
  updateDisplay: (text: string) => void;
}

const Drum: React.FC<DrumProps> = ({ audioClip, updateDisplay }) => {

  const playSound = useCallback(() => {
    const audioElement = document.getElementById(audioClip.keyTrigger) as HTMLAudioElement;
    if (audioElement) {
      audioElement.currentTime = 0; // Reset the audio clip to the start
      audioElement.play();
      updateDisplay(audioClip.description); // Update the display with the clip description
    }
  }, [audioClip, updateDisplay]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key.toUpperCase() === audioClip.keyTrigger) {
      playSound();
    }
  }, [audioClip.keyTrigger, playSound]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <button 
      className="drum-pad" 
      id={`drum-${audioClip.keyTrigger}`}
      onClick={playSound}
    >
      <audio src={audioClip.url} className="clip" id={audioClip.keyTrigger}></audio>
      {audioClip.keyTrigger}
    </button>
  );
};

export default Drum;
