import React from 'react';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button';
import CustomTemplateUpload from 'components/Upload/customDocumentUpload';
import styles from './confirmationmodal.module.scss';

interface Props {
  // onClick: () => void;
  isOpen: boolean;
  isClose: () => void;
  updateDom: () => void
}

const UploadDocumentModal = ({ isOpen, isClose, updateDom }: Props) => (
  <Modal isOpen={isOpen} isClose={isClose}>
    
    <div className={styles.container}>
     <CustomTemplateUpload updateDom={updateDom} isClose={isClose} maxFilesize={2} fileRule=" " label='Upload Document' placeholder='Please click here to upload template document'/>
      {/* <div className="flex flex__center pt-2">
        <Button className="ml-1 mr-2" theme="secondary" onClick={isClose} height={50} width={200}>
          <span className="text--red">Close</span>
        </Button>
        <Button type="submit" theme="primary" height={50} width={200}>
          Confirm
        </Button>
      </div> */}
    </div>
  </Modal>
);

export default UploadDocumentModal;
