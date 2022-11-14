import Button from 'components/Button';
import useTypedSelector from 'hooks/useTypedSelector';
import { Divider } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { getAllCompleteRequestAction } from 're-ducks/locker';
import { fetchUserProfile } from 're-ducks/user';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import instance from 'services/axios';
import styles from './Upload.module.scss';

export interface Props {
  label: string;
  fileRule: string;
  iconName?: string;
  maxFilesize: number;
  showPreview?: boolean;
  placeholder: string;
}

const TemplateUpload = ({ label, placeholder, fileRule, iconName, maxFilesize, showPreview = false }: Props) => {
  const [filename, setFilename] = useState<any>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { locker }: any = useTypedSelector((state) => state);
  const user: any = useTypedSelector((state) => state);
  const [fileBase64, setFileBase64] = useState<any>("")
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target as HTMLInputElement;

   
    if (!!files && files.length) {
      setFilename(files[0]);

      // const { files } = e.target;
      const validImageFiles: any = [];
      for (let i = 0; i < files.length; i =+1 ) {
        const file = files[i];
        validImageFiles.push(file);
      }
      if (validImageFiles.length) {
        setImageFiles(validImageFiles);
      }
    }


  };

  console.log(imageFiles, 'imageFiles')

  useEffect(() => {
    const images_new: any = []; const fileReaders:any = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result }: any =  fileReader;
          if (result) {

            images_new.push(result)
            console.log(result , e , 'result')
          }
          if (images_new.length === imageFiles.length && !isCancel) {
            setImages(images_new);
          }
        }
        fileReader.readAsDataURL(file);
        console.log(file, 'files')
      })
    };
    
    return () => {
      isCancel = true;
      fileReaders.forEach(fileReader => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imageFiles]);
  
  console.log(fileBase64, 'b64', images, imageFiles )

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
            console.log(res, 'file')
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

  // useEffect(() => {
  //   if(user?.user?.access_locker_documents === false){
  //     instance.get('/notary/notary-otp-locker')
  //       .then(res => {
  //         toast.success(res?.data?.message);
  //         console.log(res, 'response')
        
  //       })
  //   }
  // },[user])


  const uploadDocument = () => {
    console.log(filename, 'uploaded')
    setLoading(true)
    const fileData = {
      "title": filename?.name,
      "files": images
    }
    if(filename){
      // /api/v1/notary/document-templates
      instance.post('/notary/document-templates', fileData )
        .then(res => {
          toast.success(res?.data?.message);
          fetchAllCompleteRequest();
          setLoading(false)
        })
        .catch((err) => { 
          setLoading(false)
          toast.error(err?.message);
        })
    }
  }
  

  return (
    <div className='flex flex__start flex__item-center'>       
      <div className={styles.upload__wrapper}>
      {!showPreview && (
        <>
          <p className={styles.upload__label}>{label}</p>
          <label className={styles.upload} htmlFor="upload-comp">
            {iconName ? (
              <img className="mr-1" src={iconName} alt="icon" />
            ) : (
              <UploadFileIcon sx={{width:"48 !important", height:"48 !important ", color:'#003BB3'}} className={styles.upload__icon} fontSize='large'/>
              // <svg className={styles.upload__icon} width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
              //   <path
              //     d="M42.227 10.999h-6.94v-.713a5.772 5.772 0 0 0-5.77-5.77H18.482a5.771 5.771 0 0 0-5.77 5.77v.713h-6.94A5.77 5.77 0 0 0 0 16.769v20.944a5.771 5.771 0 0 0 5.77 5.77h36.46a5.771 5.771 0 0 0 5.77-5.77V16.77a5.774 5.774 0 0 0-5.773-5.77Zm-18.23 26.499c-6.01 0-10.899-4.888-10.899-10.9 0-6.01 4.888-10.898 10.9-10.898 6.01 0 10.899 4.887 10.899 10.899 0 6.01-4.89 10.899-10.9 10.899Zm5.77-10.9a5.78 5.78 0 0 1-5.77 5.77 5.78 5.78 0 0 1-5.77-5.77c0-3.18 2.59-5.77 5.77-5.77 3.18 0 5.77 2.59 5.77 5.77Z"
              //     fill="#003BB3"
              //   />
              // </svg>
            )}
            <div>
              <span className={styles.upload__title}>{placeholder}</span>
              <br />
              <span className={styles.upload__caption}>{filename?.name || fileRule}</span>
            </div>
            <input multiple onChange={(e) => handleFile(e)} className="sr-only" type="file" name="" id="upload-comp" />
          </label>
          <span className={styles.upload__meta}>
            File should be max
             {maxFilesize}

            Mb
          </span>
        </>
      )}


    </div>
    
    <Button onClick={() => uploadDocument()} type='button' disabled={!filename || loading} loading={loading} size='sm' theme='primary'>Upload</Button>

    </div>
  

  );
};

TemplateUpload.defaultProps = {
  iconName: '',
  showPreview: false
}
export default TemplateUpload;
