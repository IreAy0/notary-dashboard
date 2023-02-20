import React from 'react';
import styles from 'components/Document/index.module.scss';
import { Doc } from 'types/document';
import { getFileType } from 'utils/formatString';
import history from 'utils/history';
import DocumentLoader from 'components/DocumentLoader';

interface Props {
  doc: Doc | undefined;
  docWidth?: number;
  type?: string;
  isCentered?: boolean;
}

const FileViewer = require('react-file-viewer');
const CustomErrorComponent = require('custom-error');

const DocumentViewer = ({ doc, docWidth, type, isCentered }: Props) => {
  const docUrl = type === 'request' ? doc?.file_url : doc?.document_url;
  const fileType = docUrl && getFileType(docUrl);

  

  // console.log(fileType, 'type', doc)

  return (
    <div className={styles.document__view}>
      {/* {doc &&
        doc?.signatureFields &&
        doc?.signatureFields.map((field: any) => {
          const { signature, position_x, position_y, field_id, field_type } = field;

          const url = signature || field?.signature_url;

          let height;
          switch (field_type) {
            case 'text_area':
              height = 12;
              break;

            case 'stamp':
              height = 85;
              break;

            case 'seal':
              height = 120;
              break;

            case 'profile_picture':
              height = 140;
              break;

            case 'text':
              height = 30;
              break;

            case 'date':
              height = 30;
              break;

            default:
              height = 30;
              break;
          }

          return (
            <>
              {field_type === 'text_area' ? (
                <div>
                  <span
                    style={{
                      position: 'absolute',
                      top: `${position_y}px`,
                      left: `${position_x}px`,
                      zIndex: 1000,
                      fontSize: `${height}px`,
                      paddingTop: '10px'
                    }}
                  >
                    {url}
                  </span>
                </div>
              ) : (
                <img
                  key={field_id}
                  style={
                    field_type === 'profile_picture'
                      ? {
                          position: 'absolute',
                          zIndex: 1000,
                          height: `${height}px`,
                          width: '120px',
                          objectFit: 'cover',
                          top: `${position_y}px`,
                          left: `${position_x}px`
                        }
                      : {
                          position: 'absolute',
                          top: `${position_y}px`,
                          left: `${position_x}px`,
                          zIndex: 1000,
                          height: `${height}px`
                        }
                  }
                  src={
                    field?.signature_url_base64
                      ? `data:image/png;base64, ${field?.signature_url_base64}`
                      : `${signature}?time=${new Date().toISOString()}` || `${field?.signature_url}?time=${new Date().toISOString()}`
                  }
                  alt=""
                />
              )}
            </>
          );
        })} */}


      {docUrl ? (
        <div className={isCentered ? styles.page__center : ''} style={{ width: `${docWidth}px` , margin: 'auto' }} key={doc?.id}>
           
            {!doc ? <DocumentLoader /> : 
          <FileViewer
            fileType={fileType}
            filePath={docUrl}
            onError={CustomErrorComponent}
            errorComponent={CustomErrorComponent}
            unsupportedComponent={CustomErrorComponent}
          />
        }
        </div>
      ) : (
        <div className={styles.doc__error}>Unable to load document</div>
      )}
    </div>
  );
};

DocumentViewer.defaultProps = {
  type: 'document',
  docWidth: 750,
  isCentered: true
};

export default DocumentViewer;

