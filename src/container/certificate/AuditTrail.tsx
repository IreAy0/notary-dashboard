import React from 'react';
import styles from './certificate.module.scss';

interface Props {
  docDetails: any;
}

const AuditTrail = ({ docDetails }: Props) => {
  const data = docDetails && docDetails.requestTransactionCertificate;

  return (
    <div className="mt-4">
      <h2 className={styles.section__header}>Audit Trail</h2>

      {data?.requestTrail &&
        data?.requestTrail.map((item: any) => (
          <div className={styles.audit__section} key={item.id}>
            <div className={styles.info}>{item.content}</div>
            <div className={styles.time}>{item.activity_time}</div>
          </div>
        ))}
    </div>
  );
};

export default AuditTrail;
