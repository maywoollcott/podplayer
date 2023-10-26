import React from 'react';
import './Colorbar.css';

interface ColorbarI {
  setPodColor: React.Dispatch<React.SetStateAction<string>>;
}

export const Colorbar: React.FC<ColorbarI> = ({ setPodColor }) => {
  return (
    <div className='colorbarContainer'>
      <button
        className='colorButton'
        style={{
          backgroundColor: getComputedStyle(document.body).getPropertyValue(
            '--lightGray'
          ),
        }}
        onClick={() => setPodColor('--lightGray')}
      />
      <button
        className='colorButton'
        style={{
          backgroundColor: getComputedStyle(document.body).getPropertyValue(
            '--purple'
          ),
        }}
        onClick={() => setPodColor('--purple')}
      />
      <button
        className='colorButton'
        style={{
          backgroundColor: getComputedStyle(document.body).getPropertyValue(
            '--blue'
          ),
        }}
        onClick={() => setPodColor('--blue')}
      />
      <button
        className='colorButton'
        style={{
          backgroundColor: getComputedStyle(document.body).getPropertyValue(
            '--green'
          ),
        }}
        onClick={() => setPodColor('--green')}
      />
    </div>
  );
};
