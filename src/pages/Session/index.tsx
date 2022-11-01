/* eslint-disable */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import Upload from 'components/Upload';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getRequestDocument, completeNotarySession, getRequestDetails, endNotarySession } from 're-ducks/request';
import { useDispatch } from 'react-redux';
import { RootState } from 're-ducks/rootReducer';
import toast from 'react-hot-toast';
import { toggleMenu } from 're-ducks/sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useTypedSelector from 'hooks/useTypedSelector';
import User from 'types/user';
import { ref, set, onValue } from 'firebase/database';
import db from 'hooks/useFirebase';
import Button from 'components/Button';
import useMediaRecorder from '@wmik/use-media-recorder';
import { uploadFiles } from 're-ducks/documents';
import NotaryCall from 'container/myRequest/NotaryCall';
import PreNotarySession from 'container/myRequest/PreNotarySession';
import EditDocument from 'container/document/EditDocument';
import EndSessionModal from 'container/Modal/EndSessionModal';
import ResetSessionModal from 'container/Modal/ResetSessionModal';
import CompleteSessionModal from 'container/Modal/CompleteSessionModal';
import RecordIcon from 'assets/icons/notary-record.svg';
import Indicator from 'assets/icons/red-dot.svg';
import moment from 'moment';
import styles from './index.module.scss';
import Dashboard from '../../layouts/dashboard';

interface SessionDoc {
  request_url: string;
  documentExt: string;
  request_id: string;
  document_name: string;
}

export interface SignerFields {
  [key: string]: {
    top: number;
    left: number;
    color: string;
    type: string;
  };
}

type Signer = {
  field_id: string;
  signature: string;
  field_type: string;
  position_x: string;
  position_y: string;
  is_certificate_signature: boolean;
  signer_id: string;
  signed_at: string;
};

const NotarySession = () => {
  const sidebar = useTypedSelector((state: RootState) => state.sidebar);

  const [docDetails, setDocument] = useState<SessionDoc>({} as SessionDoc);
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const notaryRef = useRef<any>();
  const [, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [signActive, setSignActive] = useState(false);
  const [canSign, setCanSign] = useState(false);
  const [signComplete, setCanSignComplete] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [requestDetails, setRequestDetails] = useState<any>({});
  const [sessionStartTime, setSessionStartTime] = useState<Date>();
  const [endSessionNote, setEndSessionNote] = useState<any>('');
  const [endSessionModal, setEndSessionModal] = useState<boolean>(false);
  const [resetSessionModal, setResetSessionModal] = useState<boolean>(false);
  const [completeSessionModal, setCompleteSessionModal] = useState<boolean>(false);
  const [sessionPayload, setSessionPayload] = useState<Signer[]>([]);
  const [timerCount, setTimerCount] = useState<any>('00:00:00');
  const user: User = useTypedSelector((state) => state?.auth?.signIn);

  const { stopRecording, startRecording, status } = useMediaRecorder({
    recordScreen: true,
    blobOptions: { type: 'video/mp4' },
    mediaStreamConstraints: { audio: true, video: true },
    onDataAvailable: (data: any) => {
      let formData = new FormData();
      formData.append('avatar', data);

      dispatch(
        uploadFiles(
          { docId: id, typeOfFile: 'video' },
          formData,
          () => {},
          () => {}
        )
      );
    }
  });

  const { search } = useLocation();

  const token = new URLSearchParams(search).get('token');
  const agoraToken = new URLSearchParams(search).get('agoraToken');
  const agoraUsers = new URLSearchParams(search).get('agoraUsers');
  const agoraUid = new URLSearchParams(search).get('agoraUid');

  const fetchRequestDoc = useCallback(() => {
    dispatch(
      getRequestDocument(
        { id },
        (doc) => {
          setDocument(doc as SessionDoc);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  }, [id, dispatch]);

  const fetchRequestDetails = useCallback(() => {
    dispatch(
      getRequestDetails(
        { id },
        (request) => {
          setRequestDetails(request);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          toast.error(error);
        }
      )
    );
  }, [id, dispatch]);

  useEffect(() => {
    toggleMenu(dispatch);

    if (id && agoraToken && token) {
      if (token) {
        delete axios.defaults.headers.common.Authorization;
        localStorage.setItem('accessToken', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      axios.all([fetchRequestDoc(), fetchRequestDetails()]);
    } else {
      push('../requests');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRequestDoc, fetchRequestDetails, id, token, agoraToken, push]);

  useEffect(() => {
    if (sessionStarted) {
      setSessionStartTime(new Date());
    }
  }, [sessionStarted]);

  const routeUser = (newRoute: any) => {
    push(newRoute);
  };

  window.onload = function () {
    const reloading = localStorage.getItem('reloading');
    const newRoute = localStorage.getItem('newRoute');

    if (reloading === 'true') {
      localStorage.removeItem('reloading');
      localStorage.removeItem('newRoute');
      routeUser(newRoute);
    }
  };

  const refreshPage = (route: string) => {
    localStorage.setItem('reloading', 'true');
    localStorage.setItem('newRoute', route);
    document.location.reload();
  };

  const setEndSession = () => {
    const sessionRef = ref(db, `notary-sessions/${id}`);
    set(sessionRef, {
      status: 'cancelled'
    });
    setEndSessionModal(false);
    notaryRef.current.endSession();
    refreshPage('../requests');
  };

  const endSession = () => {
    dispatch(
      endNotarySession(
        { id, action: 'cancelled', call_end: new Date(), call_start: sessionStartTime, reason: endSessionNote },
        () => {
          toast.success('Notary Session ended successfully');
          setEndSession();
          stopRecording();
        },
        (error) => {
          toast.error(error);
          setEndSession();
          stopRecording();
        }
      )
    );
  };

  const setCompleteSession = () => {
    const sessionRef = ref(db, `notary-sessions/${id}`);
    set(sessionRef, {
      status: 'completed'
    });
    setCompleteSessionModal(false);
    refreshPage(`/locker/${id}`);
  };

  const completeSession = () => {
    const completePayload = {
      call_start: sessionStartTime,
      call_end: new Date(),
      signatures: sessionPayload
    };
    setCompleting(true);
    dispatch(
      completeNotarySession(
        completePayload,
        () => {
          setCompleting(false);
          setCompleteSession();
          toast.success('Notary Session completed successfully');
        },
        (error) => {
          setCompleting(false);
          toast.error(error);
        }
      )
    );
  };

  const initiateCompleteCallSession = () => {
    stopRecording();
    completeSession();
    setTimerCount('');
  };

  useEffect(() => {
    const sessionRef = ref(db, `notary-sessions/${id}`);
    onValue(sessionRef, (snapshot: any) => {
      const data = snapshot.val();
      const currentUserSigners = data && data?.signatureFields;
      setCanSign(data && data?.canSign);
      setSignActive(data && data?.signActive);
      const payload: any = [];
      if (data?.signatureFields) {
        currentUserSigners &&
          Object.keys(currentUserSigners).forEach((key) => {
            currentUserSigners[key].fields.map((item: any) => {
              payload.push({
                field_id: item.field_id,
                signature: item?.type === 'text_area' ? item.content : item.signature,
                field_type: item.field_type || item.type,
                position_x: item?.left.toString(),
                position_y: item?.top.toString(),
                is_certificate_signature: !!(item?.type === 'draw' || item?.type === 'signature' || item?.type === 'text'),
                signer_id: item?.signer_id,
                signed_at: item?.signed_at
              });
            });
          });
        setSessionPayload(payload);
      } else {
        setSessionPayload([]);
      }
    });
  }, [id]);

  const resetSession = () => {
    const sessionRef = ref(db, `notary-sessions/${id}`);
    set(sessionRef, {
      signers: [],
      signatureFields: {},
      status: 'pending',
      canSign: false,
      signActive: false
    });
    setResetSessionModal(false);
  };

  function startTimer() {
    const startTimestamp = moment().startOf('day');

    setInterval(() => {
      startTimestamp.add(1, 'second');
      setTimerCount(startTimestamp.format('HH:mm:ss'));
    }, 1000);
  }

  useEffect(() => {
    if (status === 'recording') {
      startTimer();
      setSessionStarted(true);
    }
  }, [status]);

  return (
    <Dashboard>
      {endSessionModal && (
        <EndSessionModal
          isOpen={endSessionModal}
          isClose={() => setEndSessionModal(false)}
          endSessionNote={setEndSessionNote}
          onClick={() => endSession()}
        />
      )}
      <div className={styles.document__wrapper}>
        <header className={classNames(styles.document__header, 'flex')} style={{ width: sidebar.minimizeSidebar ? '94%' : '81%' }}>
          <button onClick={() => push('../requests')} className="flex flex__item-center">
            <svg className="mr-1" width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 16.5v-3h16v-2H6v-3l-4 4 4 4Z" fill="#363740" />
            </svg>
            Notary Session
          </button>

          {sessionStarted && (
            <div className="flex">
              {signActive && canSign && (
                <Button onClick={() => setResetSessionModal(true)} theme="reset" loading={false} className="mr-1" size="md">
                  Reset
                </Button>
              )}
              <Button onClick={() => setEndSessionModal(true)} loading={false} className="mr-1" size="md">
                Cancel Session
              </Button>
              {signActive && canSign && (
                <Button
                  onClick={() => setCompleteSessionModal(true)}
                  size="md"
                  theme="primary"
                  disabled={!signComplete}
                  loading={completing}
                >
                  Complete
                </Button>
              )}
            </div>
          )}
        </header>

        {resetSessionModal && (
          <ResetSessionModal isOpen={resetSessionModal} isClose={() => setResetSessionModal(false)} onClick={() => resetSession()} />
        )}

        {completeSessionModal && (
          <CompleteSessionModal
            isOpen={completeSessionModal}
            isClose={() => setCompleteSessionModal(false)}
            onClick={() => initiateCompleteCallSession()}
          />
        )}

        <section className={classNames(styles.document__content)} style={{ marginTop: '100px' }}>
          {!sessionStarted ? (
            <PreNotarySession
              startSession={(val: boolean) => {
                startRecording(120000);
              }}
            />
          ) : (
            <div className="flex">
              <div className={classNames(styles.document__aside, 'mr-2 flex flex__column')}>
                <NotaryCall
                  id={docDetails.request_id}
                  agoraToken={agoraToken}
                  ref={notaryRef}
                  agoraUid={agoraUid}
                  agoraUsers={agoraUsers}
                />

                {status === 'recording' && (
                  <div className={styles.time__count}>
                    <h1>Meeting Info</h1>
                    <div className="flex mt-1">
                      <div className={styles.time__count__img}>
                        <img src={RecordIcon} alt="" />
                      </div>
                      <div className={styles.time__count__dot}>
                        <img src={Indicator} alt="" />
                      </div>
                      <div className={styles.time__count__secs} id="timer">
                        {timerCount}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={classNames(styles.video_page, styles.alt)}>
                <DndProvider backend={HTML5Backend}>
                  <EditDocument
                    refetchDoc={() => {}}
                    signatureFields={[]}
                    onDrop={() => {}}
                    doc={{
                      ...docDetails,
                      notary_id: requestDetails?.notary_id,
                      notary_email: requestDetails.notary_email,
                      signers: [
                        ...requestDetails?.participants?.filter((participants) => participants.is_signer),
                        { name: `${user.first_name} ${user.last_name}`, email: user.email }
                      ]
                    }}
                    setCanSignComplete={setCanSignComplete}
                  />
                </DndProvider>
              </div>
            </div>
          )}
        </section>
      </div>
    </Dashboard>
  );
};

export default NotarySession;

