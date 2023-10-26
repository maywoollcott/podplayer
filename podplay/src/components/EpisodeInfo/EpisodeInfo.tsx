import React from 'react';
import { episodeI } from '../../types';
import './EpisodeInfo.css';

interface EpisodeInfoI {
  episodeNumber: number;
  episode: episodeI;
}
export const EpisodeInfo: React.FC<EpisodeInfoI> = ({
  episodeNumber,
  episode,
}) => {
  return (
    <div className='episodeDetailsContainer'>
      <p>Episode {episodeNumber}:</p>
      <h1 className='episodeTitle'>{episode.name}</h1>
    </div>
  );
};
