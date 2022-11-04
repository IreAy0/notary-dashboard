import React, { useState, useEffect } from 'react';
import Button from 'components/Button';
import { RootState } from 're-ducks/rootReducer';
import useTypedSelector from 'hooks/useTypedSelector';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input } from 'components/TextInput/TextInput';
import { getRequestDocument, verifyLockerOTP } from 're-ducks/request';
import toast from 'react-hot-toast';
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
  }, [user, userProfile]);

  // const routeToCertificate = (doc) => {
  //   history.push({
  //     pathname: `/requests/${request?.request_id}/certificate`,
  //     state: doc
  //   });
  // };

  const fetchDocument = (useOTP?: boolean) => {
    setLoading(true);

    dispatch(
      verifyLockerOTP(
        {
          email: updatedUser?.email,
          otp: useOTP ? otp : ''
        },
        (success) => {
          console.log(success);
          setLoading(false);
          // if(useOTP) {
          //   routeToCertificate(doc);
          // }
        },
        (err) => {
          toast.error(err);
          setLoading(false);
        }
      )
    );
  };

  const verifyOTP = (type: string) => {
    if (type === 'proceed') {
      
      fetchDocument(true);
    } else {

      console.log('here')
      // fetchDocument();
    }
  };

  // useEffect(
  //   () => {
  //     fetchDocument();
  //   },
  //   // eslint-disable-next-line
  //   []
  // );


  return (
    <Modal isOpen={isOpen} isClose={isClose}>
      <div className={styles.otpModalContainer}>
        <h2 className={styles.otpModalContainer__title}>Enter OTP</h2>
        <p className={styles.otpModalContainer__text}>
          {`We have sent an OTP to ${updatedUser?.email}, If you don't get a code, please request another`}
        </p>
        <form>
          <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button
            className={styles.otpModalContainer__resendEmail}
            onClick={(e) => {
              e.preventDefault();
              verifyOTP('resend');
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
