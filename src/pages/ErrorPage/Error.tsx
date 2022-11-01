import React from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from 'utils';
import styles from './index.module.scss';
import { ReactComponent as Error } from '../../assets/img/NotFound.svg';

const ErrorPage = () => {

  const history = useHistory()

  return (
        <div>
            <div className={classnames(styles.error)}>
                <Error />
                <div>
                    <h1 className={styles.heading}>Ooops... 404!</h1>
                    <p className={styles.paragraph}>The page you requested could not be found</p>
                    <button onClick={() => history.push('/')}>
                        <p className={styles.goBack}>{isAuthenticated() ? "Back to Dashboard" : "Back to Login"}</p>
                    </button>
                </div>
            </div>
        </div>
  )
}

export default ErrorPage;
