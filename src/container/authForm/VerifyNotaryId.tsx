import React, { useState } from 'react';
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

export interface Props {
  isOpen: boolean;
  isClose: () => void;
}

const VerifyNotaryId = ({ isOpen, isClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [selectIdType, setSelectIdType] = useState({
    id: '',
    name: ''
  });

  const idTypeOption = [
    { name: 'Drivers License', id: 'drivers_license' },
    { name: 'NIN', id: 'nin' }
  ];

  const formik = useFormik({
    initialValues: {
      id_number: '',
      id_type: ''
    },
    validationSchema: Yup.object({
      id_number: Yup.string().required('Identification Number is required')
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        updateUserIDAction(
          {
            id_type: selectIdType?.id.toLowerCase(),
            id_number: values.id_number.toString()
          },
          () => {
            toast.success('Id Verified Successfully.');
            resetForm();
            setOpenStatusModal(!openStatusModal);
            setLoading(false);
          },
          (error: any) => {
            toast.error(error);
            setLoading(false);
          }
        )
      );
    }
  });

  const closeStatusModal = () => {
    isClose();
    dispatch(
      fetchUserProfile(
        {},
        () => {},
        () => {}
      )
    );
  }
  
  return (
    <div>
      {openStatusModal && (
        <StatusModal isOpen={openStatusModal} isClose={() => setOpenStatusModal(!openStatusModal)} handleClose={closeStatusModal} />
      )}
      {!openStatusModal && (
        <Modal isOpen={isOpen} isClose={isClose} width={900}>
          <RegistrationForms handleClose={() => isClose()} setDisabledButton={setDisabledButton} />
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.container}>
              <div className={styles.container__innerWrapper1}>
                <div>
                  <Select
                    label="Identification Type"
                    options={idTypeOption}
                    selected={selectIdType}
                    handleChange={(e: any) => setSelectIdType(e)}
                  />
                </div>
              </div>
              <div className={styles.container__innerWrapper2}>
                <div>
                  <Input
                    placeholder="10000000001"
                    name="id_number"
                    label="Identification Number*"
                    type="number"
                    id="SignUp__Number"
                    onChange={formik.handleChange}
                    value={formik.values.id_number}
                  />
                  {formik.errors.id_number ? <div className={styles.error}>{formik.errors.id_number}</div> : null}
                </div>
              </div>
            </div>
            <div className={styles.auth_wrapper__sideBtn}>
              <Button theme="primary" size="lg" type="submit" disabled={disabledButton === true || !formik.dirty} loading={loading}>
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default VerifyNotaryId;

