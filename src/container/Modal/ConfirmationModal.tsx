import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button';
import styles from './confirmationmodal.module.scss';

interface Props {
  action: () => void;
  isOpen: boolean;
  isClose: () => void;
  buttonCaption: string;
}

const ConfirmationModal = ({ action, isOpen, isClose, buttonCaption }: Props) => {
  const [loading, setLoading] = useState(false);
  const toggleText = buttonCaption.toLowerCase().includes('reject') ? 'reject' : 'accept';
  
  return (
    <Modal isOpen={isOpen} isClose={isClose}>
      <div className={styles.container}>
        <h3 className={styles.container__header}>Confirm Action</h3>
        <p className={styles.container__caption}>
          Are you sure you want to {buttonCaption.toLowerCase().includes('cancel') ? 'cancel' : toggleText } this session?
        </p>
        <div className="flex flex__center pt-2">
          <Button
            loading={loading}
            onClick={() => {
              action();
              setLoading(true);
            }}
            type="submit"
            theme="primary"
          >
            {buttonCaption}
          </Button>
          <Button className="ml-1" theme="secondary" onClick={isClose}>
            <span className="text--red">Close</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
