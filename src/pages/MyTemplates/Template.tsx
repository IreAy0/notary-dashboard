import React from 'react';
import MyTemplateTable from 'container/MyTemplate';
// import MyLockerTable from 'container/MyLocker';
import styles from '../MyRequest/request.module.scss';
// import Dashboard from '../../layouts/dashboard';
import Dashboard from '../../dashboard/SidebarLayout/index';

const Templates = () => (
  <Dashboard>
    <section className="pt-1">
      <div className={styles.request_container}>
        <MyTemplateTable />
      </div>
    </section>
  </Dashboard>
);

export default Templates;
