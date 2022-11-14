import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Select from 'components/Select';
import { Input } from 'components/TextInput/TextInput';
import toast from 'react-hot-toast';
import { editUserProfile } from 're-ducks/user/user.action';
import PhoneNumInput from 'components/PhoneNumInput/Phone';
import { fetchUserProfile } from 're-ducks/user';
import { stateList } from 'mocks/state';
import SelectInput from 'components/Select/select';
import instance from 'services/axios';
import styles from './personalinfo.module.scss';

interface Props {
  nextStep: () => void;
}

const AddPersonalInfo = ({ nextStep }: Props) => {
  const [userProfile, setUserProfile] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<any>(userProfile?.phone);
  const [selectCountry, setSelectedCountry] = useState({
    name: userProfile?.country?.name,
    id: userProfile?.country?.id
    
  });
  const [states, setStates] = useState([])
  const [country, setCountry] = useState([]);

  const dispatch = useDispatch();
  const commissionRegExp = /^[0-9]{6}$/ ;

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
    // instance.get("/countries").then((res) => {
     
    //   setCountry(res?.data?.data)
    // });
    
  }, [dispatch]);


  const handleValueLimit = (e: any) => e?.target?.value

  const genderOptions = [
    { name: 'Female', id: 'f' },
    { name: 'Male', id: 'm' }
  ];

  const [selectGender, setSelectedGender] = useState({
    name: userProfile?.gender ,
    id: userProfile?.gender 
  });

  const [selectState, setSelectedState] = useState({
    name: '',
    id: ''
  });

  const handleCountryChange = (e: any) => {

   
    setSelectedCountry({ name: e.name, id: e.id })
    instance.get(`/countries/${e.id}`).then((res) => {
      setStates(res?.data?.data)
    }
    
    );
  };

  const handleStateChange = (e: any) => {
    setSelectedState({ name: e.name, id: e.id })
  };

  useEffect(() => {
    const { gender, state, phone }: any = { ...userProfile };
    setSelectedGender({ name: gender , id: gender });
    setPhoneNumber(phone);
    instance.get("/countries").then((res) => {
  
      setCountry(res?.data?.data)
    });

    instance.get(`/countries/${userProfile?.country?.id}`).then((res) => {
      setStates(res?.data?.data);
    });

    setSelectedCountry({ name: userProfile?.country?.name, id: userProfile?.country?.id })
    setSelectedState({ name: userProfile?.state?.name, id: userProfile?.state?.id })
  }, [userProfile]);


  const handleOnChange = (value: any) => {
    setPhoneNumber(value);
  };

  const formik = useFormik({
    initialValues: {
      first_name: userProfile?.first_name || '',
      last_name: userProfile?.last_name || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      notary_commission_number: userProfile?.notary_commission_number || '',
      address: userProfile?.address || '',
      gender: selectGender.name || '' ,
      country_id: selectCountry.id || '',
      state_id: selectState.id || ''

    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First Name is required'),
      last_name: Yup.string().required('Last Name is required'),
      email: Yup.string().required('Email is required'),
      notary_commission_number: Yup.string().required('Commission Number is required').matches(commissionRegExp, 'Commission No is not valid'),
      address: Yup.string().required('Address is required')
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(
        editUserProfile(
          {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: phoneNumber,
            gender: selectGender?.id,
            notary_commission_number: values.notary_commission_number,
            address: values.address,
            state_id: selectState?.id,
            country_id: selectCountry?.id
          },
          () => {
            setSubmitting(false);
            toast.success('Profile updated successfully.', {
              position: "top-right",
              style: {
                background: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '16px'
  
              }
            })
            // toast.success('Profile updated successfully');
            nextStep();
            dispatch(
              fetchUserProfile(
                {},
                () => {},
                () => {}
              )
            );
          },
          (error) => {
            setSubmitting(false);
            toast.error('Error updating profile', {
              position: "top-right",
              style: {
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '16px'

              }
            })
            toast.error(error);
          }
        )
      );
    },
    enableReinitialize: true
  });

  return (
    <form id="GetProfile" onSubmit={formik.handleSubmit}>
      <div className="grid grid__layout gap-1">
        <div className="col-6">
          <Input
            label="First Name*"
            type="text"
            placeholder="First Name"
            id="GetProfile__FirstName"
            name="first_name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            disabled={userProfile?.national_verification}
          />
          {formik.errors.first_name ? <div className={styles.error}>{formik.errors.first_name}</div> : null}
        </div>
        <div className="col-6">
          <Input
            label="Last Name*"
            type="text"
            placeholder="Last Name"
            id="GetProfile__LastName"
            name="last_name"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            disabled={userProfile?.national_verification}
          />
          {formik.errors.last_name ? <div className={styles.error}>{formik.errors.last_name}</div> : null}
        </div>
        <div className="col-6">
          <Input
            label="Email Address*"
            type="text"
            placeholder="Email Address"
            id="GetProfile__Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            disabled
          />
          {formik.errors.email ? <div className={styles.error}>{formik.errors.email}</div> : null}
        </div>
        <div className="col-6">
          <p className={styles.label}>Phone Number</p>
          <PhoneNumInput onChange={handleOnChange} value={phoneNumber} />
        </div>
        <div className="col-6">
          <Select label="Gender" placeholder="Select" options={genderOptions} selected={selectGender} handleChange={setSelectedGender} />
        </div>
        
        <div className="col-6">
          <Input
            label="Notary Commision No.*"
            type="text"
            placeholder="Notary No."
            id="GetProfile__CommissionNo"
            name="notary_commission_number"
            onChange={formik.handleChange}
            value={formik.values.notary_commission_number}
            maxLength={8}
            // disabled={userProfile?.national_verification}
            onKeyUp={handleValueLimit}
          />
          {formik.errors.notary_commission_number ? <div className={styles.error}>{formik.errors.notary_commission_number}</div> : null}
        </div>
        <div className="col-12">
          <Input
            label="Address"
            type="text"
            name="address"
            id="GetProfile__Address"
            onChange={formik.handleChange}
            disabled={userProfile?.address}
            value={formik.values.address}
          />
          {formik.errors.address ? <div className={styles.error}>{formik.errors.address}</div> : null}
        </div>
        <div className="col-6">
          <Select
            label="Country*"
            placeholder="Select"
            options={country}
            selected={selectCountry}
            handleChange={handleCountryChange}
          />
        </div>
        <div className="col-6">
          <Select 
          label="State*" 
          placeholder="Select" 
          options={states} 
          selected={selectState}
          handleChange={handleStateChange}
           />
        </div>
      </div>
      <div className={styles.btn}>
        {/* <Button
          className="mr-1 mt-1"
          type="submit"
          theme="primary"
          width={161}
          loading={submitting}
          disabled={!selectState?.name || !selectGender?.name || !selectCountry?.name || !formik.isValid || submitting}
        >
          Save
        </Button> */}
        {/* <Button onClick={nextStep} type="button" theme="secondary" variant="outline" width={161} className="mt-1">
          Proceed
        </Button> */}
        <Button
          className=""
          type="submit"
          theme="primary"
          
          loading={submitting}
          disabled={!selectState?.name || !selectGender?.name || !selectCountry?.id || !formik.isValid || submitting}
        >
          Save and Continue
        </Button>
      </div>
    </form>
  );
};

export default AddPersonalInfo;
