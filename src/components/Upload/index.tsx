import React, { useState } from 'react';
import styles from './Upload.module.scss';

export interface Props {
  label: string;
  fileRule: string;
  iconName?: string;
  maxFilesize: number;
  showPreview?: boolean;
  placeholder: string;
}

const Upload = ({ label, placeholder, fileRule, iconName, maxFilesize, showPreview = false }: Props) => {
  const [filename, setFilename] = useState<File>();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target as HTMLInputElement;

    if (!!files && files.length) {
      setFilename(files[0]);
    }
  };

  return (
    <div className={styles.upload__wrapper}>
      {!showPreview && (
        <>
          <p className={styles.upload__label}>{label}</p>
          <label className={styles.upload} htmlFor="upload-comp">
            {iconName ? (
              <img className="mr-1" src={iconName} alt="icon" />
            ) : (
              <svg className={styles.upload__icon} width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M42.227 10.999h-6.94v-.713a5.772 5.772 0 0 0-5.77-5.77H18.482a5.771 5.771 0 0 0-5.77 5.77v.713h-6.94A5.77 5.77 0 0 0 0 16.769v20.944a5.771 5.771 0 0 0 5.77 5.77h36.46a5.771 5.771 0 0 0 5.77-5.77V16.77a5.774 5.774 0 0 0-5.773-5.77Zm-18.23 26.499c-6.01 0-10.899-4.888-10.899-10.9 0-6.01 4.888-10.898 10.9-10.898 6.01 0 10.899 4.887 10.899 10.899 0 6.01-4.89 10.899-10.9 10.899Zm5.77-10.9a5.78 5.78 0 0 1-5.77 5.77 5.78 5.78 0 0 1-5.77-5.77c0-3.18 2.59-5.77 5.77-5.77 3.18 0 5.77 2.59 5.77 5.77Z"
                  fill="#003BB3"
                />
              </svg>
            )}
            <div>
              <span className={styles.upload__title}>{placeholder}</span>
              <br />
              <span className={styles.upload__caption}>{filename?.name || fileRule}</span>
            </div>
            <input onChange={(e) => handleFile(e)} className="sr-only" type="file" name="" id="upload-comp" />
          </label>
          <span className={styles.upload__meta}>
            File should be max
            {maxFilesize}
            Mb
          </span>
        </>
      )}
    </div>
  );
};

Upload.defaultProps = {
  iconName: '',
  showPreview: false
}
export default Upload;
