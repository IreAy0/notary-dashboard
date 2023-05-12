import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'components/Select';
import Modal from 'components/Modal/Modal';
import toast from 'react-hot-toast';
import { Input } from 'components/TextInput/TextInput';
import Button from 'components/Button';
import { useFormik } from 'formik';
import StatusModal from 'container/authForm/PendingModal';
import { useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserIDAction } from 're-ducks/user';
import * as Yup from 'yup';
import styles from './sign.module.scss';
import RegistrationForms from './RegistrationForm';
import Cancel from '../../assets/icons/close-icon.svg';


export interface Props {
  isOpen: boolean;
  isClose: () => void;
}

const VerifyNotaryId = ({ isOpen, isClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const dispatch = useDispatch();
  const history = useHistory()
  const [selectIdType, setSelectIdType] = useState({
    id: '',
    name: ''
  });

  const [identityType, setIdentityType] = useState<{ name: string, id: string }>(
    {
      name: '',
      id: ''
    }

  );
  const IDTypes = [
    { name: 'BVN', id: 'bvn' },
    { name: 'NIN', id: 'nin' },
    { name: 'Drivers License', id: 'drivers_license' }
  ];

  const idTypeOption = [
    { name: 'Drivers License', id: 'drivers_license' },
    { name: 'NIN', id: 'nin' }
  ];

  const formik = useFormik({
    initialValues: {
      // identity_number: '',
      identity_type: '',
      identity_number: ''
    },
    validationSchema: Yup.object({
      identity_number: Yup.number()
        .min(10, "Must be more than 10 characters")
        .required("This field is requried")
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        updateUserIDAction(
          {
            type: selectIdType?.id.toLowerCase(),
            value: `${values.identity_number}`
          },
          () => {
            toast.success('Id Verified Successfully.');
            resetForm();
            // setOpenStatusModal(!openStatusModal);
            dispatch(
              fetchUserProfile(
                {},
                () => {},
                () => {}
              )
            );
            isClose();
            setLoading(false);
            // window.location.href = "/settings/Personal_Info"
            // history.push('/settings/Personal_info')
            
          },
          (error: any) => {
            toast.error(error);
            setLoading(false);
          }
        )
      );
    }
  });

  const matchID = (name: string, key: string) => {
    const data: any = IDTypes.find((IDType: any) => IDType[key] === name);

    return data[key === 'id' ? 'name' : 'id'];
  };

  const handleIdentityType = ({ name }: { name: string }) => {
    const matchedID = matchID(name, 'name');
    setIdentityType({ name, id: matchedID });
    // setIDData((prevState: any) => ({ ...prevState, id_type: matchedID }));
  };

  const closeStatusModal = () => {
    isClose();
    dispatch(
      fetchUserProfile(
        {},
        () => { },
        () => { }
      )
    );
  }

  return (
    <div>
      {openStatusModal && (
        <StatusModal isOpen={openStatusModal} isClose={() => setOpenStatusModal(!openStatusModal)} handleClose={closeStatusModal} />
      )}
      {!openStatusModal && (
        <Modal isOpen={isOpen} isClose={isClose} >
          <div className={styles.title_wrapper}>
            <h3 className={styles.auth_wrapper__smallTitle}>Welcome!</h3>
            <Button onClick={isClose} theme="plain">
              <img src={Cancel} alt="" />
            </Button>
          </div>
          <p className={styles.auth_wrapper__details}>Please Verify your ID</p>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.container}>
              <div className={styles.container__innerWrapper1}>
                <div>
                  <Select
                    placeholder="Select"
                    label="Identity Type*"
                    options={IDTypes}
                    selected={selectIdType}
                    handleChange={(e: any) => setSelectIdType(e)}
                  // disabled={user?.user?.national_verification}
                  />
                </div>
              </div>
              <div className={styles.container__innerWrapper2}>
                <div>
                  <Input
                    placeholder="10000000001"
                    name="identity_number"
                    label="Identification Number*"
                    type="number"
                    id="identity_number"
                    onChange={formik.handleChange}
                    value={formik.values.identity_number}
                  />
                  {formik.errors.identity_number ? <div className={styles.error}>{formik.errors.identity_number}</div> : null}
                </div>
              </div>
            </div>
            
            <div className={styles.auth_wrapper__sideBtn}>
              <Button theme="primary" size="lg" type="submit"
                disabled={!formik.values.identity_number || !selectIdType?.id}
                // disabled={disabledButton === true || !formik.dirty} 
                loading={loading}>
                Submit
              </Button>
            </div>
          </form>
          {/* <RegistrationForms handleClose={() => isClose()} setDisabledButton={setDisabledButton} /> */}

        </Modal>
      )}
    </div>
  );
};

export default VerifyNotaryId;

