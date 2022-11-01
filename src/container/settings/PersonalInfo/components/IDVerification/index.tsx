import React, { FC, useState, useEffect } from 'react';
import Select from 'components/Select';
import Button from 'components/Button';
import { Input } from 'components/TextInput/TextInput';
import { useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserIDAction } from 're-ducks/user';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';


interface IDData {
  bvn: string;
  id_type: string;
}

interface Props {
  user: {
    [k: string]: Date | string | boolean | any;
  };
  nextStep: () => void;
  prevStep: () => void;
}

const IDTypes = [
  { name: 'BVN', id: 'bvn' },
  { name: 'NIN', id: 'nin' },
  { name: 'Drivers License', id: 'drivers_license' }
];

const IDVerification: FC<Props> = ({ user, nextStep, prevStep }: Props) => {
  const [IDData, setIDData] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<any>();

  const dispatch = useDispatch();

  const [identityType, setIdentityType] = useState<{ name: string, id: string }>(
    { name: user?.user?.identity_type ,
    
      id: user?.user?.identity_type }
    
  );


  const matchID = (name: string, key: string) => {
    const data: any = IDTypes.find((IDType: any) => IDType[key] === name);

    return data[key === 'id' ? 'name' : 'id'];
  };

  const handleIdentityType = ({ name }: { name: string }) => {
    const matchedID = matchID(name, 'name');
    setIdentityType({ name, id: matchedID });
    // setIDData((prevState: any) => ({ ...prevState, id_type: matchedID }));
  };

  console.log(user, userProfile, 'userProfile');
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

  const handleVerifyID = (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    dispatch(
      updateUserIDAction(
        IDData,
        () => {
          setSubmitting(false);
          dispatch(
            fetchUserProfile(
              {},
              () => {},
              () => {}
            )
          );
          toast.success('ID updated successfully');
          nextStep();
        },
        (error: any) => {
          setSubmitting(false);
          toast.error(error);
        }
      )
    );
  };
  
  useEffect(() => {
    const { bvn, id_type }: any = { ...user.user };
    setIDData(user?.user?.identity_number);
    
    setIdentityType({ name: user?.user?.identity_type ,
      
      id: user?.user?.identity_type })
    // setIdentityType(() => ({ name: id_type ? matchID(id_type, 'id') : '' }));
    // setIDData({ bvn: bvn ?? '', id_type: id_type ?? '' });
    
  }, [user]);

  const formik = useFormik({
    initialValues: {
      identity_type: identityType.id, 
      identity_number: user?.user?.identity_number

    },
    validationSchema: Yup.object({
      
      identity_number: Yup.number()
        .min(10, "Must be more than 10 characters")
        .required("This field is requried")
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      console.log(values.identity_number, 'values');
      dispatch(
        updateUserIDAction(
          
          {

            type: values.identity_type,
            value:` ${values.identity_number}`
          },
          () => {
            setSubmitting(false);
            dispatch(
              fetchUserProfile(
                {},
                () => {},
                () => {}
              )
            );
            toast.success('ID updated successfully');
            // nextStep();
          },
          (error: any) => {
            setSubmitting(false);
            toast.error(error);
          }
        )
      );
      // dispatch(
      //   editUserProfile(
      //     {
      //       first_name: values.first_name,
      //       last_name: values.last_name,
      //       email: values.email,
      //       phone: phoneNumber,
      //       gender: selectGender?.id,
      //       notary_commission_number: values.notary_commission_number,
      //       address: values.address,
      //       state_id: selectState?.id,
      //       country_id: selectCountry?.id
      //     },
      //     () => {
      //       setSubmitting(false);
      //       toast.success('Profile updated successfully');
      //       nextStep();
      //       dispatch(
      //         fetchUserProfile(
      //           {},
      //           () => {},
      //           () => {}
      //         )
      //       );
      //     },
      //     (error) => {
      //       setSubmitting(false);
      //       toast.error(error);
      //     }
      //   )
      // );
    },
    enableReinitialize: true
  });

  return (
    // onSubmit={handleVerifyID} 
    <form onSubmit={formik.handleSubmit}>
      <p className="text--600 mb-2">ID Verification</p>
      <div className="grid grid__layout  pb-2 mb-2">
        <div className="col-6">
          <Select
            placeholder="Select"
            label="Identity Type*"
            options={IDTypes}
            selected={identityType}
            handleChange={handleIdentityType}
            disabled={user?.user?.national_verification}
          />
        </div>
        <div className="col-6">
          <div className="grid grid__layout gap-1" style={{alignItems: 'flex-end', width: '100%'}}>
            <div className={`${user?.user?.national_verification ? 'col-12' :  'col-7' } `}>
            <Input
          className='mb-0'
            // value={IDData}
           
            label="ID Number*"
            
            placeholder="ID"
            type="number"
            name="identity_number"
            onChange={formik.handleChange}
            value={formik.values.identity_number}
            disabled={user?.user?.national_verification}
            // onChange={(e) => setIDData({...IDData, [e.target.name]: e.target.value })}
            verifiedCheck={user?.user?.national_verification}
          />
            </div>

 <div className={`${user?.user?.national_verification ? 'd-none' :  'col-3'} `}>
          <Button
          className=" "
          type="submit"
          loading={submitting}
          // disabled={!IDData.bvn || !IDData.id_type || submitting || !!user.is_verified_profile || user?.user?.is_id_verified}
          theme="primary"
          width={161}
          variant="outline"
        >
          Verify Now
        </Button>
        </div>
          </div>
          
        </div>
       
      </div>
      <div className="flex flex__end">
       
        <Button onClick={prevStep} type="button" theme="grey" variant="outline" style={{borderRadius: '50%'}} className='mr-2'>
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                      fill="#A1A0A0" />
                  </svg>
        </Button>
        
        <Button
          className=""
          type="button"
          theme="primary"
          onClick={nextStep}
          loading={submitting}
          disabled={submitting || user.user.national_verification === false || user?.user?.is_id_verified}
        >
          Save and Continue
        </Button>
      </div>
    </form>
  );
};

export default IDVerification;
