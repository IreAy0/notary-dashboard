/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input } from 'components/TextInput/TextInput';
import Button from 'components/Button';
// import Select from 'components/Select';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBankDetails, fetchBankList, fetchUserProfile, uploadBankDetails } from 're-ducks/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API } from 'const';
import api from 'services/api';
import toast from 'react-hot-toast';
import classnames from 'classnames';
import { RootState } from 're-ducks/rootReducer';
import inputStyles from './input.module.scss';
import styles from '../PersonalInfo/components/AddPersonalInfo/personalinfo.module.scss';

const BankAccountSetUp = () => {
  const user: any = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [bankList, setBankList] = useState([]);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState<any>('');
  
  const [validateAccountNumber, setValidateAccountNumber] = useState<boolean>();
  const [verificationMessage, setVerificationMessage] = useState<any>(null);
  // const checkForBank: any = bankList.filter((item: any) => item?.code === user?.bank_code);
  const [disableButton, setDisabledButton] = useState(true);
  const [bankDetails, setBankDetails] = useState<any>({});
  useEffect(() => {
    dispatch(
      fetchBankDetails(
        (success) => {
          setAccountName(success?.bank_account_name);
          setAccountNumber(success?.bank_account_number);
          setBankDetails(success);
        },
        () => {}
      )
    );


    dispatch(
      fetchBankList(
        (success) => {
          setBankList(success);
        },
        () => {}
      )
    );
  }, [dispatch]);

  const [selectedBank, setSelectedBank] = useState<any>([]);


  useEffect(() => {
    setSelectedBank([{
      label: bankDetails?.bank_name,
      value: bankDetails?.bank_id
    }]);

    setValidateAccountNumber(user?.account_number && true);
  }, [bankList, bankDetails]);

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      account_number: accountNumber,
      account_name: accountName,
      bank_id: selectedBank?.value
    },
    // validationSchema: Yup.object({
    //   account_number: Yup.string().test(
    //     'checkAccountAuthenticity',
    //     'Account verified',
    //     (value) => {
         
    //       console.log(accountNumber, 'accountNumber', value)

    //        accountNumber?.length >= 9 &&
    //       dispatch(
    //         uploadBankDetails(
    //           {
    //             "bank_id": selectedBank?.value,
    //             "bank_account_name": account_name,
    //             "bank_account_number": value
                
    //           },
    //           () => {
    //             setSubmitting(false);
    //             toast.success('Bank details updated.', {
    //               position: "top-right",
    //               style: {
    //                 background: '#28a745',
    //                 color: '#fff',
    //                 border: 'none',
    //                 padding: '16px'
      
    //               }
    //             })
    //             setDisabledButton(true);
    //             dispatch(
    //               fetchUserProfile(
    //                 {},
    //                 () => {},
    //                 () => {}
    //               )
    //             );
    //           },
    //           (error: any) => {
    //             console.log(error)
    //             setSubmitting(false);
    //             if(error.status === 403){
    //               toast.error('Server Error', {
    //                 position: "top-right",
    //                 style: {
    //                   background: '#dc3545',
    //                   color: '#fff',
    //                   border: 'none',
    //                   padding: '16px'
      
    //                 }
    //               })
    //             }
    //             if(error.status === 422){
    //               toast.error('Saving failed, Please check all fields', {
    //                 position: "top-right",
    //                 style: {
    //                   background: '#dc3545',
    //                   color: '#fff',
    //                   border: 'none',
    //                   padding: '16px'
      
    //                 }
    //               })
    //             }
    //             toast.error(error?.data?.error, {
    //               position: "top-right",
    //               style: {
    //                 background: '#dc3545',
    //                 color: '#fff',
    //                 border: 'none',
    //                 padding: '16px'
    
    //               }
    //             })
    //           }
    //         )
    //       );
    //       // api
    //       //   .get(`${process.env.REACT_APP_NOTARY_BACKEND_API_URL}/v1${API.VERIFY_BANK}${value}/${selectedBank?.code}`)
    //       //   .then((res): any => {
    //       //     setAccountName(res.data.data.account_name);
    //       //     setValidateAccountNumber(true);

    //       //     return Promise.resolve(true);
    //       //   })
    //       //   .catch((error) => {
    //       //     setVerificationMessage(error.response.data.message);
    //       //   })
    //   })
    // }),
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(
        uploadBankDetails(
          {
            "bank_id": selectedBank?.value,
            "bank_account_name": values.account_name,
            "bank_account_number": values.account_number
            
          },
          () => {
            setSubmitting(false);
            toast.success('Bank details updated.', {
              position: "top-right",
              style: {
                background: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '16px'
  
              }
            })
            setDisabledButton(true);
            dispatch(
              fetchUserProfile(
                {},
                () => {},
                () => {}
              )
            );
          },
          (error: any) => {
            setSubmitting(false);
            if(error.data.code === 403){
              toast.error('Server Error', {
                position: "top-right",
                style: {
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '16px'
  
                }
              })
            }
            else if(error.data.code === 422){
              toast.error('Saving failed, Please check all fields', {
                position: "top-right",
                style: {
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '16px'
  
                }
              })
            }
            else {toast.error('Error Saving', {
              position: "top-right",
              style: {
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '16px'

              }
            })}
          }
        )
      );
    }
  });

  useEffect(() => {
    setAccountNumber(formik.values.account_number);
  }, [formik.values.account_number]);

  const handleChange = (res: any) => {
    setSelectedBank([ {
      label: res?.label,
      value: res?.value
    }]);
    setAccountName('');
    setAccountNumber('');
    setDisabledButton(false);
    setValidateAccountNumber(false);
  };

  return (
    <form id="Bank" onSubmit={formik.handleSubmit}>
      <div className="grid grid__layout  pt-2">
        <div className="col-6 bb-1 pb-1">
          <div className="col-6 mb-1">
          <label className={classnames(styles.input__label, styles.input)} htmlFor="bank_id">
          <span className="flex flex__item-center">
            Bank Name*
          </span>
          {/* {selectedBank?.length >= 1? 'true' : 'false'} */}
          <Select 
          isSearchable 
          // name="bank_id" 
          options={bankList?.map((e: any) => ({label: e.name, value: e.id}))}
          onChange={(e) => handleChange(e)}
          defaultValue={selectedBank?.length >= 1 ? selectedBank[0] : null}
           />
        </label>
            {/* <Select label="Bank Name*" placeholder="Select" options={bankList} selected={selectedBank} handleChange={handleChange} /> */}
          </div>
          <div className="col-6 mb-1">
            <Input
              label="Account Number*"
              placeholder="0112345768"
              type="text"
              id="Bank_Account"
              className={classnames(styles.input)}
              name="account_number"
              value={formik.values.account_number}
              disabled={!selectedBank || validateAccountNumber}
              onChange={formik.handleChange}
              verifiedCheck={validateAccountNumber}
            />
            {formik.values.account_number && <p className={styles.error}>{!validateAccountNumber ? verificationMessage : null}</p>}
          </div>
          <div className="col-6">
            <Input
              label="Account Name*"
              placeholder="Account Name"
              type="text"
              id="Bank_Name"
              name="account_name"
              value={formik.values.account_name}
              // value={accountNumber?.length <= 1 ? null : accountName}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <Button
          className="mt-2"
          type="submit"
          theme="primary"
          width={161}
          // disabled={!validateAccountNumber || disableButton}
          loading={submitting}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default BankAccountSetUp;

