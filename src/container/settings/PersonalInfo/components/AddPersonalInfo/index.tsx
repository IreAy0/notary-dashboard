import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import SelectNew from 'components/Select';
import { Input } from 'components/TextInput/TextInput';
import toast from 'react-hot-toast';
import { editUserProfile } from 're-ducks/user/user.action';
import PhoneNumInput from 'components/PhoneNumInput/Phone';
import { fetchUserProfile } from 're-ducks/user';
import { stateList } from 'mocks/state';
import SelectInput from 'components/Select/select';
import instance from 'services/axios';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel } from '@mui/material';
import classNames from 'classnames';
import styles from './personalinfo.module.scss';
import input_styles from 'components/TextInput/input.module.scss';

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const AddPersonalInfo = ({ nextStep, prevStep }: Props) => {
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
    name: '' ,
    id: ''
  });

  const [selectState, setSelectedState] = useState({
    name: '',
    id: ''
  });

  const handleChangeGender = (event: SelectChangeEvent) => {
    setSelectedGender({
      name: event?.target?.value,
      id: event?.target?.value
    });
  }

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
      gender: userProfile?.gender || '' ,
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
            gender: values?.gender,
            notary_commission_number: values.notary_commission_number,
            address: values.address,
            state_id: values?.state_id,
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
        <FormControl sx={{ width: '100%' }}>
        <label className={classNames(input_styles.input__label, styles.text)} htmlFor='gender'>
          <span className="flex flex__item-center">
           Gender
          </span>
      </label>
       
        <Select  id='gender' name="gender" onChange={formik.handleChange} native value={formik.values.gender } >
          <option value="" >
           Select a gender {selectGender.name}
          </option>
          {genderOptions.map(gender => (
            <option value={gender.id}>{gender.name}</option>
          ))}
          
        </Select>
     
      </FormControl>
          {/* <Select label="Gender" placeholder="Select" options={genderOptions} selected={selectGender} handleChange={setSelectedGender} /> */}
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
            // disabled={userProfile?.address}
            value={formik.values.address}
          />
          {formik.errors.address ? <div className={styles.error}>{formik.errors.address}</div> : null}
        </div>
        <div className="col-6">
          {/* <SelectNew
            label="Country*"
            placeholder="Select"
            options={country}
            selected={selectCountry}
            handleChange={handleCountryChange}
          /> */}
           <FormControl sx={{ width: '100%' }}>
        <label className={classNames(input_styles.input__label, styles.text)} htmlFor='country_id'>
      
          <span className="flex flex__item-center">
          Country
          </span>
      </label>
       
        <Select  id='country_id' name="country_id" onChange={formik.handleChange} native value={formik.values.country_id } >
          <option value="" >
           Select a Country
          </option>
          {country.map((c: any) => (
            <option value={c.id}>{c.name}</option>
          ))}
          
        </Select>
     
      </FormControl>
        </div>
        <div className="col-6">
          {/* <Select 
          label="State*" 
          placeholder="Select" 
          options={states} 
          selected={selectState}
          handleChange={handleStateChange}
           /> */}
           <FormControl sx={{ width: '100%' }}>
        <label className={classNames(input_styles.input__label, styles.text)} htmlFor='state_id'>
          <span className="flex flex__item-center">
          States
          </span>
      </label>
       
        <Select  id='state_id' name="state_id" onChange={formik.handleChange} native value={formik.values.state_id } >
          <option value="" >
           Select a state
          </option>
          {states?.map((state: any) => (
            <option value={state?.id}>{state?.name}</option>
          ))}
          
        </Select>
     
      </FormControl>
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
          <Button onClick={prevStep} type="button" theme="grey" variant="outline" style={{borderRadius: '50%'}} className='mr-2'>
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                      fill="#A1A0A0" />
                  </svg>
        </Button>
        <Button
          className=""
          type="submit"
          theme="primary"
          
          loading={submitting}
          // !selectState?.name || !selectGender?.name || !selectCountry?.id || !formik.isValid || 
          disabled={submitting}
        >
          Save and Continue
        </Button>
      </div>
    </form>
  );
};

export default AddPersonalInfo;
