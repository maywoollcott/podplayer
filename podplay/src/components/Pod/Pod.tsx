import React from 'react';
import { BiFastForward, BiRewind, BiPlay, BiPause } from 'react-icons/bi';
import './Pod.css';
import { markerI } from '../../types';

interface PodI {
  podColor: string;
  onPlay: () => void;
  onPause: () => void;
  onFastForward: () => void;
  onRewind: () => void;
  isPlaying: boolean;
  currentMarker: markerI | null;
  fastForwardDisabled: boolean;
}

export const Pod: React.FC<PodI> = ({
  podColor,
  onPlay,
  onPause,
  onFastForward,
  onRewind,
  isPlaying,
  currentMarker,
  fastForwardDisabled,
}) => {
  const openInNewTab = (url: string | undefined): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  let screenDisplay;

  if (currentMarker?.type === 'ad') {
    screenDisplay = (
      <div
        className='screen'
        style={{
          backgroundColor: getComputedStyle(document.body).getPropertyValue(
            '--darkGray'
          ),
        }}
      >
        <div
          className='screenBlurb clickableBlurb'
          onClick={() => openInNewTab(currentMarker.link)}
        >
          <p className='blurbText'>{currentMarker.content}</p>
        </div>
      </div>
    );
  } else if (currentMarker?.type === 'text') {
    screenDisplay = (
      <div
        className='screen'
        style={{
          backgroundColor: getComputedStyle(document.body).getPropertyValue(
            '--darkGray'
          ),
        }}
      >
        <p className='screenText'>{currentMarker.content}</p>
      </div>
    );
  } else if (currentMarker?.type === 'image') {
    screenDisplay = (
      <div className='screen'>
        <img
          src={currentMarker.content}
          alt='marker'
          style={{ width: '100%' }}
        />
      </div>
    );
  } else {
    screenDisplay = <div className='screen'></div>;
  }

  return (
    <div
      className='pod'
      style={{
        backgroundColor: getComputedStyle(document.body).getPropertyValue(
          podColor
        ),
      }}
    >
      {screenDisplay}
      <div className='buttonPad'>
        <p className='padLogo'>podplay</p>
        <button
          className={
            fastForwardDisabled
              ? 'disabledForwardButton'
              : 'forwardButton button'
          }
          onClick={onFastForward}
        >
          <BiFastForward size={45} />
        </button>
        <button className='rewindButton button' onClick={onRewind}>
          <BiRewind size={45} />
        </button>
        {isPlaying ? (
          <button className='pauseButton button' onClick={onPause}>
            <BiPause size={44} />
          </button>
        ) : (
          <button className='playButton button' onClick={onPlay}>
            <BiPlay size={35} />
          </button>
        )}
      </div>
    </div>
  );
};
