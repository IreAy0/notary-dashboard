import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TonoteLogo from 'assets/icons/blue-tonote-logo.svg';
import { Input } from 'components/TextInput/TextInput';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Button from 'components/Button';
import { doSignIn } from 're-ducks/auth';
import { isAuthenticated } from 'utils';
import styles from './sign.module.scss';

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [isCompleteSignIn, setIsCompleteSignIn] = useState(false);
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      email:  '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        doSignIn(
          {
            email: values.email,
            password: values.password
          },
          () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
              setIsCompleteSignIn(true);
            }
            setLoading(false);
          },
          (error: any) => {
            toast.error(error.message);
            setLoading(false);
          }
        )
      );
    }
  });
  if (isCompleteSignIn || isAuthenticated()) {
    return <Redirect to="/" />;
  }
 
  return (
    <div className={styles.auth_wrapper}>
      <div className={styles.auth_wrapper__content1}>
        <img className={styles.auth_wrapper__image} src={TonoteLogo} alt="" />
        <h1 className={styles.auth_wrapper__title}>Sign In</h1>
        <p className={styles.auth_wrapper__details}>Enter your email address and password to access account.</p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div>
            <Input
              placeholder="example@gettonote.com"
              name="email"
              label="Email Address*"
              type="text"
              id="email-signin"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? <div className={styles.error}>{formik.errors.email}</div> : null}
          </div>
          <div>
            <Input
              placeholder="***********"
              name="password"
              id="password-signin"
              type="password"
              label="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? <div className={styles.error}>{formik.errors.password}</div> : null}
          </div>
          <div>
            <Button theme="primary" wide type="submit" disabled={!formik.isValid || !formik.dirty} loading={loading}>
              Sign In
            </Button>
          </div>
          <div className={styles.label}>
            <Link to="/auth/forgot-password" className="link link--grey link--underline">
              Forgotten password?
            </Link>
          </div>
          <div className={classNames(styles.link, 'pt-2')}>
            Don&apos;t have an account? <Link to="/auth/sign-up">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

