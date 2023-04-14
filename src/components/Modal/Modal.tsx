/* eslint-disable react/react-in-jsx-scope */
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Dialog } from '@headlessui/react';
import styles from './Modal.module.scss';


export interface Props {
  children: ReactNode;
  isOpen: boolean;
  isClose: any;
  width?: number;
  height?: number;
  minWidth?: number;
  floatRight?: boolean;
  size?: any;
  
}

const Modal = ({ children, isOpen, isClose, width, height, floatRight, size, minWidth }: Props) => (
  <Dialog open={isOpen} onClose={isClose} className={classNames(floatRight ? styles.modal2 : styles.modal)}>
   
    <div
      className={classNames(floatRight ? styles.modal__content2 : styles.modal__content, styles[size])}
      style={{ width: `${width}px`, minHeight: `${height}px`, minWidth: `${minWidth}px` }}
    >

      <Dialog.Overlay className="" />

      
      <div className="">{children}</div>
    </div>
  </Dialog>
);

Modal.defaultProps = {
  floatRight: false,
  width: ' ',
  height: 300,
  minWidth: 400,
  size: 1
};

export default Modal;

