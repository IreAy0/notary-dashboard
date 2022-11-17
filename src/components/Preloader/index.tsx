import React from 'react'
import classNames from 'classnames';
import styles from './Preloader.module.scss';

function PreLoader() {
  return (
    // "lds-ellipsis"
    <div className={classNames(styles.grid)}>
 <div className={classNames(styles.lds_ellipsis)}>
    <div />
    <div />
    <div />
    <div />
  </div>
    </div>
   
  )
}

export default PreLoader;
