import React from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import styles from './toolbar.module.scss';

type AuditTrail = {
  [k: string]: string | number | Date;
};

interface Props {
  children: React.ReactNode;
  isSent: boolean;
  auditTrail: AuditTrail[];
  pageCount: number;
  docOwner: string;
}

const Toolbar = ({ pageCount, children, isSent, auditTrail, docOwner }: Props) => {
  const { pathname } = useLocation();

  const auditAction = (action: string) => {
    switch (action) {
      case 'ADOCSN':
        return 'Add signers';
      case 'CDOC':
        return 'Created';
      default:
        return action;
    }
  };

  const auditTrailList = () => {
    if (auditTrail.length > 0) {
      return auditTrail.map((item) => (
        <li key={item.id as string} className={styles.toolbar__item}>
          <span className={classNames('flex flex--item-center', styles.toolbar__icon)}>
            <svg className="" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x=".5" y=".5" width="15" height="15" rx="7.5" fill="#363740" stroke="#fff" />
              <path d="M7.682 7.682V5.111h.857v2.571h2.571v.857H8.54v2.572h-.857V8.539H5.11v-.857h2.572Z" fill="#fff" />
            </svg>
          </span>
          <div className="pl-1">
            <h3 className={styles.heading}>{docOwner}</h3>
            <span className={styles.caption}>{format(parseISO(item.updated_at as string), 'MM/dd/yyyy')}</span>

            <p className="">
              <span className={styles.highlight}>{auditAction(item.operation_type as string)}</span>{' '}
              {item.operation_type === 'CDOC' ? 'a document' : item.content}
            </p>
          </div>
        </li>
      ));
    }

    return <p className="text--sm">Nothing to see yet!</p>;
  };

  return (
    <aside className={styles.toolbar}>
      {!isSent || pathname.includes('sign') ? (
        <>
          <div className={styles.toolbar__header}>
            <div className={styles.heading}>Edit tools</div>
            <span className={styles.caption}>{pageCount === 1 ? `Page ${pageCount}` : `Pages 1 to ${pageCount}`}</span>
          </div>
          <div className="flex">
            <button className={styles.toolbar__btn}>
              <span className="sr-only">undo</span>
              <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m3.885 4.667 1.691 1.69-.943.943-3.3-3.3 3.3-3.3.943.943-1.69 1.69h4.78a5.333 5.333 0 1 1 0 10.667h-6v-1.333h6a4 4 0 0 0 0-8h-4.78Z"
                  fill="#363740"
                />
              </svg>
            </button>

            <button className={styles.toolbar__btn}>
              <span className="sr-only">redo</span>
              <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.115 4.667H7.333a4 4 0 0 0 0 8h6V14h-6a5.333 5.333 0 1 1 0-10.666h4.782l-1.691-1.691.943-.943 3.3 3.3-3.3 3.3-.943-.942 1.69-1.691Z"
                  fill="#363740"
                />
              </svg>
            </button>
          </div>
          {!isSent && <div className={styles.toolbar__content}>{children}</div>}
        </>
      ) : (
        <div>
          <div className={styles.toolbar__header}>
            <div className={styles.heading}>Audit Trail</div>
          </div>
          <ul className={styles.toolbar__list}>{auditTrailList()}</ul>
        </div>
      )}
    </aside>
  );
};

export default Toolbar;

