import React from 'react';
import Tonote from 'assets/icons/icons/tonote.svg';
import moment from 'moment';
import styles from './certificate.module.scss';
import AuditTrail from './AuditTrail';

interface Props {
  docDetails: any;
}

const DocCertificate = ({ docDetails }: Props) => {
  const data = docDetails && docDetails.requestTransactionCertificate;
  const allParticipants = data?.signerParticipantsDetails.concat(data?.witnessParticipantsDetails);

  return (
    <div className="mt-4">
      <h2 className={styles.section__header}>Payment Certificate</h2>

      <div className={styles.cert__section}>
        <div className={styles.cert__section__header}>
          <h1>Digital Transaction Certificate</h1>
          <p>
            <span>Document Ref:</span> {data?.requestDetails?.document_reference}
          </p>
        </div>

        <div className={styles.cert__section__details}>
          <h2>NOTARISED DOCUMENT NAME: {data?.requestDetails?.document_name}</h2>
          <h3>Document completed by all parties on:</h3>
          <h4>{data?.requestDetails?.document_completed_time}</h4>
        </div>

        <div className={styles.cert__section__signers}>
          {allParticipants &&
            allParticipants.map((item: any) => (
              <div className={styles.single} key={item.id}>
                <div className={styles.single__left}>
                  <div className={styles.header}>
                    <p>{item.full_name}</p>
                    <span>{item?.type}</span>
                  </div>

                  <div className={styles.email}>
                    <h5>Verify E-mail :</h5>
                    <p>{item?.email}</p>
                  </div>

                  <div className={styles.commission__no}>
                    <span>Commission Number:</span>
                    <h4>{item?.commission_number}</h4>
                  </div>

                  <div className={styles.time}>
                    <div className={styles.address}>
                      <span>IP:</span>
                      {item?.ip_address}
                    </div>

                    <h4>{item?.signed_at ? moment(item?.signed_at).format('D MMMM YYYY') : 'N/A'}</h4>

                    <h4>
                      {item?.signed_at
                        ? `${moment(item?.signed_at).format('hh:mm:ss  zz')} ${moment(item?.signed_at).format('zz')}`
                        : 'N/A'}
                    </h4>
                  </div>
                </div>

                <div className={styles.single__right}>
                  {item?.signature_url || item?.signature_url_base64 ? (
                    <div className={styles.signature}>
                      <img src={`data:image/png;base64, ${item?.signature_url_base64}`} alt="signature" />
                    </div>
                  ) : (
                    <span>Nil</span>
                  )}
                </div>
              </div>
            ))}
        </div>

        <AuditTrail docDetails={docDetails} />

        <div className={styles.cert__section__stamp}>
          <div className={styles.image}>
            <img src={Tonote} alt="tonote stamp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocCertificate;

