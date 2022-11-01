import React from 'react';
import { Switch } from '@headlessui/react';
import classnames from 'classnames';
import styles from './toggle.module.scss';

export interface ToggleProps {
  label: string;
  disabled?: boolean;
  enabled: boolean;
  setEnabled: any;
}

const Toggle = ({ label, disabled, enabled, setEnabled }: ToggleProps) => (
  <div className={classnames(styles.toggle__wrapper)}>
    <div className={`${disabled ? styles.disabled : ''} ${styles.toggle_label}`}>{label}</div>

    <Switch
      checked={enabled}
      disabled={disabled}
      onChange={setEnabled}
      className={`${styles.toggle} ${enabled ? styles.toggle_active : styles.toggle_inactive} ${disabled ? styles.toggle_disabled : ''}`}
    >
      <span aria-hidden="true" className={`${enabled ? styles.active : styles.inactive} ${styles.toggle__switch}`} />
    </Switch>
  </div>
);

Toggle.defaultProps = {
  disabled: false
}
export default Toggle;


