import React from 'react';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button';
import styles from './sign.module.scss';
import Stamp from '../../assets/icons/blue_stamp.svg';

export interface Props {
  isOpen: boolean;
  isClose?: () => void;
  handleClose?: () => void;
}

const StatusModal = ({ isOpen, isClose, handleClose }: Props) => (
  <Modal isOpen={isOpen} isClose={isClose} width={100}>
    <div className={styles.modalWrapper}>
      <img src={Stamp} alt="" />
      <p className={styles.auth_caption}>ID Verified, We are working on verifying your commission number, Please check your email for the next steps.</p>
      <div className={styles.auth_wrapper__btn}>
        <Button theme="primary" onClick={handleClose} size="lg" width={150} type="submit">
          OK
        </Button>
      </div>
    </div>
  </Modal>
);

StatusModal.defaultProps = {
  isClose: null,
  handleClose: null
};

export default StatusModal;
