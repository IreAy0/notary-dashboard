import React, { useState, useEffect, useCallback } from 'react';
import { singleRequestHeaders } from 'mocks/table';
import classNames from 'classnames';
import Button from 'components/Button';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { getRequestDetails, confirmRequest, cancelNotaryRequest, getSessionLink } from 're-ducks/request';
import { useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import ConfirmationModal from 'container/Modal/ConfirmationModal';
import useTypedSelector from 'hooks/useTypedSelector';
import { RootState } from 're-ducks/rootReducer';
import { RequestAcceptance } from 'types/requests';
import toast from 'react-hot-toast';
import externalTab from '../../assets/icons/external-tab.svg';
import styles from '../MyRequest/request.module.scss';
import Dashboard from '../../layouts/dashboard';
import Table from '../../components/Table';
import Badge from '../../components/Badge';

export interface Props {
  data: any;
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

const SingleRequest = () => {
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState<any>({});
  const [selectedRequest, setSelectedRequest] = useState<RequestAcceptance>({} as RequestAcceptance);
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const user: any = useTypedSelector((state: RootState) => state?.auth?.signIn);

  const fetchRequestDetails = useCallback(() => {
    dispatch(
      getRequestDetails(
        { id },
        (requestData) => {
          console.log(requestData)
          setRequest(requestData);
          setLoading(false);
        },
        (error) => {
          toast.error(error);
          setLoading(false);
        }
      )
    );
  }, [id, dispatch]);

  useEffect(fetchRequestDetails, [fetchRequestDetails]);

  const goBack = () => {
    history.push('/requests');
  };

  const cancelRequest = () => {
    dispatch(
      cancelNotaryRequest(
        {
          ...selectedRequest
        },
        () => {
          fetchRequestDetails();
          toast.success('Request cancelled successfully');
          setSelectedRequest({} as RequestAcceptance);
        },
        (error: string) => {
          setSelectedRequest({} as RequestAcceptance);
          toast.error(error);
        }
      )
    );
  };

  const confirmOrRejectRequest = () => {
    console.log(selectedRequest, 'sr')
    dispatch(
      confirmRequest(
        {
          ...selectedRequest
        },
        () => {
          fetchRequestDetails();
          toast.success(`Request ${selectedRequest.type === 'accept' ? 'accepted' : 'rejected'} successfully`);
          setSelectedRequest({} as RequestAcceptance);
        },
        (error: string) => {
          setSelectedRequest({} as RequestAcceptance);
          toast.error(error);
        }
      )
    );
  };


  const confirmationText = selectedRequest.type === 'accept' ? 'Yes, Accept' : 'Reject';

  const handleSessionLink = () => {
    dispatch(
      getSessionLink(
        {
          request_id: request?.request_id,
          type: "notary",
          participant_id: user?.id
        },
        (res:any) => {
          const token:any = new URL(res?.session_url)?.searchParams?.get('token');
          localStorage?.setItem('accessToken', token);
          window.location.href = res?.session_url
        },
        (error) => {
          toast.error(error);
        }
      )
    )
  }

  console.log(selectedRequest, 'sr')

  return (
    <Dashboard>
      <div className={styles.request_container}>
        <div className={styles.request_container__flex}>
          <h4 className={styles.request_container__header}>
            <button onClick={goBack} className="flex flex__item-center">
              <svg className="mr-1" width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 16.5v-3h16v-2H6v-3l-4 4 4 4Z" fill="#363740" />
              </svg>
              {request?.document_name}
            </button>
          </h4>
          <div>
            {request.status === 'Awaiting' && (
              <>
                <Button onClick={() => setSelectedRequest({ type: 'accept', id :request?.id , body: {
                  "status": "Accepted",
                  "schedule_session_id":  request?.schedule_session?.id,
                  "schedule_session_request_id": request?.schedule_session_id
                }  })} theme="primary">
                  Accept
                </Button>
                <Button onClick={() => setSelectedRequest({ type: 'reject', id :request?.id , body: {
                  "status": "Rejected",
                  "schedule_session_id":  request?.schedule_session?.id,
                  "schedule_session_request_id": request?.id
                }   })} theme="plain">
                  <span className="text--red">Reject</span>
                </Button>
              </>)}

            {request.status !== "cancelled" && request.status !== "Awaiting" && request.status !== "pay now" && !loading && <Button theme="plain" onClick={() => setSelectedRequest({ type: 'cancel', id :request?.id , body: request  })}>
                <span className="text--red">Cancel Invitation</span>
            </Button>}
          </div>
        </div>
        <div className={styles.session_container}>
          {!loading && request?.status !== 'Awaiting' && (
            <div className={styles.session_container__document_time}>
              <p className={styles.session_container__title}>Document Attached:</p>
              <span className={styles.session_container__document_link}>
                <img src={externalTab} alt="Icon" />
                <Link
                  className={classNames(styles.session_container__link, 'text--blue text--600')}
                  to={`/requests/${request?.id}/document`}
                >
                  {request?.document_name}
                </Link>
              </span>
            </div>
          )}
          <div className={styles.session_container__document_time}>
            <p className={styles.session_container__title}>Meeting timeframe</p>
            {!loading && (
              <span className={styles.session_container__timeframe}>
                {format(parseISO(request.date), 'PPPP')} ({request.start_time})
              </span>
            )}
          </div>
          {request?.status !== "cancelled" && request?.status !== "Awaiting" && request?.status !== "pay now" &&  !loading ? <div className={classNames(styles.join_button, 'mt-1')}>
              <Button theme='primary' onClick={() => handleSessionLink()}>Join Call</Button>
            </div> : null}
        </div>
        <div className="mt-1">
          <Table type="primary" tableData={request?.participants} headers={singleRequestHeaders} loading={loading}>
            {(row) => {
              const isSigner = <span>{row?.is_signer ? 'Signer' : 'Witness'}</span>;

              return (
                <>
                  <td className="table__row-text center">
                    <span className="text--600 text--blue">{row?.name}</span> ({row?.is_request_owner && row.is_signer ? 'Owner' : isSigner}
                    )
                  </td>
                  <td className="table__row-text center">{row?.phone_number}</td>
                  <td className="table__row-text center">{row?.email}</td>
                  <td className="table__row-text center">
                    <Badge size="md" theme={badgeType(row?.status.toString())} type="secondary">
                      {row?.status}
                    </Badge>
                  </td>
                </>
              );
            }}
          </Table>
        </div>

        {selectedRequest.type && (
          <ConfirmationModal
            isOpen={!!selectedRequest.type}
            isClose={() => setSelectedRequest({} as RequestAcceptance)}
            action={selectedRequest.type === 'cancel' ? cancelRequest : confirmOrRejectRequest}
            buttonCaption={selectedRequest.type === 'cancel' ? 'Cancel' : confirmationText}
          />
        )}
      </div>
    </Dashboard>
  );
};
export default SingleRequest;

