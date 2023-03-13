import React, { useState, useEffect } from 'react';
import Button from 'components/Button';
import { RootState } from 're-ducks/rootReducer';
import useTypedSelector from 'hooks/useTypedSelector';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input } from 'components/TextInput/TextInput';
import { getRequestDocument, verifyLockerOTP } from 're-ducks/request';
import toast from 'react-hot-toast';
import { fetchUserProfile } from 're-ducks/user';
import instance from 'services/axios';
import styles from './confirmationmodal.module.scss';
import Modal from '../../components/Modal/Modal';

interface User {
  team_role_code?: string | null;
  first_name?: string;
  last_name?: string;
  surname?: string;
  email?: string;
  avatar?: string;
  is_verified_profile?: boolean;
  plan?: string;
  commission_number?: number;
}
// , request
const OTPModal = ({ isOpen, isClose }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user: User = useSelector((state: RootState) => state?.auth?.signIn);
  const userProfile = useTypedSelector((state: RootState) => state.user);
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    setUpdatedUser({ ...user, ...userProfile });
  }, [user, userProfile])

  const fetchDocument = (useOTP?: boolean) => {
    setLoading(true);

    dispatch(
      verifyLockerOTP(
        {
          email: updatedUser?.email,
          otp: useOTP ? otp : ''
        },
        (success) => {
          setLoading(false);
          dispatch(
            fetchUserProfile(
              
              {},
              () => {
               
              },
              () => {}
            )
          );
          // if(useOTP) {
          //   routeToCertificate(doc);
          // }
        },
        (err) => {
          toast.error(err);
          setOtp('')
          setLoading(false);
        }
      )
    );
  };

  const verifyOTP = (type: string) => {
    if (type === 'proceed') {
      
      fetchDocument(true);
    } else {
      fetchDocument();
    }
  };

  const resendOtp = () => {
    instance.get('/document-otp-locker')
      .then(res => {
        toast.success(res?.data?.message);
    
      })
      .catch((err) => {
        toast.error(err.message);
      })
  }
  // useEffect(() => {
  //   if(user?.user?.access_locker_documents === false){
     
  //   }
  // },[user?.user?.access_locker_documents])

  return (
    <Modal isOpen={isOpen} isClose={isClose} width={400}>
      <div className={styles.otpModalContainer}>
        
        <h2 className={styles.otpModalContainer__title}>Enter OTP  <a style={{float: 'right'}} href="/">close</a></h2>
       
        <p className={styles.otpModalContainer__text}>
          {`We have sent an OTP to ${updatedUser?.email}, If you don't get a code, please request another`}
        </p>
        <form>
          <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button
            className={styles.otpModalContainer__resendEmail}
            onClick={(e) => {
              e.preventDefault();
              resendOtp()
            }}
          >
            Send another one
          </button>
          <div className={styles.otpModalContainer__buttons}>
            {/* <button style={{ marginRight: '20px' }} onClick={isClose}>
              Cancel
            </button> */}
            <Button
              theme="primary"
              onClick={() => verifyOTP('proceed')}
              loading={loading}
              disabled={otp === '' || otp.length !== 6 || loading}
            >
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default OTPModal;
