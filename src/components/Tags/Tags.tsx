import React, { HTMLAttributes } from 'react';
import styles from './Tags.module.scss';
import { ReactComponent as TagsCloseIcon } from '../../assets/icons/tagsCloseIcon.svg';

export interface ITagsProps extends HTMLAttributes<HTMLButtonElement> {
  theme: string;
}

export const Tags = ({ children, ...props }: ITagsProps) => (
  <button type="button" className={styles.tagsWrapper} {...props}>
    <p className={styles.tagsTitle}>{children}</p>
    <span className={styles.TagsIconWrapper}>
      <TagsCloseIcon />
    </span>
  </button>
);
