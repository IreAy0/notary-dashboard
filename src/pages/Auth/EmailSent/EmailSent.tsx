import * as React from 'react';
import { Route, useParams, useLocation, useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import TonoteLogo from 'assets/icons/blue-tonote-logo.svg';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import toast from 'react-hot-toast';
import api from 'services/api';

export default function EmailSent() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [sending, setSending] = React.useState(false)
  const history = useHistory()
  const email = searchParams.get("email")

  React.useEffect(() => {
    if(!email){
      history.push('../../auth/sign-in')
    }
  })

  const resendVerify = () => {
    setSending(true)
    api.post('/user/email/resend', {
      email
    }).then(res => {
      if (res) {
        setSending(false)
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
        setSending(false)
        toast.error('Error sending verification code', {
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

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >

        <Avatar variant='square' sx={{ m: 1, bgcolor: 'transparent', width: 100 }}>

          <img className="" src={TonoteLogo} alt="" />
        </Avatar>
        <Box component="div" sx={{ mt: 1 }}>
          <div>
            <Typography component="h1" variant="h3" align="center" className="">Please Verify Your Email</Typography>
            <Typography component="div" align='center' variant='body1' fontSize={16} className="">
              We just sent an email to <span className="text-bold">{email}</span>.
              <br />
              Click the <span className="text-bold">verify </span>
              link in the email to verify account </Typography>
            <Typography component="p" variant='body2' align='center' className="text-center mt-1">
              <span>Didn&apos;t receive the email?</span>
              <button disabled={sending} onClick={resendVerify} type="button" className="btn mb-0 p-0 text-primary"><span>&nbsp;Click to resend</span></button>
            </Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }} >
              <Button
                type="button"
                variant="outlined"
                color='primary'
                size="medium"
                sx={{ mt: 3, mb: 2, borderRadius: '4px'}}
                onClick={() => history.push('../../auth/sign-in')}
              >
                Back to Sign in
              </Button>
            </Box>

          </div>

        </Box>
      </Box>

    </Container>
  );
}
