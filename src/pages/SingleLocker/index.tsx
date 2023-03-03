/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import { singleRequestHeaders } from 'mocks/table';
import { getRequestDetails } from 're-ducks/request';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OTPModal from 'container/Modal/OTPModal';
import toast from 'react-hot-toast';
import DocumentLoader from 'components/DocumentLoader';
import classNames from 'classnames';
import { getLockerDetails } from 're-ducks/locker/locker.actions';
import externalTab from '../../assets/icons/external-tab.svg';
import VideoIcon from '../../assets/icons/video-icon.svg';
import styles from '../MyRequest/request.module.scss';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import Dashboard from '../../dashboard/SidebarLayout/index';

export interface Props {
  data: any;
}
export interface  RandomData {
  email: string;
  phone: string;
  name: string;
  is_signer: boolean;
  is_request_owner: boolean;
  status: any
}

const badgeType = (status: string) => {
  switch (status) {
    case 'verified':
      return 'verified';
    case 'unverified':
      return 'unverified';
    default:
      return 'unverified';
  }
};


const SingleDetailLocker = () => {
  const [showOTPModal, setOTPModal] = useState(false);
  const [locker, setLocker] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id?: string }>();

  const history = useHistory();
  const dispatch = useDispatch();

  const mockRequest = {
    id: 1,
    document_name: 'Request 1',
    notary_fee: '8000',
    total_fee: '12000',
    status: 'verified',

    video_url: 
      'https://www.youtube.com/watch?v=7sDY4m8KNLc',
    document_url:
      'https://www.youtube.com/watch?v=7sDY4m8KNLc',
    participants : [
      {
        email: "ridiculus.mus.proin@aol.com",
        phone: "1-663-426-9766",
        name: "Lionel Mcclure",
        is_signer: true,
        is_request_owner: false,
        status: "verified"
      },
      {
        email: "elementum@icloud.edu",
        phone: "(578) 338-6437",
        name: "Brenden Thornton",
        is_signer: true,
        is_request_owner: false,
        status: "unverified"
      },
      {
        email: "aliquam.eros@hotmail.net",
        phone: "1-190-675-2117",
        name: "Lacota Oneal",
        is_signer: false,
        is_request_owner: true,
        status: "verified"
      },
      {
        email: "dictum.eu.placerat@protonmail.org",
        phone: "(651) 736-3437",
        name: "Venus Roberts",
        is_signer: false,
        is_request_owner: false,
        status: "verified"
      },
      {
        email: "sociis.natoque@protonmail.ca",
        phone: "1-501-695-8494",
        name: "Autumn Daniel",
        is_signer: true,
        is_request_owner: true,
        status: "unverified"
      },
      {
        email: "in.at@protonmail.ca",
        phone: "(124) 356-5864",
        name: "Grady Mueller",
        is_signer: true,
        is_request_owner: true,
        status: "unverified"
      }
    ]

  }
  const fetchRequestDetails = useCallback(() => {
    dispatch(
      getLockerDetails(
        { id },
        (res: any) => {
          setLoading(false);
          // console.log(res, 'res')
          setLocker(res);
        },
        (error) => {
          setLoading(false);
          toast.error(error);
        }
      )
    );
  }, [id, dispatch]);

  useEffect(fetchRequestDetails, [fetchRequestDetails]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <Dashboard>
      {loading ? (
        <div className={styles.request_container}>
          <DocumentLoader />
        </div>
      ) : (
        <div className={styles.request_container}>
          <h4 className={styles.request_container__header}>
            <button onClick={goBack} className="flex flex__item-center">
              <svg className="mr-1" width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 16.5v-3h16v-2H6v-3l-4 4 4 4Z" fill="#363740" />
              </svg>
              {locker?.title}
            </button>
          </h4>
          <div className={styles.session_container}>
            {locker?.status !== 'pending' && (
              <div className={styles.session_container__document_time}>
                <p className={styles.session_container__title}>Document Attached:</p>
                <span className={styles.session_container__document_link}>
                  <img src={externalTab} alt="" />{' '}
                  {/* <button className={styles.session_container__link} >
                    {mockRequest?.document_name}
                  </button> */}
                  <Link
                  className={classNames(styles.session_container__link, 'text--blue text--600')}
                  to={`/locker/${locker?.id}/document`}
                >
                   {locker?.title}
                </Link>
                </span>
              </div>
            )}
            <div className={styles.session_container__document_time}>
              <p className={styles.session_container__title}>Notary Fee</p>
              <p>N {Number(mockRequest?.notary_fee).toFixed(2)}</p>
            </div>
            <div className={styles.session_container__document_time}>
              <p className={styles.session_container__title}>Transaction Cost</p>
              <p>N {Number(mockRequest?.total_fee).toFixed(2)}</p>
            </div>
            <div className={styles.session_container__video_session}>
              <img src={VideoIcon} alt="" />
              <br/>
              <a className={styles.session_container__link} href={mockRequest?.video_url} target="blank">
              <span> {mockRequest?.video_url?.substring(0, 30)}....</span>
              </a>
            </div>
          </div>
          <div className="mt-1">
            <Table type="primary" tableData={locker?.participants || []} headers={singleRequestHeaders} loading={false}>
              {(row: any) => {
                const isSigner = <span>{row?.role === 'Signer' ? 'Signer' : 'Witness'}</span>;

                return (
                  <>
                    <td className="table__row-text center">
                      <span className="text--500" style={{ color: '#003BB3', textDecoration: 'underline', fontWeight: 600 }}>
                        {`${row?.user?.first_name} ${row?.user?.last_name}` || 'N/A'}
                      </span>
                      <span>({row?.ownerDocument && row.role === 'Signer' ? 'Owner' : row.role === 'Notary' ? 'Notary' : isSigner})</span>
                    </td>
                    <td className="table__row-text center">{row?.user?.phone|| 'N/A'}</td>
                    <td className="table__row-text center">{row?.user?.email || 'N/A'}</td>
                    <td className="table__row-text center" style={{ color: '#458FFF', fontWeight: '600', cursor: 'pointer' }} aria-hidden>
                      <Badge size="md" theme={badgeType(row?.status?.toString())} type="secondary">
                        {row?.status}
                      </Badge>
                    </td>
                  </>
                );
              }}
            </Table>
            {/* {showOTPModal && <OTPModal isOpen={showOTPModal} isClose={() => setOTPModal(false)} request={request} />} */}
          </div>
        </div>
      )}
    </Dashboard>
  );
};
export default SingleDetailLocker;

