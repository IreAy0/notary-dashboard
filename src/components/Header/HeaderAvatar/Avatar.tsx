import React from 'react';
import styles from './Avatar.module.scss';
import { IHeaderAvatarProps } from './Avatar.interface';
import { ReactComponent as AvatarIcon } from '../../../assets/icons/avatarIcon.svg';

const Avatar = ({ avatar, slicedSurname, slicedName }: IHeaderAvatarProps) => (
  <div>
    {avatar === '' ? (
      <p className={styles.avatarText}>
        {slicedName}
        {slicedSurname}
      </p>
    ) : <div className={styles.avatarIconWrapper}><AvatarIcon /></div>}
  </div>
);

export default Avatar;
