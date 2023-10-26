import React, { MouseEvent, useRef } from 'react';
import './ProgressBar.css';

interface ProgressBarI {
  currentTimeStamp: number;
  endingTimeStamp: number;
  jumpToTime: (time: number) => void;
  disabled: boolean;
}

export const ProgressBar: React.FC<ProgressBarI> = ({
  currentTimeStamp,
  endingTimeStamp,
  jumpToTime,
  disabled,
}) => {
  const bar = useRef<HTMLDivElement | null>(null);

  const formatSeconds = (seconds: number) => {
    const formattedTime = new Date(seconds * 1000)
      .toISOString()
      .substring(14, 19);
    return formattedTime;
  };

  const onProgressBarClickHandler = (e: MouseEvent) => {
    const barPosition = bar.current?.getBoundingClientRect();
    const clickPositon = e.pageX;

    if (barPosition && !disabled) {
      const clickPercentage = (clickPositon - barPosition?.left) / 550;
      jumpToTime(clickPercentage * endingTimeStamp);
    }
  };

  return (
    <div className='progressBarContainer'>
      <div
        className={disabled ? 'progressBarMain' : 'progressBarMain clickable'}
        onClick={(e) => onProgressBarClickHandler(e)}
        ref={bar}
      >
        <div
          className='progressBarCurrent'
          style={{
            width: (currentTimeStamp / endingTimeStamp) * 550,
          }}
        ></div>
      </div>
      <div className='timeStampContainer'>
        <p className='timeStamp'>{formatSeconds(currentTimeStamp)}</p>
        <p className='timeStamp'>{formatSeconds(endingTimeStamp)}</p>
      </div>
    </div>
  );
};
