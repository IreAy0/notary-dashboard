import React, { useEffect, useState } from 'react';
import { Input } from 'components/TextInput/TextInput';
import Select from 'components/Select';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 're-ducks/rootReducer';
import * as Yup from 'yup';
import { doCompleteProfile } from 're-ducks/auth';
import Button from 'components/Button';
import { fetchUserProfile } from 're-ducks/user';
import styles from './sign.module.scss';
import Cancel from '../../assets/icons/close-icon.svg';

interface User {
  first_name?: string;
  last_name?: string;
  phonenumber?: string;
  gender?: string;
  commission_number?: string;
  business_address?: string;
}

interface Props {
  handleClose: () => void;
  setDisabledButton: (data: boolean) => void;
}
const RegistrationForms = ({ handleClose, setDisabledButton }: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState<any>();
  const [disableSaveButton, setDisableSaveButton] = useState<any>(false);
  const user: User = useSelector((state: RootState) => state?.auth?.signIn);
  const [selectGender, setSelectGender] = useState({
    name: ''
  });

  useEffect(() => {
    dispatch(
      fetchUserProfile(
        {},
        (success) => {
          setUserProfile(success);
        },
        (error: any) => {
          toast.error(error.message);
        }
      )
    );
  }, [dispatch]);

  useEffect(() => {
    const { gender }: any = { ...userProfile };
    setSelectGender({ name: gender ?? '' });
  }, [userProfile]);

  const handleValueLimit = (e: any) => {
    if (e?.target?.value?.length < 3) {
      e.target.value = 'SCN';
    }
    
    return e?.target?.value;
  };


  const commissionRegExp = /^[A-Z]{3}\d{5}$/;
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      phonenumber: user?.phonenumber || '',
      gender: '',
      commission_number: userProfile?.commission_number || 'SCN',
      business_address: userProfile?.business_address || ''
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First Name is required'),
      last_name: Yup.string().required('Last Name is required'),
      phonenumber: Yup.string().required('Phone Number is required'),
      commission_number: Yup.string().matches(commissionRegExp, 'Commission No is not valid'),
      business_address: Yup.string().required('Address is required')
    }),
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        doCompleteProfile(
          {
            first_name: values.first_name,
            last_name: values.last_name,
            commission_number: values.commission_number,
            phonenumber: values.phonenumber,
            business_address: values.business_address,
            gender: selectGender?.name
          },
          () => {
            toast.success('Profile Updated Successfully');
            setDisabledButton(false);
            setDisableSaveButton(true)
            dispatch(
              fetchUserProfile(
                {},
                () => {},
                () => {}
              )
            );
            setLoading(false);
          },
          (error: any) => {
            toast.error(error.response.data.message);
            setLoading(false);
          }
        )
      );
    },
    enableReinitialize: true
  });

  const genderOption = [
    {
      name: 'Male',
      id: '1'
    },
    {
      name: 'Female',
      id: '2'
    }
  ];

  return (
    <div>
      <div>
        <div className={styles.title_wrapper}>
          <h3 className={styles.auth_wrapper__smallTitle}>Welcome!</h3>
          <Button onClick={handleClose} theme="plain">
            <img src={Cancel} alt="" />
          </Button>
        </div>
        <p className={styles.auth_wrapper__details}>Fill the form below to complete your registration</p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.container}>
            <div className={styles.container__innerWrapper1}>
              <div>
                <Input
                  placeholder="First Name"
                  name="first_name"
                  label="First Name"
                  type="text"
                  id="SignUp__FirstName"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  disabled={userProfile?.is_id_verified}
                />
                {formik.errors.first_name ? <div className={styles.error}>{formik.errors.first_name}</div> : null}
              </div>
              <div>
                <Input
                  placeholder="SCNO12345"
                  name="commission_number"
                  label="Notary Commission No.*"
                  type="text"
                  id="SignUp__commission"
                  onChange={formik.handleChange}
                  value={formik.values.commission_number}
                  maxLength={8}
                  onKeyUp={handleValueLimit}
                />
                {formik.errors.commission_number ? <div className={styles.error}>{formik.errors.commission_number}</div> : null}
              </div>
              <div>
                <Select label="Gender" 
                options={genderOption} 
                selected={selectGender} 
                handleChange={setSelectGender} />
              </div>
            </div>
            <div className={styles.container__innerWrapper2}>
              <div>
                <Input
                  placeholder=" Dairo"
                  name="last_name"
                  label="Last Name"
                  type="text"
                  id="SignUp__LastName"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  disabled={userProfile?.is_id_verified}
                />
                {formik.errors.last_name ? <div className={styles.error}>{formik.errors.last_name}</div> : null}
              </div>
              <div>
                <Input
                  placeholder="+2349845978549"
                  name="phonenumber"
                  label="Phone No*"
                  type="phone"
                  id="SignUp__PhoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phonenumber}
                />
                {formik.errors.phonenumber ? <div className={styles.error}>{formik.errors.phonenumber}</div> : null}
              </div>
              <div>
                <Input
                  placeholder="4, camberland, Savannah Country."
                  name="business_address"
                  label="Address"
                  type="text"
                  id="SignUp__Address"
                  onChange={formik.handleChange}
                  value={formik.values.business_address}
                />
                {formik.errors.business_address ? <div className={styles.error}>{formik.errors.business_address}</div> : null}
              </div>
            </div>
          </div>
          <div className={styles.form_button}>
            <div className={styles.auth_wrapper__sideBtn}>
            <Button theme="primary" size="lg" type="submit" disabled={!formik.isValid || ! formik.dirty || disableSaveButton} loading={loading}>
              Save
            </Button>
            </div>
            <p>Hit the save button before submitting</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForms;

