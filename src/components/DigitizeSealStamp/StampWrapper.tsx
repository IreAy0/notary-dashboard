/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { RootState } from 're-ducks/rootReducer';
import UploadIcon from 'assets/img/upload.svg';
import useTypedSelector from 'hooks/useTypedSelector';
import { editNotaryFiles, fetchStampsAndSeals, fetchUserProfile, uploadNotaryFiles } from 're-ducks/user';
import toast from 'react-hot-toast';
import formatCommissionNumber from 'utils/formatCommissionNumber';
import { useLocation } from 'react-router-dom';
import SignaturePolicy from 'container/document/SignaturePolicy';
import EditButton from './EditButton';
import styles from './sealstamp.module.scss';
import { Input } from '../TextInput/TextInput';
import Button from '../Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface User {
  team_role_code?: string | null;
  first_name?: string;
  last_name?: string;
  surname?: string;
  email?: string;
  avatar?: string;
  is_verified_profile?: boolean;
  plan?: string;
  notary_commission_number?: number;
  phone?: string;
  address?: string;
  city?: string;
  state?: {
    name?: string;
  };
  zip?: string;
  country?: {
    name?: string;
  };

}



const TopCard = styled.div`
border: 4px solid black;
padding: 4px;

`

const StampWrapper = ({ setSignature, actionType, requestData, Save, showAgreement }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editStamp, setEditStamp] = useState<boolean>(false);
  const [stampSuccess, setStampSuccess] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<any>()

  const userProfile = useSelector((state: RootState) => state?.user);

  const user: User = useSelector((state: RootState) => state?.auth?.signIn);
  const [companyStamp, setCompanyStamp] = useState({ file_url: '', file_id: '' });
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const stampImage = useRef<any>()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl);

  }, [selectedFile])

  useEffect(() => {
    dispatch(
      fetchUserProfile(
        {},
        () => { },
        () => { }
      )
    );
  }, [dispatch]);

  useEffect(
    () => {
      if (actionType === 'requests') {
        setUpdatedUser(requestData);
      } else {
        setUpdatedUser({ ...user, ...userProfile });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, userProfile, actionType]
  );

  function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  const isDefaultDisabled = (stampSuccess && !editStamp) || loading || !preview;

  const setStampAndSeal = (file: any, name: string) => {
    const formData = new FormData();
    formData.append('file', file);
    const payload = {
      type: name,
      formData
    };

    setLoading(true);
    dispatch(
      uploadNotaryFiles(
        name,
        payload,
        (response: any) => {
          setLoading(false);
          switch (name) {
            case 'stamp':
              setCompanyStamp({ file_url: response.file_url, file_id: response.file_id });
              setEditStamp(false)
              break;

            default:
              break;
          }
          toast.success('Upload done successfully');
        },
        (error: any) => {
          setLoading(false);
          toast.error(error);
        }
      )
    );
  };

  const editStampAndSeal = (file: any, name: string) => {
    const formData = new FormData();
    formData.append('file', file);
    const payload = {
      type: name,
      file_id: companyStamp.file_id,
      formData
    };
    setLoading(true);
    dispatch(
      editNotaryFiles(
        payload,
        (response: any) => {
          setLoading(false);

          switch (name) {
            case 'stamp':
              setCompanyStamp({ file_url: response.file_url, file_id: response.file_id });
              setEditStamp(false);
              break;
            default:
              break;
          }
          toast.success('Update done successfully');
        },
        (error: any) => {
          setLoading(false);
          toast.error(error);
        }
      )
    );
  };

  useEffect(() => {
    setLoading(true);
    const fileType = 'stamp';
    const payload = {
      type: fileType
    };
    dispatch(
      fetchStampsAndSeals(
        payload,
        (response: any) => {
          setLoading(false);
          switch (fileType) {
            case 'stamp':
              setCompanyStamp({ file_url: response.file_url, file_id: response.file_id });
              setStampSuccess(true);
              break;
            default:
              break;
          }
        },
        () => setLoading(false)
      )
    );
  }, [dispatch, setCompanyStamp, user]);

  const saveHtmlAsImage = () => {
    if (stampImage.current) {
      html2canvas(stampImage.current, { allowTaint: true }).then((canvas) => {
       
        const url = canvas.toDataURL('image/png');
        setCompanyStamp({
          ...companyStamp, 
          file_url: url
        });
        // setUploadedSeal(url)
      });
    }


    // const container = document.getElementById(type); // full page

    // if (container) {
    //   html2canvas(container, { allowTaint: true }).then((canvas) => {
    //     const link = document.createElement('a');
    //     document.body.appendChild(link);
    //     const url = canvas.toDataURL('image/png');
    //     const blob = DataURIToBlob(url);
    //     // if (editStamp) {
    //     //   editStampAndSeal(blob, type);
    //     // } else {
    //     //   setStampAndSeal(blob, type);
    //     // }
    //   });
    // }
    // setSignature(companyStamp?.file_url);
  };

  console.log(companyStamp, 'stamp')

  useEffect(() => {
    if (!showAgreement) {
      setIsDisabled(true);
    } else if (showAgreement && !acceptPolicy) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [acceptPolicy, showAgreement]);

  const onSave = () => {
    console.log("onSave called", companyStamp?.file_url)
    Save({
      file: companyStamp?.file_url,
      type: 'NotaryStamp',
      category: 'Upload',
      done: () => {
        setCompanyStamp({ file_url: '', file_id: ''})
        setIsDisabled(true)
        toast.success('Seal Uploaded successfully.', {
          position: "top-right",
          style: {
            background: '#389750',
            color: '#fff',
            border: 'none',
            padding: '16px'

          }
        })
      }, 
      fail: () => {
         toast.error('Please generate a seal or stamp', {
            position: "top-right",
            style: {
              background: 'red',
              color: '#fff',
              border: 'none',
              padding: '16px'

            }
          })
      }
    });
  
}

  return (
    <div>
      {!pathname.includes('session') && (
        <div className="grid grid__layout gap-1 pt-1">
          <div className="col-6">
            <Input
              label="Full Name(Company Name)"
              placeholder="Emily R. Waren"
              type="text"
              value={`${updatedUser?.first_name} ${updatedUser?.last_name}`}
             
            />
          </div>
          <div className="col-6">
            <Input
              label="Commission Number"
              placeholder="059678456"
              type="text"
              value={`${updatedUser?.notary_commission_number || '' } `}
              
            />
          </div>
        </div>
      )}
      <div className="signature__body-wrapper">
      <Box ref={stampImage} sx={{ width: "50%", margin: "auto" }} >
      <TopCard>
        <Box  
          sx={{ border: "2px solid black" ,  }}
        
        >
        
        <Typography sx={{ fontSize: 16, borderBottom: "2px solid black", padding: "7px", textAlign: "center", textTransform:"uppercase", fontWeight: "bold"}}  gutterBottom>
          Notary Public
        </Typography>
        <Paper elevation={0}>
          <Box sx={{  padding: "7px", textAlign: "center", borderBottom: "2px solid black" }}>
           
            <Typography sx={{ fontSize: 17, fontWeight: "bold", display: "flex", justifyContent: "space-evenly", alignItems: "center"}} gutterBottom>
            <StarIcon fontSize='small'></StarIcon> {`${updatedUser?.first_name} ${updatedUser?.last_name}`}  <StarIcon fontSize='small'></StarIcon>
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }} gutterBottom>
             SCN. {`${updatedUser?.notary_commission_number || '' } `}
            </Typography>
          </Box>
        </Paper>
       <Box sx={{ fontSize: 14,padding: "7px", fontWeight: "bold" }}>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", textAlign: "center"}} >
        {`${updatedUser?.phone } `}
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", textAlign: "center" }} >
        {`${updatedUser?.email } `}
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", textAlign: "center" }} >
        {`${updatedUser?.address}, ${updatedUser?.state?.name},  ${updatedUser?.country?.name} `}
        </Typography>
       </Box>
     
        </Box>
      </TopCard>
    
    </Box>
        {/* <span className={styles.upload__info}>File should be max 2MB. JPEG, JPG and PNG</span> */}
        <div className="container col-5">
        <Button
        className="mb-1"
        theme="primary"
        width={161}
        onClick={() => saveHtmlAsImage()}
        
        // disabled={actionType === 'requests' ? isDisabled : isDefaultDisabled}
       
      >
       Adopt
      </Button>
      {/* <div className={fetching ? 'signature__body--disabled mt-2' : ''} /> */}
      {/* <img src={companyStamp?.file_url} alt="seal" /> */}
        </div>
        <div className="mt-1" />
        {showAgreement && <SignaturePolicy acceptPolicy={acceptPolicy} setAcceptPolicy={setAcceptPolicy} />}

        <div className="bb-1 mb-2" />
        <Button
          className="mb-1"
          theme="primary"
          width={161}
          onClick={() => {
            onSave();
          }}
          loading={loading} 
          disabled={ isDisabled || !companyStamp?.file_url}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

StampWrapper.defaultProps = {
  actionType: 'default',
  requestData: {},
  showAgreement: false
};

export default StampWrapper;

