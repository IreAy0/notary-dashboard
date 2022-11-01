import React from 'react';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button';
import Session from 'assets/icons/session.svg';
import styles from './sessionmodal.module.scss';

interface Props {
  onClick: () => void;
  isOpen: boolean;
  isClose: () => void;
}

const CompleteSessionModal = ({ onClick, isOpen, isClose }: Props) => (
  <Modal isOpen={isOpen} isClose={isClose} width={400}>
    <div className={styles.session}>
      <div className={styles.session__img}>
        <img src={Session} alt="" />
      </div>

      <h2 className={styles.session__text}>Please comfirm that session is complete</h2>

      <div className={styles.session__button}>
        <Button onClick={onClick} type="submit" theme="primary" height={50}>
          YES END SESSION
        </Button>
        <Button className="mt-1" theme="grey" onClick={isClose} height={50}>
          NO RETURN TO SESSION
        </Button>
      </div>
    </div>
  </Modal>
);

export default CompleteSessionModal;

