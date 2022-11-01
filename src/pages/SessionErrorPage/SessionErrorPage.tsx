import React from 'react';
import classnames from 'classnames';
import styles from 'pages/ErrorPage/index.module.scss';
import { ReactComponent as Error } from '../../assets/img/NotFound.svg';

const SessionErrorPage = () => (
    <div>
        <div className={classnames(styles.error)}>
            <Error />
            <div>
                <h1 className={styles.heading}>Ooops... 404!</h1>
                <p className={styles.paragraph}>The page you requested could not be found</p>
            </div>
        </div>
    </div>
)

export default SessionErrorPage;
