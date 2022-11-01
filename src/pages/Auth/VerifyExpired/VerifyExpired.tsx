import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styles from 'container/authForm/VerifyExpired.module.scss';
import style from '../../../container/authForm/sign.module.scss';

const VerifyExpired: FC = () => {
  const history = useHistory()

  return (
    <div className={style.auth_image_wrapper}>
            <div className={styles.verifyContainerWrapper}>
                <div className={styles.verifyExpiredWrapper}>
                    <div>
                        <p className={styles.verifyExpiredTitle}>Email verification link expired</p>
                        <p className={styles.verifyExpiredText}>
                            Looks like the verification link has expired. Not to worry, we have sent another one to your email.
                        </p>
                        <button onClick={() => history.push('../../auth/sign-in')}>Log in</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default VerifyExpired;
