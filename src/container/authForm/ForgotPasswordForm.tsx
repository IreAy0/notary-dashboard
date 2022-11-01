import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TonoteLogo from 'assets/icons/blue-tonote-logo.svg';
import { Link } from 'react-router-dom';
import { Input } from 'components/TextInput/TextInput';
import Button from 'components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { doForgetPassword } from 're-ducks/auth';
import history from 'utils/history';
import toast from 'react-hot-toast';
import styles from './sign.module.scss';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email').required('Email is required')
    }),
    onSubmit: (values, { resetForm }) => {
      // history.push('../../../auth/password-recovery');
      setLoading(true);
      dispatch(
        doForgetPassword(
          {
            email: values.email
          },
          () => {
            localStorage.setItem('recoveryEmail', values.email);
            resetForm();
            // history.push('../../../auth/password-recovery');
            setLoading(false);
          },
          (err) => {
            setLoading(false);
            toast.error(err)
          }
        )
      );
    }
  });

  return (
    <div className={styles.auth_wrapper}>
      <div className={styles.auth_wrapper__content1}>
        <img className={styles.auth_wrapper__image} src={TonoteLogo} alt="" />
        <h1 className={styles.auth_wrapper__title}>Forgot Password</h1>
        <p className={styles.auth_wrapper__details}>Enter your email address and a reset link will be sent to your email address.</p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div>
            <div>
              <Input
                placeholder="example@gettonote.com"
                label="Email Address*"
                name="email"
                type="text"
                id="email-signin"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? <div className={styles.error}>{formik.errors.email}</div> : null}
            </div>
          </div>
          <div className={styles.form}>
            <Button theme="primary" wide type="submit" loading={loading} disabled={!formik.isValid || !formik.dirty}>
              Submit
            </Button>
            <div className={styles.label}>
              <Link to="/auth/sign-in" className="link link--grey link--underline">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

