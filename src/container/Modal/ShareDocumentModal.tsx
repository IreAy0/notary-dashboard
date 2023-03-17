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
const ShareDocumentModal = ({ isOpen, isClose, id }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user: User = useSelector((state: RootState) => state?.auth?.signIn);
  const userProfile = useTypedSelector((state: RootState) => state.user);
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setUpdatedUser({ ...user, ...userProfile });
  }, [user, userProfile])

  const fetchDocument = (document_id?: string) => {
    setLoading(true);
    const documents = [
      {
        "document_id": document_id,
        "email": email
      }
    ]
    instance.put(`/document-share/${document_id}`, {documents} )
      .then(res => {
        setEmail('')
        isClose()
        setLoading(false)
        toast.success("shared successfully", {
          duration: 5000,
          position: "top-right"
        });
      }).catch(err => {
        setLoading(false)
        toast.error(err.response.data.data.error, {
          duration: 5000,
          position: "top-right"
        });
      })
  };

  const shareEmail = (type: string) => {
    if (type ) {
      fetchDocument(type);
    } else {
      fetchDocument();
    }
  };

 
  // useEffect(() => {
  //   if(user?.user?.access_locker_documents === false){
     
  //   }
  // },[user?.user?.access_locker_documents])

  return (
    <Modal isOpen={isOpen} isClose={isClose} width={400}>
      <div className={styles.otpModalContainer}>
        
        <h2 className={styles.otpModalContainer__title}>Enter Email  <a style={{float: 'right'}} href="/">close</a></h2>
       
        <p className={styles.otpModalContainer__text}>
          please enter the email you want to share this document with.
        </p>
        <form>
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          
          <div className={styles.otpModalContainer__buttons}>
            {/* <button style={{ marginRight: '20px' }} onClick={isClose}>
              Cancel
            </button> */}
            <Button
              theme="primary"
              onClick={() => shareEmail(id)}
              loading={loading}
              disabled={email === '' || loading}
            >
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ShareDocumentModal;
