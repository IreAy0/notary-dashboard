import React from 'react';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button';
import styles from './confirmationmodal.module.scss';

interface Props {
  onClick: () => void;
  isOpen: boolean;
  isClose: () => void;
}

const ResetSessionModal = ({ onClick, isOpen, isClose }: Props) => (
  <Modal isOpen={isOpen} isClose={isClose} width={400}>
    <div className={styles.container}>
      <h3 className={styles.container__header}>Confirm Action</h3>
      <p className={styles.container__caption}>Are you sure you want to reset this notary session?</p>
      <div className="flex flex__center pt-2">
        <Button className="ml-1 mr-2" theme="secondary" onClick={isClose} height={50} width={200}>
          <span className="text--red">Close</span>
        </Button>
        <Button onClick={onClick} type="submit" theme="primary" height={50} width={200}>
          Confirm
        </Button>
      </div>
    </div>
  </Modal>
);

export default ResetSessionModal;

