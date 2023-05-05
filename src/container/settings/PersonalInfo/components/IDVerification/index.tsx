import React, { FC, useState, useEffect } from 'react';
import Select from 'components/Select';
import Button from 'components/Button';
import Box from '@mui/material/Box';
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
}

const IDTypes = [
  { name: 'BVN', id: 'bvn' },
  { name: 'NIN', id: 'nin' },
  { name: 'Drivers License', id: 'drivers_license' },
  { name: 'International Passport', id: 'passport' }
];

const IDVerification: FC<Props> = ({ user, nextStep }: Props) => {
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
  useEffect(() => {
    dispatch(
      fetchUserProfile(
        {},
        (success) => {
          setUserProfile(success);
        },
        (error: any) => {
          // toast.error(error.message);
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
      identity_number: user?.user?.identity_number,
      first_name: '',
      last_name: ''

    },
    validationSchema: Yup.object({
      
      identity_number: Yup.number()
        .min(10, "Must be more than 10 characters")
        .required("This field is requried")
    }),
    onSubmit: (values) => {
      setSubmitting(true);
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
      <Box sx={{ display: 'flex !important',gap:'15px', flexWrap: 'wrap', justifyContent: 'space-between', flex: '1 1 0px' }}>
      <div className="mb-2" style={{flex: '1 1 0'}}>
          <Select
            placeholder="Select"
            label="Identity Type*"
            options={IDTypes}
            selected={identityType}
            handleChange={handleIdentityType}
            disabled={user?.user?.national_verification}
          />
        </div>
        {identityType.id === 'passport' && 
      (<div className=" mb-2" style={{flex: '1 1 0'}}>
          <div className=" " style={{alignItems: 'flex-end', width: '100%'}}>
            <div className={`${user?.user?.national_verification ? 'col-12' :  'col-7 mb-2' } `}>
            <Input
          className='mb-0'
            // value={IDData}
           
            label="First Name*"
            
            placeholder="First Name"
            type="text"
            name="first_name"
            onChange={formik.handleChange}
            value={formik.values.first_name || ''}
            disabled={user?.user?.national_verification}
            // onChange={(e) => setIDData({...IDData, [e.target.name]: e.target.value })}
            verifiedCheck={user?.user?.national_verification}
          />
          
            </div>


          </div>
          
        </div>)}
        {identityType.id === 'passport' && 
      (<div className=" mb-2" style={{flex: '1 1 0'}}>
          <div className=" " style={{alignItems: 'flex-end', width: '100%'}}>
            <div className={`${user?.user?.national_verification ? 'col-12' :  'col-7 mb-2' } `}>
            <Input
          className='mb-0'
            // value={IDData}
           
            label="Last Name*"
            
            placeholder="ID"
            type="text"
            name="last_name"
            onChange={formik.handleChange}
            value={formik.values.last_name || ''}
            disabled={user?.user?.national_verification}
            // onChange={(e) => setIDData({...IDData, [e.target.name]: e.target.value })}
            verifiedCheck={user?.user?.national_verification}
          />
          
            </div>


          </div>
          
        </div>)}
       
        <div style={{flex: '1 1 0'}} className="col-6 mb-2">
          <div className=" " style={{alignItems: 'flex-end', width: '100%'}}>
            <div className={`${user?.user?.national_verification ? 'col-12' :  'col-7 mb-2' } `}>
            <Input
          className='mb-0'
            // value={IDData}
           
            label="ID Number*"
            
            placeholder="ID"
            type="number"
            name="identity_number"
            onChange={formik.handleChange}
            value={formik.values.identity_number || ''}
            disabled={user?.user?.national_verification}
            // onChange={(e) => setIDData({...IDData, [e.target.name]: e.target.value })}
            verifiedCheck={user?.user?.national_verification}
          />
          
            </div>


          </div>
          
        </div>
        <div style={{flex: '1 1 0'}} className={`${user?.user?.national_verification ? 'd-none' :  'col-3 mb-2'} `}>
          
          <Button
          style={{marginTop: '1.5rem'}}
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
      
      </Box>
      
      <div className="flex flex__end">
       
      
        
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
