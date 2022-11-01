import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './CardLoader.module.scss';

interface Props {
  type: string;
  stylings: string;
}

const PageLoader: FC<Props> = ({ type, stylings = '' }: Props) => {
  /* eslint-disable */
  const style = () => {
    if (type === 'card') {
      return classNames(stylings);
    }
  };

  return (
    <div className={`${styles[`loader__${type}`]} ${style()}`}>
      {type === 'card' ? (
        <>
          <div>
            <div className="flex flex__spaced mb-2">
              <div className={classNames(styles['shimmer'], styles['shimmer__width--3'], styles['shimmer__height--2'])} />
              <div className={classNames(styles['shimmer'], styles['shimmer__width--4'], styles['shimmer__height--2'])} />
            </div>
            <div className="flex flex__spaced">
              <div className={classNames(styles['shimmer'], styles['shimmer__width--20'], styles['shimmer__height--3'])} />
            </div>
          </div>

          <div className="flex flex__spaced">
            <div className={classNames(styles['shimmer'], styles['shimmer__width--4'], styles['shimmer__height--2'])} />
            <div className={classNames(styles['shimmer'], styles['shimmer__width--4'], styles['shimmer__height--2'])} />
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default PageLoader;
