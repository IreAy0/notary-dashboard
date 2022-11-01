import React, { FC } from 'react';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button';
import styles from '../settings.module.scss';

interface Props {
  isOpen: boolean;
  isClose: () => void;
  onPopulateClick: () => void;
}
const ConfirmPopulationModal: FC<Props> = ({ isOpen, isClose, onPopulateClick }: Props) => (
  <Modal isOpen={isOpen} isClose={isClose}>
    <div className={styles.modalContainer}>
      <h3 className={styles.modalContainer__header}>Confirm Action</h3>
      <p className={styles.modalContainer__caption}>
        Pls confirm that all available days have been selected before populating for other months?
      </p>
      <div className={styles.modalContainer__btn}>
        <Button type="submit" theme="primary" onClick={onPopulateClick}>
          Populate
        </Button>
        <Button theme="primary" onClick={isClose}>
          Cancel
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmPopulationModal;

