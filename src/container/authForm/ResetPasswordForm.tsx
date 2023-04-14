import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TonoteLogo from 'assets/icons/blue-tonote-logo.svg';
import { useFormik } from 'formik';
import { Input } from 'components/TextInput/TextInput';
import Button from 'components/Button';
import history from 'utils/history';
import { doResetPassword } from 're-ducks/auth';
import styles from './sign.module.scss';

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // const getId = location.search;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        doResetPassword(
          { 
            // password: values.password, id: getId 
            "email": params.email,
            "token": params.hash,
            "password": values.password,
            "password_confirmation": values.confirm_password
          },
          () => {
            history.push('../../auth/sign-in');
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  });

  const validationsPassed = () =>
    /[A-Za-z0-9@$*#!%^]{8,}/giu.test(formik.values.password) &&
    /[A-Z]+/g.test(formik.values.password) &&
    /[a-z]+/g.test(formik.values.password) &&
    /[0-9]+/giu.test(formik.values.password) &&
    formik.values.password === formik.values.confirm_password &&
    formik.values.password &&
    formik.values.confirm_password;

  return (
    <div className={styles.auth_wrapper}>
      <div className={styles.auth_wrapper__content1}>
        <img className={styles.auth_wrapper__image} src={TonoteLogo} alt="" />
        <h1 className={styles.auth_wrapper__title}>Reset Password</h1>
        <p className={styles.auth_wrapper__details}>Reset your password to proceed</p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div>
            <Input
              placeholder="********"
              label="Password"
              name="password"
              type="password"
              id="SetPassword_Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div>
            <Input
              placeholder="*********"
              label="Confirm password"
              name="confirm_password"
              type="password"
              id="SetPassword_ConfirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
            />
          </div>
          <ul>
            <li className="atom_dib">
              <ul className="hint">
                <li className={`${/[A-Za-z0-9@$*#!%^]{8,}/giu.test(formik.values.password) ? 'text--green' : 'text--red'}`}>
                  At least 8 characters
                </li>
                <li className={`${/[A-Z]+/g.test(formik.values.password) ? 'text--green' : 'text--red'}`}>At least 1 capital letter</li>
                <li className={`${/[a-z]+/g.test(formik.values.password) ? 'text--green' : 'text--red'}`}>At least 1 small letter</li>
                <li className={`${/[0-9]+/giu.test(formik.values.password) ? 'text--green' : 'text--red'}`}>At least 1 number</li>
                <li
                  className={`${
                    formik.values.password === formik.values.confirm_password && formik.values.password && formik.values.confirm_password
                      ? 'text--green'
                      : 'text--red'
                  }`}
                >
                  Passwords match
                </li>
              </ul>
            </li>
          </ul>

          <div className={styles.form}>
            <Button
              theme="primary"
              wide
              type="submit"
              disabled={!formik.isValid || !formik.dirty || !validationsPassed()}
              loading={loading}
            >
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

