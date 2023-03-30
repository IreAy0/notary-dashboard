import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import TonoteLogo from 'assets/img/LSJ_logo.png';
import TonoteLogo1 from 'assets/img/background-top-stamp.svg';
import { useFormik } from 'formik';
import { Input } from 'components/TextInput/TextInput';
import Button from 'components/Button';
import history from 'utils/history';
import { doSetPassword } from 're-ducks/auth';
import styles from './sign.module.scss';

const SetPasswordForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const getToken = new URLSearchParams(search).get('token');
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        doSetPassword(
          { password: values.password, token: getToken },
          () => {
            toast.success('Password created successfully.');
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
      <div className={styles.auth_wrapper__imageContent}>
        <img className={styles.auth_wrapper__signUpImage} src={TonoteLogo1} alt="" />
        <div>
          <img className={styles.auth_wrapper__image} src={TonoteLogo} alt="" />
        </div>
        <h1 className={styles.auth_wrapper__title}>Set Password</h1>
        <p className={styles.auth_wrapper__details}>
          Your email have been invited to be a Notary on the ToNote platofrm. Please set your password below.
        </p>
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
                <li className={`${/[#?!@$%^&*-]+/g.test(formik.values.password) ? 'text--green' : 'text--red'}`}>At least 1 special character</li>
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

export default SetPasswordForm;

