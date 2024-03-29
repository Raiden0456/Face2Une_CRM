import React from 'react';
import classNames from 'classnames'

import s from './Container.scss';

interface IContainer {
  width?: string;
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  header?: React.ReactNode;
  content?: React.ReactNode;
  bottom?: React.ReactNode;
  fullPage?: boolean;
  centeredContent?: boolean;
  mobile?: boolean;
  background?: 'grey' | 'white';
}

const colors = {
  grey: '#F2F2F7',
  white: '#FFFFFF',
};

// Optional background container
export const Container: React.FC<IContainer> = ({
  fullPage = false,
  centeredContent = false,
  content,
  width,
  className,
  header,
  bottom,
  mobile,
  background,
}) => {
  return (
    <div style={{ maxWidth: width, width }} className={s.Container}>
      {header && (
        <div className={classNames(s.Container__header, mobile && fullPage && s.Container__headerHide)}>{header}</div>
      )}
      {content && (
        <div
          style={{ backgroundColor: colors[background || 'white'] }}
          className={classNames(s.Container__box, mobile && fullPage && s.Container__boxFull, centeredContent && s.Container__box_centered)}
        >
          <div className={classNames(s.Container__content, className)}>{content}</div>
          <div className={classNames(s.Container__bottom, className)}>{bottom}</div>
        </div>
      )}
    </div>
  );
};
