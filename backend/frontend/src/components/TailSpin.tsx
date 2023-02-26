import React from 'react';
import { TailSpin } from 'react-loader-spinner';

interface ILoaderAppFixed {
  height?: number;
  width?: number;
}

export const TailSpinFixed = ({ height = 50, width = 50 }: ILoaderAppFixed) => {
  return (
    <div style={{ alignSelf: 'center', padding: '2em' }}>
      <TailSpin color="#91a0db" height={height} width={width} />
    </div>
  );
};
