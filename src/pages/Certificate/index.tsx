/* eslint-disable new-cap */
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboard from 'layouts/dashboard';
import styles from 'container/certificate/certificate.module.scss';
import printer from 'assets/icons/icons/printer.svg';
import download from 'assets/icons/icons/downloadDocIcon.svg';
import { getFileName } from 'utils/formatString';
import DocCertificate from 'container/certificate/Certificate';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DocumentViewer from 'components/Document';

const Certificate = (props) => {
  const history = useHistory();
  const { location } = props;

  const goBack = () => {
    history.goBack();
  };

  const [downloading, setDownloading] = useState<boolean>(false);
  const docDetails = location && location.state;

  const componentRef = useRef<HTMLDivElement>(null);
  const data = docDetails && docDetails.requestTransactionCertificate;
  const docName = getFileName(data?.requestDetails?.document_name);

  const downloadCertificate = () => {
    const pdf = document.getElementById('pdf');
    setDownloading(true);

    if (pdf) {
      html2canvas(pdf).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.3);
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        const doc = new jsPDF('p', 'mm');
        let position = 0;

        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save(`${docName}.pdf`);
        setDownloading(false);
      });
    }
  };

  return (
    <Dashboard>
      <div className={styles.document__wrapper}>
        <header className={styles.document__header}>
          <button onClick={goBack} className="flex flex__item-center">
            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.158 7.152L0.106 4.016L3.158 0.879999H5.622L2.57 4.016L5.622 7.152H3.158ZM14.1058 3.176V4.828H8.16978V3.176H14.1058Z"
                fill="#03060B"
              />
            </svg>

            <span>{docName || 'N/A'}</span>
          </button>
        </header>

        <div className={styles.document__content}>
          <div className={styles.document__content__header}>
            <ReactToPrint
              trigger={() => (
                <button className="mr-1" title="Print">
                  <img src={printer} alt="print" />
                </button>
              )}
              content={() => componentRef.current}
            />

            <button title="Download" onClick={() => downloadCertificate()} disabled={downloading}>
              {downloading ? (
                <div className={styles.progress__bar}>
                  <div className={styles.circle__border} />
                </div>
              ) : (
                <img src={download} alt="download" />
              )}
            </button>
          </div>

          <div className={styles.certificate} ref={componentRef} id="pdf">
            <div className={styles.certificate__doc}>
              <h2 className={styles.section__header}>{docName}</h2>

              <DocumentViewer type="request" doc={docDetails} />
            </div>

            <DocCertificate docDetails={docDetails} />
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Certificate;

