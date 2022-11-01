import React from 'react';
import classnames from 'classnames';
import Header from 'components/Header';
import styles from './layouts.module.scss';

interface Props {
  children: any;
  teamSignUp?: boolean;
}

const Layout = ({ children, teamSignUp }: Props) => (
  <main className={classnames(styles.main__layout, styles.auth)}>
    <section className={classnames(styles.main__page, styles.alt)}>
      <Header teamSignUp={teamSignUp} />
      <div className={classnames(styles.main__content, styles.auth)}>{children}</div>
    </section>
  </main>
);

Layout.defaultProps = {
  teamSignUp: false
};

export default Layout;
