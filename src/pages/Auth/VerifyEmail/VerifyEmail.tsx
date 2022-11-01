import React, { useEffect, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { doReSendEmail, forgotPassResetState } from 're-ducks/auth';
import toast from 'react-hot-toast';
import OTPInput, { ResendOTP } from "otp-input-react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TonoteLogo from 'assets/icons/blue-tonote-logo.svg';
import history from 'utils/history';

// import { Box, Grid } from '@mui/material';
import { ListItem } from 'material-ui/List';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Button from 'components/Button';
import api from 'services/api';
import styles from '../../../container/authForm/sign.module.scss';
import Image from '../../../assets/img/signIn.svg';
// import Mail from '../../../assets/icons/mail.svg';


const VerifyEmail = () => {
  const email = localStorage.getItem('verifyEmail');
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResendEmail = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      doReSendEmail(
        { email },
        () => {
          toast.success("Verification email has been resent");
        },
        () => {}
      )
    );
  };

  const  handleSubmit = () => {
    // let email = this.$route.query.email
    const data = { email: email?.toLocaleLowerCase(), otp: OTP }
   
    setLoading(true);
    // this.verify(data)
    // history.push('/auth/sign-in');
    api.post('/user/email/verify', data)
      .then((res) => {
        setLoading(false)
        toast.success('Email Verified Successfully.', {
          position: "top-right",
          style: {
            background: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '16px'
          }
        })
        history.push('/auth/sign-in');
      }
      )
      .catch((err) => {
        toast.success('Invalid OTP.', {
          position: "top-right",
          style: {
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '16px'

          }
        })
      }
      )

  }

  const resendVerify = () => {

    api.post('/user/email/resend', {
      email
    }).then(res => {
      if (res) {
        toast.success('Verification Code Sent Successfully.', {
          position: "top-right",
          style: {
            background: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '16px'
          }
        })
      }

    })
      .catch((err) => {
        toast.success('Error sending verification code', {
          position: "top-right",
          style: {
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '16px'

          }
        })
      }
      )
    
  }

  useEffect((): any => () => dispatch(forgotPassResetState()), [dispatch]);
  const theme = createTheme();

  return (
    <>
     {/* <div className={styles.auth_image_wrapper}>
      <div className={styles.auth_Password_form}>
        <div className={styles.auth_wrapper}>
          <div className={styles.auth_wrapper__content1}>
            <h1 className={styles.auth_wrapper__title}>Two Step Verification &#x1F4AC;</h1>
            <p className={styles.auth_wrapper__details}>
            We sent a verification code to your email. Enter the code in the field below.{' '}
              <strong className={styles.link__mail}>{email}</strong> to proceed.
            </p>
            <div>
            <Grid spacing={3} container>
            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} inputStyles={{
              width: "3rem",
              height: "3rem",
              margin: "0 1rem",
              fontSize: "1rem",
              borderRadius: 7,
              border: "1px solid rgba(0, 0, 0, 0.23)"

            }} />
      <ResendOTP onResendClick={() => console.log("Resend clicked")} />
            </Grid>
            </div>
         
            <p className={styles.auth_wrapper__resend__mail}>
              Not receiving email?{' '}
              <a className={styles.auth_wrapper__resend__mail} href="/" onClick={handleResendEmail}>
                Resend verification email.
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.auth_image}>
        <img src={Image} alt="" />
      </div>
    </div> */}
    <ThemeProvider theme={theme}>
    <AppBar position="absolute" color="transparent" style={{
      boxShadow: "none",
      marginTop: "2rem"
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>         
          <Box
      sx={{
        bgcolor: 'background.transparent',
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 150
          // height: 150
        }
      }}
    >
      
      <Paper style={{
        backgroundColor: 'transparent'

      }} elevation={0} component="a" href='/'>
      <img  src={TonoteLogo} alt="" />
      </Paper>
      
    </Box>
        </Toolbar>
      </Container>
    </AppBar>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
           
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: '',
              margin: ' auto 0',
              justifyContent: 'center',
              height: '100%',
              padding: '0 2rem'
            }}
          >
            
            <h1 className={styles.auth_wrapper__title}>Two Step Verification &#x1F4AC;</h1>
            <p className={styles.auth_wrapper__details}>
            We sent a verification code to your email. Enter the code in the field below.{' '}
              <strong className={styles.link__mail}>{email}</strong> to proceed.
            </p>
            <Box component="form" noValidate  sx={{ my: 4 }}>
          
            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} inputStyles={{
              width: "3rem",
              height: "3rem",
              margin: "0 1rem",
              fontSize: "1rem",
              borderRadius: 7,
              border: "1px solid rgba(0, 0, 0, 0.23)"

            }} />
      
            </Box>
              {/* todo add loading */}
            <Button disabled={OTP.length < 6 } theme="primary"  wide type="button" onClick={() => handleSubmit()} loading={loading}>
                Verify my account
            </Button>
            {/* @click="resendVerify" */}
            <p className="text-center mt-2"><span>Didn&rsquo;t get the code?</span><button onClick={() => resendVerify()} className="link link--underline" type='button' >
               <span>&nbsp;Resend</span></button><span>&nbsp;or</span><a
               className="link link--underline"
                href="mailto:ask@gettonote.com" target="_blank" rel="noreferrer"><span>&nbsp;Email Us</span></a></p>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    {/* <Grid container spacing={2}>
  <Grid xs={6}>
  <Box>
         <div className={styles.auth_Password_form}>
        <div className={styles.auth_wrapper}>
          <div className={styles.auth_wrapper__content1}>
            <h1 className={styles.auth_wrapper__title}>Verify Your Email</h1>
            <p className={styles.auth_wrapper__details}>
              we need to verify your Identity. Please click on the verification link sent to{' '}
              <strong className={styles.link__mail}>{email}</strong> to proceed.
            </p>
            <p className={styles.auth_wrapper__resend__mail}>
              Not receiving email?{' '}
              <a className={styles.auth_wrapper__resend__mail} href="/" onClick={handleResendEmail}>
                Resend verification email.
              </a>
            </p>
            <img className={styles.form} src={Mail} alt="" />
          </div>
        </div>
      </div>
    </Box>
  </Grid>
  <Grid xs={6}>
  <Box
      sx={{
        width: '100%',
        height: '300px',
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.dark',
          opacity: [0.9, 0.8, 0.7]
        }
      }}
    > <div className={styles.auth_image}>
    <img src={Image} alt="" />
  </div> </Box>
  </Grid>
  
</Grid> */}
    </>
   
  );
};
export default VerifyEmail;
