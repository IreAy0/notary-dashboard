/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import history from 'utils/history';
import classNames from 'classnames';
import TonoteLogo from 'assets/icons/blue-tonote-logo.svg';
import PhoneNumInput from 'components/PhoneNumInput/Phone';
import { Input } from 'components/TextInput/TextInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/Button';
import styles from './sign.module.scss';
import { doSignUp } from '../../re-ducks/auth';

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [checkedCondition, setCheckedCondition] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');

  const dispatch = useDispatch();
  const checkedConditionHandler = () => {
    setCheckedCondition(!checkedCondition);
  };
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      role: ''
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First Name is required'),
      last_name: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid Email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirm_password: Yup.string()
        .required('confirm password is required')
        .when('password', {
          is: (val: string | any[]) => (val && val.length > 0 ? true : null),
          then: Yup.string().oneOf([Yup.ref('password')], 'Password do not match')
        })
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        doSignUp(
          {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: phoneNum.toString(),
            password: values.password,
            role:'Notary'
          },
          () => {
            // toast.success('Sign Up Successfully.');
            localStorage.setItem('verifyEmail', values.email);
            resetForm();
            history.push('/auth/verify-email');
            
            // history.push('/');

            setLoading(false);
            // toast.success('Sign Up Successfully.');
            // // localStorage.setItem('verifyEmail', values.email);
            // // console.log(res);
            
            // // localStorage.setItem('accessToken', );
            // resetForm();
            // // history.push('../../../auth/verifiy-email');
            // history.push('/')
            // setLoading(false);

          },
          (error: any) => {
            toast.error(error);
            setLoading(false);
          }
        )
      );
    }
  });

  return (
    <div className={styles.auth_wrapper}>
      <div className={styles.auth_wrapper__content1}>
        <div>
          <img className={styles.auth_wrapper__image} src={TonoteLogo} alt="" />
        </div>
        <h1 className={styles.auth_wrapper__title}>Sign Up</h1>
        <p className={styles.auth_wrapper__details}>Don&apos;t have an account? Create your account, it takes less than a minute</p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.container}>
            <div className={styles.container__innerWrapper1}>
              <Input
                placeholder="First Name"
                label="First Name*"
                name="first_name"
                type="text"
                id="SignUp__FirstName"
                onChange={formik.handleChange}
                value={formik.values.first_name}
              />
              {formik.errors.first_name ? <div className={styles.error}>{formik.errors.first_name}</div> : null}
            </div>
            <div className={styles.container__innerWrapper2}>
              <Input
                placeholder="Last Name"
                label="Last Name*"
                name="last_name"
                type="text"
                id="SignUp__LastName"
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
              {formik.errors.last_name ? <div className={styles.error}>{formik.errors.last_name}</div> : null}
            </div>
          </div>
          <div className='pt-1'>
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
          
          
          <div className={classNames(styles.phoneLabelWrapper, 'pt-1')} >
            <p className={styles.phoneLabel}>Phone Number*</p>
            <PhoneNumInput placeholder="+2349845978549" value={phoneNum} onChange={(e: any) => setPhoneNum(e)} />
          </div>
          <div className='pt-1'>
            <Input
              placeholder="***********"
              id="password-signin"
              type="password"
              label="Password*"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className='pt-1'>
            <Input
              placeholder="***********"
              id="password-signin"
              name="confirm_password"
              type="password"
              label="Confirm Password*"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
            />
            <ul>
              <li className="atom_dib">
                <ul className="hint">
                  <span className={styles.error}>
                    <li className={`${/[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}/giu.test(formik.values.password) ? 'text--green' : 'text--red'}`}>
                      At least 8 characters
                    </li>
                  </span>
                  <span className={styles.error}>
                    <li className={`${/[A-Z]+/g.test(formik.values.password) ? 'text--green' : 'text--red'}`}>At least 1 capital letter</li>{' '}
                  </span>
                  <span className={styles.error}>
                    <li className={`${/[a-z]+/g.test(formik.values.password) ? 'text--green' : 'text--red'}`}>At least 1 small letter</li>{' '}
                  </span>
                  <span className={styles.error}>
                    <li className={`${/[0-9]+/giu.test(formik.values.password) ? 'text--green' : 'text--red'}`}>At least 1 number</li>{' '}
                  </span>
                  <span className={styles.error}>
                    <li className={`${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g.test(formik.values.password) ? 'text--green' : 'text--red'}`}>
                      At least 1 special character
                    </li>{' '}
                  </span>
                  <span className={styles.error}>
                    <li
                      className={`${
                        formik.values.password === formik.values.confirm_password &&
                        formik.values.password &&
                        formik.values.confirm_password
                          ? 'text--green'
                          : 'text--red'
                      }`}
                    >
                      Passwords match
                    </li>{' '}
                  </span>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex">
            <Input
              label="I have read and I agree to the Terms of Service and Privacy Policy"
              type="checkbox"
              name="terms"
              onChange={checkedConditionHandler}
              checked={checkedCondition}
            />
          </div>
          <div className={styles.link__text}>
            Already have an account?{' '}
            <Link className={styles.link__text} to="/auth/sign-in">
              Sign In
            </Link>
          </div>
          <div>
            <Button theme="primary" wide type="submit" disabled={!formik.isValid || !formik.dirty ||  checkedCondition === false } loading={loading}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

