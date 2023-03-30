import Button from 'components/Button';
import useTypedSelector from 'hooks/useTypedSelector';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import { getAllCompleteRequestAction } from 're-ducks/locker';
import { fetchUserProfile } from 're-ducks/user';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import instance from 'services/axios';
import { getAllTemplates } from 're-ducks/template';
import styles from './Upload.module.scss';

export interface Props {
  label: string;
  fileRule: string;
  iconName?: string;
  maxFilesize: number;
  showPreview?: boolean;
  placeholder: string;
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

const TemplateUpload = ({ label, placeholder, fileRule, iconName, maxFilesize, showPreview = false }: Props) => {
  const [filename, setFilename] = useState<any>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { locker }: any = useTypedSelector((state) => state);
  const user: any = useTypedSelector((state) => state);
  const [fileBase64, setFileBase64] = useState<any>('');
  const [previewFiles, setPreviewFiles] = useState<any>([]);
  const [removed, setRemoved] = useState<any>(false);
  const [errorMessage, setErrorMessage] = useState<any>('');
  const [fileData, setFileData] = useState<any>({
    title: '',
    files: []
  });

  // eslint-disable-next-line consistent-return
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files }: any = e.target as HTMLInputElement;

    for (let i = 0; i < files.length; i += 1) {
      if (files[i].size > 2097152) {
        setErrorMessage('File is too big!');

        return;
      }
      const reader = new FileReader();
      const params = files[i];
      reader.onloadend = () => {
        setFileData({
          files: [reader?.result]
        });
        setErrorMessage('');
        if (!fileData.title || !fileData.title.trim()) {
          // fileData.title = params?.name.split('.').slice(0, -1).join('.');
          setFileData({
            title: params?.name.split('.').slice(0, -1).join('.'),
            files: [reader?.result]
          });
        }
        setPreviewFiles([params.name]);
      };

      reader.readAsDataURL(params);
    }
    e.target.value = '';
  };

  const removeItem = (i) => {
    const filtered = fileData.files.filter((file, index) => index !== i);
    const filteredPreview = previewFiles.filter((file, index) => index !== i);
    setPreviewFiles(filteredPreview);
    setFileData({ ...fileData, files: filtered });
    setRemoved(!removed);
  };

  useEffect(() => {
    if (previewFiles.length === 0 || fileData.files.length === 0) {
      setFileData({ title: '', files: [] });
      setPreviewFiles([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removed]);

  const fetchAllCompleteRequest = useCallback(
    (nextPage: any = 1, itemsPerPage: any = 10) => {
      setLoading(true);
      // setDataPerPage(itemsPerPage);
      const params = {
        page: nextPage === 0 ? 1 : nextPage,
        per_page: itemsPerPage
      };
      dispatch(
        getAllTemplates(
          (res: any) => {
            setLoading(false);
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
        () => {},
        () => {}
      )
    );
  }, [dispatch]);

  const uploadDocument = () => {
    setLoading(true);

    if (fileData.title) {
      // /api/v1/notary/document-templates
      instance
        .post('/notary/document-templates', fileData)
        .then((res) => {
          toast.success('Template uploaded successfully');
          fetchAllCompleteRequest();
          setLoading(false);
          setFileData({ title: '', files: [] });
          setPreviewFiles([]);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err?.message);
        });
    }
  };

  return (
    <div>
      <div className="flex flex__start flex__item-center">
        <div className={styles.upload__wrapper}>
          {!showPreview && (
            <>
              <p className={styles.upload__label}>{label}</p>
              <label className={styles.upload} htmlFor="upload-comp">
                {iconName ? (
                  <img className="mr-1" src={iconName} alt="icon" />
                ) : (
                  <svg className="mr-1" width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.6874 10.838C21.088 10.7182 20.4886 10.6582 19.8293 10.6582C14.7942 10.6582 10.6582 14.7942 10.6582 19.8293C10.6582 24.6245 14.4346 28.6409 19.1697 29.0004H20.4286C20.7882 29.0004 21.2078 28.9404 21.6275 28.8206C25.8831 27.9814 29.0002 24.2052 29.0002 19.8293C29.0002 15.5135 25.9432 11.7374 21.6876 10.838L21.6874 10.838ZM23.4855 19.2299L20.4883 16.1729V26.3632H19.1697V16.1729L16.1725 19.2299L15.2135 18.3309L19.7691 13.7154L24.3248 18.3309L23.4855 19.2299Z"
                      fill="black"
                    />
                    <path
                      d="M12.1569 26.9627C11.9171 26.7229 11.7373 26.4831 11.5575 26.2435C11.3777 26.0037 11.1979 25.7639 11.0778 25.5243C11.0178 25.524 11.0178 25.464 10.958 25.4042C10.7782 25.1644 10.6584 24.9246 10.5384 24.625C10.4186 24.3852 10.2986 24.0856 10.1788 23.8458C10.1788 23.7858 10.1188 23.726 10.1188 23.6659C10.0588 23.4261 9.93899 23.2463 9.87898 23.0065C9.87898 22.9465 9.81898 22.8867 9.81898 22.8267C9.75897 22.5271 9.63917 22.2873 9.63917 21.9874C9.63917 21.9274 9.63917 21.8676 9.57916 21.8076C9.51915 21.5678 9.51915 21.328 9.45936 21.0884V20.8486C9.45936 20.549 9.39936 20.2491 9.39936 19.9495C9.39936 14.1954 14.0748 9.45985 19.8891 9.45985C20.1887 9.45985 20.4885 9.45985 20.8481 9.51985H21.0279H21.2077L21.2079 0.228516H6.82201V6.10288H0.228516V29.0003H14.7346C13.7754 28.4609 12.9363 27.8015 12.1571 26.9624C12.2169 27.0222 12.2169 27.0222 12.1571 26.9624L12.1569 26.9627ZM9.3996 2.2068H18.5707V3.52544H9.3996V2.2068ZM9.3996 4.78414H18.5707V6.10278L9.3996 6.103V4.78414ZM2.20664 7.4217H14.6144V8.74035H2.20664V7.4217ZM2.20664 10.059H11.3778V11.3777L2.20664 11.3779V10.059ZM2.20664 12.6366H9.3996V13.9553H2.20664V12.6366ZM8.74002 19.1705H2.20664V17.8519H8.74002V19.1705ZM8.74002 16.593H2.20664V15.2743H8.74002V16.593Z"
                      fill="black"
                    />
                    <path d="M5.44249 0.228516H5.08288L2.80516 2.74602L1.00684 4.7839H5.44244L5.44249 0.228516Z" fill="black" />
                  </svg> // <svg className={styles.upload__icon} width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  //   <path
                  //     d="M42.227 10.999h-6.94v-.713a5.772 5.772 0 0 0-5.77-5.77H18.482a5.771 5.771 0 0 0-5.77 5.77v.713h-6.94A5.77 5.77 0 0 0 0 16.769v20.944a5.771 5.771 0 0 0 5.77 5.77h36.46a5.771 5.771 0 0 0 5.77-5.77V16.77a5.774 5.774 0 0 0-5.773-5.77Zm-18.23 26.499c-6.01 0-10.899-4.888-10.899-10.9 0-6.01 4.888-10.898 10.9-10.898 6.01 0 10.899 4.887 10.899 10.899 0 6.01-4.89 10.899-10.9 10.899Zm5.77-10.9a5.78 5.78 0 0 1-5.77 5.77 5.78 5.78 0 0 1-5.77-5.77c0-3.18 2.59-5.77 5.77-5.77 3.18 0 5.77 2.59 5.77 5.77Z"
                  //     fill="#766458"
                  //   />
                  // </svg>
                )}
                <div>
                  <span className={styles.upload__title}>{placeholder}</span>
                  <br />
                  <span className={styles.upload__meta}>File should be max {maxFilesize} Mb</span>
                  <Typography
                    sx={{
                      color: 'red'
                    }}
                    variant="body2"
                    gutterBottom
                  >
                    {errorMessage}
                  </Typography>
                </div>
                <input onChange={(e) => handleFile(e)} multiple className="sr-only" type="file" name="" id="upload-comp" />
              </label>

              {/* <span className={styles.upload__caption}></span> */}
            </>
          )}
        </div>

        <Button
          onClick={() => uploadDocument()}
          type="button"
          disabled={!fileData.title || loading}
          loading={loading}
          size="sm"
          theme="primary"
        >
          Upload
        </Button>

        {filename?.name || fileRule}
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List sx={{ maxWidth: 400 }}>
              {previewFiles.map((file, index) => (
                <ListItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '10px'
                  }}
                  secondaryAction={
                    <IconButton
                      onClick={() => removeItem(index)}
                      sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                      edge="end"
                      aria-label="delete"
                    >
                      <CloseIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={file} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

TemplateUpload.defaultProps = {
  iconName: '',
  showPreview: false
};
export default TemplateUpload;
