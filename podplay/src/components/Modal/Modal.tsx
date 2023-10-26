import React, { Dispatch, SetStateAction } from 'react';
import { episodeI } from '../../types';
import './Modal.css';

interface ModalI {
  onClose: Dispatch<SetStateAction<boolean>>;
  episodes: episodeI[];
  setEpisode: Dispatch<SetStateAction<number>>;
}
export const Modal: React.FC<ModalI> = ({ onClose, episodes, setEpisode }) => {
  const onEpisodeClickHandler = (index: number) => {
    setEpisode(index);
    onClose(false);
  };
  return (
    <div className='modal'>
      <button className='closeButton' onClick={() => onClose(false)}>
        x
      </button>
      <div>
        <h1 className='modalHeader'>All Episodes</h1>
        {episodes.map((episode, index) => (
          <button
            className='episodeList'
            onClick={() => onEpisodeClickHandler(index)}
            key={index}
          >
            Episode {index + 1}: {episode.name}
          </button>
        ))}
      </div>
    </div>
  );
};
