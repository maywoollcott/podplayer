import React, { useEffect, useState, useRef, Fragment } from 'react';
import './ListenPage.css';
import {
  Pod,
  Colorbar,
  ProgressBar,
  EpisodeInfo,
  Modal,
  Navbar,
} from '../../components/index';
import { apiService } from '../../api/apiService';
import { episodeI, markerI } from '../../types';

export const ListenPage = () => {
  const [podColor, setPodColor] = useState('--lightGray');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [episodes, setEpisodes] = useState<episodeI[]>([]);

  const [duration, setDuration] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<markerI | null>(null);
  const [fastForwardDisabled, setFastForwardDisabled] = useState(false);

  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodes = await apiService.getAllEpisodes();
      if (episodes) {
        setEpisodes(episodes);
      }
    };

    fetchEpisodes();
  }, []);

  useEffect(() => {
    setCurrentTime(0);
  }, [currentEpisode]);

  useEffect(() => {
    if (isPlaying) {
      episodes[currentEpisode].markers.forEach((marker) => {
        let markerEnd = marker.start + marker.duration;

        if (
          currentTime >= marker.start &&
          currentTime < markerEnd &&
          JSON.stringify(currentMarker) !== JSON.stringify(marker)
        ) {
          setCurrentMarker(marker);

          if (marker.type === 'ad') {
            setFastForwardDisabled(true);
          }
        }

        if (
          Math.floor(currentTime) >= markerEnd &&
          JSON.stringify(currentMarker) === JSON.stringify(marker)
        ) {
          setCurrentMarker(null);
          setFastForwardDisabled(false);
        }

        if (
          Math.floor(currentTime) < marker.start &&
          JSON.stringify(currentMarker) === JSON.stringify(marker)
        ) {
          setCurrentMarker(null);
          setFastForwardDisabled(false);
        }
      });
    }
  }, [currentTime, episodes, isPlaying, currentMarker, currentEpisode]);

  const onPlay = () => {
    if (audio.current) {
      audio.current.play();
    }
  };

  const onPause = () => {
    if (audio.current) {
      audio.current.pause();
    }
  };

  const onFastForward = () => {
    if (audio.current && !fastForwardDisabled) {
      audio.current.currentTime = audio.current.currentTime + 5;
    }
  };

  const onRewind = () => {
    if (audio.current) {
      audio.current.currentTime = audio.current.currentTime - 5;
    }
  };

  const onTimeUpdateHandler = () => {
    const currentTime = audio.current?.currentTime;
    if (currentTime) {
      setCurrentTime(currentTime);
    }
    setIsPlaying(!audio.current?.paused);
  };

  const onLoadMetadataHandler = () => {
    const duration = audio.current?.duration;
    if (duration) {
      setDuration(duration);
    }
  };

  const jumpToTime = (time: number) => {
    console.log('jump to time');
    if (audio.current) {
      audio.current.currentTime = time;
    }
  };

  return (
    <div className='pageContainer'>
      <Navbar />
      {modalIsOpen && <div className='modalBackgroundFilter'></div>}
      <div className='listenMainContentContainer'>
        {episodes.length && (
          <Fragment>
            <div className='rowContainer'>
              <div className='episodeInfoContainer'>
                <EpisodeInfo
                  episodeNumber={currentEpisode + 1}
                  episode={episodes[currentEpisode]}
                />
                <button
                  onClick={() => setModalIsOpen(true)}
                  className='allEpisodesButton'
                >
                  All Episodes
                </button>
              </div>
              <div className='podContainer'>
                <Pod
                  podColor={podColor}
                  onPlay={onPlay}
                  onPause={onPause}
                  onFastForward={onFastForward}
                  onRewind={onRewind}
                  isPlaying={isPlaying}
                  currentMarker={currentMarker}
                  fastForwardDisabled={fastForwardDisabled}
                />
              </div>
              <Colorbar setPodColor={setPodColor} />
            </div>
            <ProgressBar
              currentTimeStamp={currentTime}
              endingTimeStamp={duration}
              jumpToTime={jumpToTime}
              disabled={fastForwardDisabled}
            />
          </Fragment>
        )}
        {modalIsOpen && (
          <div className='modalContainer'>
            <Modal
              episodes={episodes}
              onClose={setModalIsOpen}
              setEpisode={setCurrentEpisode}
            />
          </div>
        )}
        <audio
          src={episodes[currentEpisode]?.audio}
          ref={audio}
          onTimeUpdate={onTimeUpdateHandler}
          onLoadedMetadata={onLoadMetadataHandler}
        />
      </div>
    </div>
  );
};
