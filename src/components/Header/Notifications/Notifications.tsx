import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import Tabs from 'components/Tabs';
import AllNotifications from './AllNotifications';
import styles from '../../Modal/Modal.module.scss';

const tabsContent = [
  {
    label: 'Notifications'
  }
];

export interface Props {
  isOpen: boolean;
  isClose: () => void;
}

const Notifications = ({ isOpen, isClose }: Props) => {
  const [activeTabContent, setActiveTabContent] = useState(tabsContent[0]);

  return (
    <Modal isOpen={isOpen} isClose={isClose} width={463} height={272} floatRight>
      <div className={styles.container}>
        <div className={styles.header}>
          <Tabs type="horizontal" setActive={(tab) => setActiveTabContent(tab)} tabs={tabsContent} active={activeTabContent} />
          <button className={styles.close_modal} onClick={isClose}>
            &times;
          </button>
        </div>

        {activeTabContent.label === 'Notifications' && <AllNotifications />}
      </div>
    </Modal>
  );
};

export default Notifications;
