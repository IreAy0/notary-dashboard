/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ReactSelect, { components, PlaceholderProps } from 'react-select';
import { Input } from 'components/TextInput/TextInput';
import Button from 'components/Button';
import Select from 'components/Select';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBankDetails, fetchBankList, fetchUserProfile, uploadBankDetails } from 're-ducks/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API } from 'const';
import api from 'services/api';
import toast from 'react-hot-toast';
import { RootState } from 're-ducks/rootReducer';
import styles from '../PersonalInfo/components/AddPersonalInfo/personalinfo.module.scss';
// import selectstyles from 'component/Select/select.module.scss';

interface Option {
  value: string;
  label: string;
}

const Placeholder = (props: PlaceholderProps) => <components.Placeholder {...props} />;

const BankAccountSetUp = () => {
  const user: any = useSelector((state: RootState) => state.user);
  const [options, setOptions] = useState<any>([]);
  const [defaultValue, setDefaultValue] = useState<any>({});
  const [selectedOption, setSelectedOption] = useState<any>({});
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [bankList, setBankList] = useState([]);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState<any>('');
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [validateAccountNumber, setValidateAccountNumber] = useState<boolean>();
  const [verificationMessage, setVerificationMessage] = useState<any>(null);
  // const checkForBank: any = bankList.filter((item: any) => item?.code === user?.bank_code);
  const [disableButton, setDisabledButton] = useState(true);
  const [bankDetails, setBankDetails] = useState<any>({});
  const [selectedBank, setSelectedBank] = useState<any>({
    name: '',
    id: ''
  });
  useEffect(() => {
    dispatch(
      fetchBankDetails(
        (success) => {
          if (success?.bank_account_name && success.bank_account_number) {
            setAccountName(success?.bank_account_name);
            setAccountNumber(success?.bank_account_number);
            setBankDetails(success);
            // setValidateAccountNumber(true);
          }
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

  useEffect(() => {
    const mappedData = bankList.map((item: any) => ({
      value: item.id,
      label: item.name
    }));
    setOptions(mappedData);
  }, [bankList]);

  useEffect(() => {
    const defaultValueItem = options.find((item) => item.value === bankDetails?.bank_id);
    setDefaultValue(defaultValueItem);
    setValidateAccountNumber(user?.account_number && true);
  }, [user?.account_number, bankDetails, options]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      account_number: accountNumber,
      account_name: accountName,
      bank_id: defaultValue?.value
    },
    // validationSchema: Yup.object({
    //   account_number: Yup.string().test(
    //     'checkAccountAuthenticity',
    //     'Account verified',
    //     (value) =>
    //     accountNumber?.length === 9 &&
    //     //  console.log(value)

    //   )
    // }),
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(
        uploadBankDetails(
          {
            bank_id: defaultValue?.value,
            bank_account_name: values.account_name,
            bank_account_number: values.account_number
          },
          () => {
            setSubmitting(false);
            toast.success('Bank details updated.', {
              position: 'top-right',
              style: {
                background: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '16px'
              }
            });
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
            if (error.data.code === 403) {
              toast.error('Server Error', {
                position: 'top-right',
                style: {
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '16px'
                }
              });
            } else if (error.data.code === 422) {
              toast.error('Saving failed, Please check all fields', {
                position: 'top-right',
                style: {
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '16px'
                }
              });
            } else {
              toast.error('Error Saving', {
                position: 'top-right',
                style: {
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '16px'
                }
              });
            }
          }
        )
      );
    }
  });

  useEffect(() => {
    setAccountNumber(formik.values.account_number);
  }, [formik.values.account_number]);

  useEffect(() => {
    const env_variable =
      `${process.env.REACT_APP_ENVIRONMENT}` === 'live'
        ? `${process.env.REACT_APP_NOTARY_BACKEND_API_URL_LIVE}`
        : `${process.env.REACT_APP_ENVIRONMENT}` === 'staging'
          ? `${process.env.REACT_APP_NOTARY_BACKEND_API_URL_STAGING}`
          : `${process.env.REACT_APP_NOTARY_BACKEND_API_URL_DEV}`;
    if (accountNumber.length >= 10 && !!defaultValue?.value) {
      setLoadingAccount(true);
      api
        .post(`${env_variable}/v1/bank-details`, {
          bank_id: defaultValue?.value,
          bank_account_number: accountNumber
        })
        .then((res): any => {
          setAccountName(res.data.data.bank_account_name);
          setValidateAccountNumber(true);
          setLoadingAccount(false);
          
          return Promise.resolve(true);
        })
        .catch((error) => {
          setLoadingAccount(false);
          setVerificationMessage(error.response.data.data.error.toString());
        });
    }
  }, [accountNumber, defaultValue]);

  const handleSelectChange = (selected: Option) => {
    setDefaultValue(selected);
    setSelectedOption(selected);

    if (selected) {
      setAccountName('');
      setAccountNumber('');
      setDisabledButton(false);
      setVerificationMessage('');
      setValidateAccountNumber(false);
    }
  };

  // console.log('onMount', defaultValue, selectedOption)
  return (
    <form id="Bank" onSubmit={formik.handleSubmit}>
      <div className="grid grid__layout  pt-2">
        <div className="col-6 bb-1 pb-1">
          <div className="col-6 mb-1">
            <span className="label__title">Bank Name * </span>
            <ReactSelect
              placeholder="Search for bank"
              // placeholder="Search for bank"
              value={defaultValue || selectedOption}
              options={options}
              onChange={handleSelectChange}
              defaultValue={defaultValue}
              components={{ Placeholder }}
            />
            {/* <Select label="Bank Name*" placeholder="Select" options={bankList} selected={selectedBank} handleChange={handleChange} /> */}
          </div>
          <div className="col-6 mb-1">
            <Input
              label="Account Number*"
              placeholder="0112345768"
              type="text"
              id="Bank_Account"
              name="account_number"
              value={formik.values.account_number}
              disabled={!selectedBank || validateAccountNumber}
              onChange={formik.handleChange}
              verifiedCheck={validateAccountNumber}
            />
            {formik.values.account_number && <p className={styles.error}>{!validateAccountNumber ? verificationMessage : null}</p>}
          </div>
          {loadingAccount && <CircularProgress />}
          <div className="col-6">
            <Input
              label="Account Name*"
              placeholder="Account Name"
              type="text"
              id="Bank_Name"
              name="account_name"
              disabled
              // value={formik.values.account_name}
              value={accountNumber?.length <= 1 ? '' : accountName}
              // onChange={formik.handleChange}
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
          disabled={!validateAccountNumber || disableButton}
          loading={submitting}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default BankAccountSetUp;
