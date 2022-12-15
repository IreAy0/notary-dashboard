/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'components/Button';
import useTypedSelector from 'hooks/useTypedSelector';
import { Divider, ListItemText, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
// import { IconButton } from 'material-ui';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { getAllCompleteRequestAction } from 're-ducks/locker';
import { fetchUserProfile, fetchUserSignature } from 're-ducks/user';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import instance from 'services/axios';
import IconButton from '@mui/material/IconButton';
import SignaturePolicy from 'container/document/SignaturePolicy';
import styles from './Upload.module.scss';

export interface Props {
  label: string;
  fileRule: string;
  iconName?: string;
  maxFilesize: number;
  showPreview?: boolean;
  placeholder: string;
  isSaving: boolean;
  onSave: (data: object) => void;
  fileURL: any;
  fetching: boolean;
  showAgreement: boolean;
  prevStep: () => void;
}

const UploadSignature = ({ label, placeholder, fileRule, iconName, showAgreement, maxFilesize, showPreview = false, isSaving, onSave, fetching, fileURL,  prevStep }: Props) => {
  const [filename, setFilename] = useState<any>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { locker }: any = useTypedSelector((state) => state);
  const user: any = useTypedSelector((state) => state);
  const [fileBase64, setFileBase64] = useState<any>("")
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [previewFiles, setPreviewFiles] = useState<any>("");
  const [removed, setRemoved] = useState<any>(false)
  const [errorMessage, setErrorMessage] = useState<any>("")
  const [fileData, setFileData] = useState<any>('');
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [fetchingFiles, setFetchingFiles] = useState<boolean>(true);
  const [signatureFile, setSignatureFile] = useState<string>('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files }: any = e.target as HTMLInputElement;

   
    for (let i = 0; i < files.length; i += 1) {
      if(files[i].size > 2097152){
        setErrorMessage("File is too big!")

        return

      } 
      const reader = new FileReader();
      const params = files[i];
      reader.onloadend = () => {
        // fileData.files.push(reader?.result)
        setFileData(reader.result)
        setErrorMessage("")
        
        // previewImage: URL.createObjectURL(event.target.files[0]),
      };
      setPreviewFiles(URL.createObjectURL(files[0]))
      reader.readAsDataURL(params);
    }
    e.target.value = ''


  };


  // useEffect(() => { 
  //   if (previewFiles.length === 0 || fileData.files.length === 0) {
  //     setFileData({title: '', files: []})
  //     setPreviewFiles([])
  //   } 
  // }, [removed])

  const fetchAllCompleteRequest = useCallback(
    (nextPage: any = 1, itemsPerPage: any = 10) => {
      setLoading(true);
      // setDataPerPage(itemsPerPage);
      const params = {
        page: nextPage === 0 ? 1 : nextPage,
        per_page: itemsPerPage
      };
      dispatch(
        getAllCompleteRequestAction(
          { params },
          (res: any) => {
            setLoading(false);            
            // setCompletedRequest(res);
          },
          () => {
            setLoading(false);
          }
        )
      );
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllCompleteRequest();
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {

    dispatch(
      fetchUserProfile(
        
        {},
        () => {
         
        },
        () => {}
      )
    );
  }, [dispatch]);

  const saveImage = async () => {
    // if (fileData.files) {
    //   if (onSave) {
    //     onSave({
          
    //       fileType: 'signature',
    //       sigType: '',
    //       done: () => setShowImage(true)
    //     });
    //   }
    // }
    
    // const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');

    if (fileData) {
      onSave({
        file: fileData,
        type: 'Signature',
        category: 'Upload',

        // fileType: 'signature',
        // sigType: 'draw',
        // file,
        done: () => {
          // setShowImage(true)
          // sigCanvasRef.current.clear()
          setIsDisabled(true)
          // setImageURL('')
          setFileData('')
          dispatch(
            fetchUserSignature(
              
              () => {
                setFetchingFiles(false);
                // setCurrentSign(data);
              },
              (error) => {
                setFetchingFiles(false);

                return error;
              }
            )
          );
          toast.success('Signature created successfully.');

        }
        // nextTab: {
        //   label: 'Traditional Seal'
        // }
      });
    }
  };

  useEffect(() => {
    if (fileURL) {
      setSignatureFile(fileURL?.Signature?.find(
        (signature) => signature?.category === "Upload"
      )?.file || '');
    }
  }, [fileURL]);

  const uploadDocument = () => {
    setLoading(true)
    // const fileData = {
    //   "title": filename?.name,
    //   "files": images
    // }
    if(fileData.title){
      instance.post('/notary/notary-locker', fileData )
        .then((res: any) => {
          
          fetchAllCompleteRequest();
          toast.success(res?.data?.data?.message);
          setFileData({title: '', files: []})
          setPreviewFiles([])
          setImages([])
          setFilename('')
          setLoading(false)
        })
        .catch((err) => { 
          setLoading(false)
          toast.error(err?.response?.data?.data?.message);
        })
    }
  }
  
  useEffect(() => {
    if (!showAgreement && isSaving) {
      setIsDisabled(true);
    } else if (showAgreement && (isSaving || !acceptPolicy)) {
      setIsDisabled(true);
    } else if (showAgreement && (!fileData || !acceptPolicy)){
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [isSaving, acceptPolicy, showAgreement]);

  // console.log(fileData, 'files', fileURL, signatureFile)

  return (
    <div className="mt-2">
    <div className='flex flex__start flex__item-center'>       
      <div className={styles.upload__wrapper}>
      {!showPreview && (
        <>
          <p className={styles.upload__label}>{label}</p>
          <label className={styles.upload} htmlFor="upload-comp">
            {iconName ? (
              <img className="mr-1" src={iconName} alt="icon" />
            ) : (
              <svg className="mr-1" width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.6874 10.838C21.088 10.7182 20.4886 10.6582 19.8293 10.6582C14.7942 10.6582 10.6582 14.7942 10.6582 19.8293C10.6582 24.6245 14.4346 28.6409 19.1697 29.0004H20.4286C20.7882 29.0004 21.2078 28.9404 21.6275 28.8206C25.8831 27.9814 29.0002 24.2052 29.0002 19.8293C29.0002 15.5135 25.9432 11.7374 21.6876 10.838L21.6874 10.838ZM23.4855 19.2299L20.4883 16.1729V26.3632H19.1697V16.1729L16.1725 19.2299L15.2135 18.3309L19.7691 13.7154L24.3248 18.3309L23.4855 19.2299Z" fill="black"/>
<path d="M12.1569 26.9627C11.9171 26.7229 11.7373 26.4831 11.5575 26.2435C11.3777 26.0037 11.1979 25.7639 11.0778 25.5243C11.0178 25.524 11.0178 25.464 10.958 25.4042C10.7782 25.1644 10.6584 24.9246 10.5384 24.625C10.4186 24.3852 10.2986 24.0856 10.1788 23.8458C10.1788 23.7858 10.1188 23.726 10.1188 23.6659C10.0588 23.4261 9.93899 23.2463 9.87898 23.0065C9.87898 22.9465 9.81898 22.8867 9.81898 22.8267C9.75897 22.5271 9.63917 22.2873 9.63917 21.9874C9.63917 21.9274 9.63917 21.8676 9.57916 21.8076C9.51915 21.5678 9.51915 21.328 9.45936 21.0884V20.8486C9.45936 20.549 9.39936 20.2491 9.39936 19.9495C9.39936 14.1954 14.0748 9.45985 19.8891 9.45985C20.1887 9.45985 20.4885 9.45985 20.8481 9.51985H21.0279H21.2077L21.2079 0.228516H6.82201V6.10288H0.228516V29.0003H14.7346C13.7754 28.4609 12.9363 27.8015 12.1571 26.9624C12.2169 27.0222 12.2169 27.0222 12.1571 26.9624L12.1569 26.9627ZM9.3996 2.2068H18.5707V3.52544H9.3996V2.2068ZM9.3996 4.78414H18.5707V6.10278L9.3996 6.103V4.78414ZM2.20664 7.4217H14.6144V8.74035H2.20664V7.4217ZM2.20664 10.059H11.3778V11.3777L2.20664 11.3779V10.059ZM2.20664 12.6366H9.3996V13.9553H2.20664V12.6366ZM8.74002 19.1705H2.20664V17.8519H8.74002V19.1705ZM8.74002 16.593H2.20664V15.2743H8.74002V16.593Z" fill="black"/>
<path d="M5.44249 0.228516H5.08288L2.80516 2.74602L1.00684 4.7839H5.44244L5.44249 0.228516Z" fill="black"/>
</svg>
            )}
            <div>
              <span className={styles.upload__title}>{placeholder}</span>
              {/* <br /> */}
              <br />
              <span className={styles.upload__meta}>
            File should be max {maxFilesize} Mb
          </span>
          <Typography sx={{
            color: 'red'
          }} variant="body2" gutterBottom>
        {errorMessage}
      </Typography>
            </div>
            <input multiple onChange={(e) => handleFile(e)} className="sr-only" type="file" name="" id="upload-comp" />
          </label>
          {/* <span className={styles.upload__meta}>
            File should be max
             {maxFilesize}

            Mb
          </span> */}
        </>
      )}


    </div>
  
          <div>
            <img className="preview " src={previewFiles === '' ? signatureFile : previewFiles} alt="" />
          </div>
    
    {/* <Button onClick={() => uploadDocument()} type='button' disabled={!fileData.title || loading} loading={loading} size='sm' theme='primary'>Upload</Button> */}

    </div>
  <div>
  {showAgreement && <SignaturePolicy acceptPolicy={acceptPolicy} setAcceptPolicy={setAcceptPolicy} />}

<div className="bb-1 mb-2" />
<Button onClick={prevStep} type="button" theme="grey" variant="outline" style={{borderRadius: '50%'}} className='mr-2'>
  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                fill="#A1A0A0" />
            </svg>
  </Button>
<Button disabled={isDisabled} className="mb-1" theme="primary" width={161} loading={isSaving} onClick={() => saveImage()}>
  Save
</Button>
</div>


  </div>

  );
};

UploadSignature.defaultProps = {
  iconName: '',
  showPreview: false
}
export default UploadSignature;
