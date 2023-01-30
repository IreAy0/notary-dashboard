import React, { useState } from "react";
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Input } from "components/TextInput/TextInput";
import Button from "components/Button";
import { doChangePasswordAction, doSignOut } from "re-ducks/auth";
import styles from '../PersonalInfo/components/AddPersonalInfo/personalinfo.module.scss';

const SecuritySetUp = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .required('new password is required')
        .min(8, 'new password cannot be less than 8 characters')
        .max(30, 'new password cannot be more than 30 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!_%*?&]{8,30}$/, 'Must contain at least one upper case, one lower case, and one numeric character'),
      confirmPassword: Yup.string()
        .required('This field is required')
        .when('newPassword', {
          is: (val: string | any[]) => (val && val.length > 0 ? true : null),
          then: Yup.string().oneOf([Yup.ref('newPassword')], 'Password do not match')
        })
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(
        doChangePasswordAction(
          {
            current_password: values.oldPassword,
            password: values.newPassword
          },
          () => {
            setSubmitting(false);
            toast.success('Profile updated successfully');
            dispatch(doSignOut(() => history.push('../auth/sign-in'), /* isWithRequest */ true));
          },
          (error: any) => {
            setSubmitting(false);
            toast.error(error);
          }
        )
      );
    },
    enableReinitialize: true
  });
  
  return(
        <form id="ResetPassword" onSubmit={formik.handleSubmit}>
            <div className="grid grid__layout gap-6 pt-2">
              <div className="col-5 bb-1 pb-1">
                <div className="col-">
                    <Input
                      label="Current Password" 
                      placeholder="*****" 
                      type="password" 
                      id="ResetPassword__oldPassword"
                      onChange={formik.handleChange}
                      name="oldPassword"
                      value={formik.values.oldPassword}
                    />
                  {formik.errors.oldPassword ? <div className={styles.error}>{formik.errors.oldPassword}</div> : null}
                </div>
                <div className="col-6">
                    <Input 
                      label="Enter New Password" 
                      type="password"
                      name="newPassword"
                      id="ResetPassword__newPassword"
                      onChange={formik.handleChange}
                      value={formik.values.newPassword}
                     />
                    {formik.errors.newPassword ? <div className={styles.error}>{formik.errors.newPassword}</div> : null}
                </div>
                <div className="col-6">
                    <Input 
                      label="Re - Enter New Password"
                      placeholder="*****" 
                      type="password"
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                    />
                    {formik.errors.confirmPassword ? <div className={styles.error}>{formik.errors.confirmPassword}</div> : null}
                </div>
                </div>
            </div>
            <div className="flex">
        <Button
          className="mt-2"
          type="submit"
          theme="primary"
          width={161}
          disabled={!formik.isValid || !formik.dirty}
          loading={submitting}
        >
          Save
        </Button>
      </div>
        </form>
  );
}

export default SecuritySetUp;
