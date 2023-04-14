import React from 'react';
import Button from 'components/Button';
import styles from './confirmationmodal.module.scss';
import Modal from '../../components/Modal/Modal';

const AcceptModal = ({ action, isOpen, isClose, buttonCaption }: any) => (
  <Modal isOpen={isOpen} isClose={isClose}>
    <div className={styles.container}>
      <h3 className={styles.container__header}>Confirm Action</h3>
      <p className={styles.container__caption}>Are you sure you want to {action} this session?</p>
      <div className={styles.container__btn}>
        <Button type="submit" theme="primary">
          {buttonCaption}
        </Button>
        <Button theme="primary" onClick={isClose}>
          Cancel
        </Button>
      </div>
    </div>
  </Modal>
);

export default AcceptModal;
