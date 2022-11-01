import React from 'react';
import classNames from 'classnames';
import styles from './avatar.module.scss';

interface Props {
  name: string;
  url?: string;
  withInidicator?: boolean;
  className?: string;
}

const Avatar = ({ name, url, withInidicator, className }: Props) => (
  <span title={name} className={classNames(className, 'flex')}>
    {url && <img className={styles.avatar__thumbs} src={url} alt="Avatar" />}
    {name && !url && (
      <span className={classNames(styles.avatar__placeholder, withInidicator && styles.dot, 'text--capitalize')}>
        {name.split(' ')[0].charAt(0).toUpperCase()}
        {name.split(' ')[1]?.charAt(0).toUpperCase()}
      </span>
    )}
  </span>
);

Avatar.defaultProps = {
  url: '',
  withInidicator: false,
  className: ''
};

export default Avatar;
