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
import { useHistory, useLocation } from 'react-router-dom';
import SignaturePolicy from 'container/document/SignaturePolicy';
import CheckMark from 'assets/icons/CheckMark';
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
import Grid from '@mui/material/Grid';

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

const StampWrapper = ({ setSignature, actionType, requestData, Save, showAgreement, prevStep }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [adopt, setAdopting] = useState<boolean>(false);
  const [editStamp, setEditStamp] = useState<boolean>(false);
  const [stampSuccess, setStampSuccess] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<any>()
  const history = useHistory()
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
    setAdopting(true)
    if (stampImage.current) {
      html2canvas(stampImage.current, { allowTaint: true }).then((canvas) => {
       
        const url = canvas.toDataURL('image/png');
        setCompanyStamp({
          ...companyStamp, 
          file_url: url
        });
        setAdopting(false)
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
      <div style={{flexDirection : 'column'}} className="signature__body-wrapper ">
      <div className="mt-2">
      <Grid container spacing={2}>
  <Grid item xs={12} md={7}>
  <Box ref={stampImage} sx={{ width: {
      xs: '100%', // theme.breakpoints.up('xs')
      // sm: 200, // theme.breakpoints.up('sm')
      // theme.breakpoints.up('md')
      // lg: 400, // theme.breakpoints.up('lg')
      // xl: 500, // theme.breakpoints.up('xl')
    }, margin: "auto" }} >
   
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
            <StarIcon fontSize='small'></StarIcon> <span>{`${updatedUser?.first_name} ${updatedUser?.last_name}`}</span>   <StarIcon fontSize='small'></StarIcon>
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
  </Grid>
  <Grid item xs={12} md={5}>
        <div className=" py-1">
        <span className="text--black text--700">* Kindly click ‘here’ before saving</span>
        <Button
        className="mb-1"
        theme="primary"
        width={161}
        onClick={() => saveHtmlAsImage()}
        loading={adopt}
        disabled={adopt === true}
        icon={companyStamp?.file_url ? <CheckMark className='ml-1'/> : null }
        // disabled={actionType === 'requests' ? isDisabled : isDefaultDisabled}
       
      >
        {companyStamp?.file_url ? 'Adopted' : 'Adopt'}
      </Button>
      {/* <div className={fetching ? 'signature__body--disabled mt-2' : ''} /> */}
      {/* <img src={companyStamp?.file_url} alt="seal" /> */}
        </div>
  </Grid>
 
</Grid>
    
        {/* <span className={styles.upload__info}>File should be max 2MB. JPEG, JPG and PNG</span> */}
      
      </div>
      
        <div className="mt-1" />
        {showAgreement && <SignaturePolicy policy='By clicking adopt, I agree that this seal is as valid as my traditional seal to the extent allowed by law' acceptPolicy={acceptPolicy} setAcceptPolicy={setAcceptPolicy} />}

        <div className="bb-1 mb-2" />
        <div>
        <Button onClick={prevStep} type="button" theme="grey" variant="outline" style={{borderRadius: '50%'}} className='mr-2'>
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                      fill="#A1A0A0" />
                  </svg>
        </Button>
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
    </div>
  );
};

StampWrapper.defaultProps = {
  actionType: 'default',
  requestData: {},
  showAgreement: false
};

export default StampWrapper;

