import React from 'react';
import loaderstyles from 'components/Table/table.module.scss';

const NotificationLoader = () => (
  <div className={`${loaderstyles.skeleton} mt-2`}>
    <div className={loaderstyles.skeleton__head} />
    <div className={loaderstyles.skeleton__head} />
    <div className={loaderstyles.skeleton__head} />
    <div className={loaderstyles.skeleton__head} />
    <div className={loaderstyles.skeleton__head} />
    <div className={loaderstyles.skeleton__head} />
    <div className={loaderstyles.skeleton__head} />
    <div className={loaderstyles.skeleton__head} />
    <div className={loaderstyles.skeleton__head} />
    <div className={loaderstyles.skeleton__head} />
  </div>
);

export default NotificationLoader;
