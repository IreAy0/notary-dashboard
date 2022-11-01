import React from 'react';
import MyLockerTable from 'container/MyLocker';
import styles from '../MyRequest/request.module.scss';
import Dashboard from '../../layouts/dashboard';

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
