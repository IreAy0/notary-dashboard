import React from 'react';
import MyLockerTable from 'container/MyLocker';
import styles from '../MyRequest/request.module.scss';
// import Dashboard from '../../layouts/dashboard';
import Dashboard from '../../dashboard/SidebarLayout/index';

const Locker = () => (
  <Dashboard>
    <section className="pt-1">
      <div className={styles.request_container}>
        <MyLockerTable />
      </div>
    </section>
  </Dashboard>
);

export default Locker;
