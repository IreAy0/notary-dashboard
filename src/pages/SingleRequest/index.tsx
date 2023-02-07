/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
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
import { RequestAcceptance, DocumentUpload } from 'types/requests';
import toast from 'react-hot-toast';
import instance from 'services/axios';
import { fetchUserProfile } from 're-ducks/user';
import { getLockerDetails } from 're-ducks/locker/locker.actions';
import Buttonstyles from '../../components/Button/button.module.scss';
import externalTab from '../../assets/icons/external-tab.svg';
import styles from '../MyRequest/request.module.scss';
import Dashboard from '../../dashboard/SidebarLayout/index';
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

interface FileInfo {
  name: string;
  base64: string;
}

const SingleRequest = () => {
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState<any>({});
  const [document, setDocument] = useState<any>([]);
  const [documentId, setDocumentId] = useState<any>('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileInfos, setFileInfos] = useState<FileInfo[]>([]);
  const [customFiles, setCustomFiles] = useState<any>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestAcceptance>({} as RequestAcceptance);
  // const [uploadDocument, setUploadDocument] = useState<DocumentUpload>({} as DocumentUpload);
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [participants, setParticipants] = useState<any>([]);
  const user: any = useTypedSelector((state: RootState) => state?.auth?.signIn);

  const getRequestParticipants = (Virtualid) => {
    instance.get(`/request-virtual-session/${Virtualid}`).then((res) => setParticipants(res?.data));
  };

  const fetchRequestDetails = useCallback(() => {
    dispatch(
      getRequestDetails(
        { id },
        (requestData: any) => {
          getRequestParticipants(requestData?.schedule_session_id);
          setRequest(requestData);
          setDocumentId(requestData.document_id);
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

  const fetchDocumentDetails = useCallback(() => {
    instance
      .get(`/documents/${documentId}`)
      .then((res: any) => {
        setDocument(res.data.data);
        // toast.success('Updates Successfully');
      })
      .catch((err) => {
        setLoading(false);
        // toast.error(err?.response?.data?.data?.message);
      });
  }, [documentId]);

  useEffect(fetchDocumentDetails, [fetchDocumentDetails]);

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

  useEffect(() => {
    dispatch(
      fetchUserProfile(
        {},
        () => {},
        () => {}
      )
    );
  }, [dispatch]);

  const uploadDocument = (file) => {
    if (file) {
      instance
        .put(`/custom-affidavit-request/${request?.schedule_session_id}`, { file })
        .then((res: any) => {
          fetchDocumentDetails();
          fetchRequestDetails();
          toast.success('Updates Successfully');
          setFiles(null);
          setFileInfos([]);
          setCustomFiles([]);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err?.response?.data?.data?.message);
        });
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: any = event.target.files;
    setFiles(selectedFiles);
    const FileInfos: FileInfo[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise<void>((resolve: any) => {
        reader.onload = () => {
          const base64 = reader.result as string;

          FileInfos.push({ name: file.name, base64 });
          customFiles.push(base64);
          // setCustomFiles([...customFiles, base64])
          resolve();
        };
      });
    }
    setFileInfos(FileInfos);
    uploadDocument(customFiles);
  };

  const handleDelete = () => {
    // setFileInfos((prevFileInfos) =>
    //   prevFileInfos.filter((_, i) => i !== index)
    // );
    // setCustomFiles((prevCustomFiles) =>
    //   prevCustomFiles.filter((_, i) => i !== index)
    // ); /api/v1/document-multiple-delete
    // /api/v1/document/{id}

    const documents: any = [
      {
        document_id: document.id,
        permanent_delete: true
      }
    ];

    instance
      .post(`/notary/notary-document-multiple-delete`, documents)
      .then((res: any) => {
        fetchDocumentDetails();
        fetchRequestDetails();
        toast.success('Updates Successfully');
        setFiles(null);
        setFileInfos([]);
        setCustomFiles([]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.data?.message);
      });
  };
  const confirmationText = selectedRequest.type === 'accept' ? 'Yes, Accept' : 'Reject';

  const handleSessionLink = () => {
    dispatch(
      getSessionLink(
        {
          request_id: request?.request_id,
          type: 'notary',
          participant_id: user?.id
        },
        (res: any) => {
          const token: any = new URL(res?.session_url)?.searchParams?.get('token');
          localStorage?.setItem('accessToken', token);
          window.location.href = res?.session_url;
        },
        (error) => {
          toast.error(error);
        }
      )
    );
  };

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
                <Button
                  onClick={() =>
                    setSelectedRequest({
                      type: 'accept',
                      id: request?.id,
                      body: {
                        status: 'Accepted',
                        schedule_session_id: request?.schedule_session?.id,
                        schedule_session_request_id: request?.id
                      }
                    })
                  }
                  theme="primary"
                >
                  Accept
                </Button>
                <Button
                  onClick={() =>
                    setSelectedRequest({
                      type: 'reject',
                      id: request?.id,
                      body: {
                        status: 'Rejected',
                        schedule_session_id: request?.schedule_session?.id,
                        schedule_session_request_id: request?.id
                      }
                    })
                  }
                  theme="plain"
                >
                  <span className="text--red">Reject</span>
                </Button>
              </>
            )}

            {/* {request.status !== "cancelled" && request.status !== "Awaiting" && request.status !== "pay now" && !loading && 
            <Button theme="plain" onClick={() => setSelectedRequest({ type: 'cancel', id :request?.id , body: request  })}>
                <span className="text--red">Cancel Invitation</span>
            </Button>} */}
          </div>
        </div>

        <div className={styles.session_container}>
          {(!loading && request?.status !== 'Awaiting') ||
          request?.status === 'Accepted' ||
          request?.schedule_session?.request_type === 'Custom' ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}
              className={styles.session_container__document_time}
            >
              <div>
                <p className={styles.session_container__title}>Document Attached:</p>
                <span className={styles.session_container__document_link}>
                  {request?.schedule_session?.request_type === 'Custom' ? (
                    <p className={styles.session_container__timeframe}>Custom Affidavit</p>
                  ) : (
                    <>
                      <img src={externalTab} alt="Icon" />
                      <Link
                        className={classNames(styles.session_container__link, 'text--blue text--600')}
                        to={`/requests/${request?.document_id}/document`}
                      >
                        {request?.document_name}
                      </Link>
                    </>
                  )}
                </span>
              </div>
              {request?.schedule_session?.request_type === 'Custom' && (
                <div style={{}}>
                  {document.documentUploads?.length >= 1 ? (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <button onClick={() => handleDelete()}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5.06544 1.72033H4.91683C4.99856 1.72033 5.06544 1.65346 5.06544 1.57172V1.72033H10.7128V1.57172C10.7128 1.65346 10.7796 1.72033 10.8614 1.72033H10.7128V3.05786H12.0503V1.57172C12.0503 0.915964 11.5171 0.382812 10.8614 0.382812H4.91683C4.26107 0.382812 3.72792 0.915964 3.72792 1.57172V3.05786H5.06544V1.72033ZM14.4281 3.05786H1.3501C1.02129 3.05786 0.755646 3.3235 0.755646 3.65231V4.24677C0.755646 4.3285 0.822522 4.39538 0.904259 4.39538H2.02629L2.48514 14.111C2.51486 14.7445 3.03872 15.2442 3.67219 15.2442H12.106C12.7413 15.2442 13.2633 14.7463 13.2931 14.111L13.7519 4.39538H14.8739C14.9557 4.39538 15.0225 4.3285 15.0225 4.24677V3.65231C15.0225 3.3235 14.7569 3.05786 14.4281 3.05786ZM11.963 13.9066H3.81523L3.36567 4.39538H12.4125L11.963 13.9066Z"
                              fill="#E3959A"
                            />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <img src={externalTab} alt="Icon" />
                        <Link
                          className={classNames(styles.session_container__link, 'text--blue text--600')}
                          to={`/requests/${request?.document_id}/document`}
                        >
                          {request?.document_name}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Button size="sm" theme="primary">
                      <label
                        style={{
                          color: '#fff',
                          cursor: 'pointer'
                        }}
                        htmlFor="actual-btn"
                      >
                        <input type="file" id="actual-btn" onChange={handleChange} hidden />
                        Upload Document
                      </label>
                    </Button>
                  )}
                  {fileInfos.length >= 1 ? (
                    <ul>
                      {fileInfos.map((fileInfo, index) => (
                        <div
                          style={{
                            fontSize: '14px',
                            color: ''
                          }}
                        >
                          {/* <button  onClick={() => handleDelete(index)}>
     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M5.06544 1.72033H4.91683C4.99856 1.72033 5.06544 1.65346 5.06544 1.57172V1.72033H10.7128V1.57172C10.7128 1.65346 10.7796 1.72033 10.8614 1.72033H10.7128V3.05786H12.0503V1.57172C12.0503 0.915964 11.5171 0.382812 10.8614 0.382812H4.91683C4.26107 0.382812 3.72792 0.915964 3.72792 1.57172V3.05786H5.06544V1.72033ZM14.4281 3.05786H1.3501C1.02129 3.05786 0.755646 3.3235 0.755646 3.65231V4.24677C0.755646 4.3285 0.822522 4.39538 0.904259 4.39538H2.02629L2.48514 14.111C2.51486 14.7445 3.03872 15.2442 3.67219 15.2442H12.106C12.7413 15.2442 13.2633 14.7463 13.2931 14.111L13.7519 4.39538H14.8739C14.9557 4.39538 15.0225 4.3285 15.0225 4.24677V3.65231C15.0225 3.3235 14.7569 3.05786 14.4281 3.05786ZM11.963 13.9066H3.81523L3.36567 4.39538H12.4125L11.963 13.9066Z" fill="#E3959A"/>
 </svg>
     </button> */}
                          <li key={fileInfo.name}>{fileInfo.name}</li>
                        </div>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )}
            </div>
              ) : null}

          <div className={styles.session_container__document_time}>
            <p className={styles.session_container__title}>Meeting timeframe</p>
            {!loading && (
              <span className={styles.session_container__timeframe}>
                {request.date} {request.start_time}
              </span>
            )}
          </div>
          {request?.status !== 'cancelled' && request?.status !== 'Awaiting' && request?.status !== 'pay now' && !loading ? (
            <div className={classNames(styles.join_button, 'mt-1')}>
              <a
                href={`${process.env.REACT_APP_VIRTUAL_NOTARY}notary/session-prep/${request?.schedule_session?.id}`}

                target="_blank"
                rel="noreferrer"
                className={classNames(Buttonstyles.btn, Buttonstyles.btn__primary, Buttonstyles.btn__sm)}
              >
                Join Call
              </a>
            </div>
          ) : null}
        </div>
        <div className="mt-1" style={{ overflow: 'auto' }}>
          <Table type="primary" tableData={participants?.schedule?.participants} headers={singleRequestHeaders} loading={loading}>
            {(row: any) => {
              const isSigner = <span>{row?.role === 'Signer' ? 'Signer' : 'Witness'}</span>;

              return (
                <>
                  <td className="table__row-text center">
                    <span className="text--600 text--blue">
                      {row?.first_name} {row?.last_name}
                    </span>
                    ({row?.role === 'Signer' ? 'Signer' : isSigner})
                  </td>
                  <td className="table__row-text center">{row?.phone}</td>
                  <td className="table__row-text center">{row?.email}</td>
                  <td className="table__row-text center">
                    {/* <Badge size="md" theme={badgeType(row?.status.toString())} type="secondary">
                      {row?.status}
                    </Badge> */}
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
