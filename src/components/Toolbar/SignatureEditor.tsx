import React, { useState } from 'react';
import { ReactComponent as BlueTick } from 'assets/icons/blueTick.svg';

interface Props {
  clear: () => void;
  setCurrentColor: (color: string) => void;
  hideButton?: boolean;
}

const Controller = ({ clear, setCurrentColor, hideButton }: Props) => {
  const [color, setColor] = useState<string>('#363740');

  const toggleColor = (value: string) => {
    setColor(value);
    setCurrentColor(value);
  };

  return (
    <div className="signature__controller flex flex__space-center">
      <div className="flex">
        <button
          title="Switch to blue ink"
          className={`dot__blue${color === '#003bb3' ? ' active' : ''}`}
          onClick={() => toggleColor('#003bb3')}
        >
          {' '}
        </button>
        &nbsp;
        <button
          title="Switch to black ink"
          className={`dot__black${color === '#363740' ? ' active' : ''}`}
          onClick={() => toggleColor('#363740')}
        >
          {' '}
        </button>
      </div>

      {hideButton ? (
        <div />
      ) : (
        <button className="flex flex__space-center" onClick={() => clear()}>
          <BlueTick />
          &nbsp;
          <span className="text--underline">Clear</span>
        </button>
      )}
    </div>
  );
};

Controller.defaultProps = {
  hideButton: false
};

export default Controller;

