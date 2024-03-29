import React, { useEffect, useState, useCallback } from 'react';
import Metrics from 'components/MetricCard';
import { RootState } from 're-ducks/rootReducer';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';
import useTypedSelector from 'hooks/useTypedSelector';
import VerifyNotaryId from 'container/authForm/VerifyNotaryId';
import styles from 'layouts/layouts.module.scss';
import { requestHeaders } from 'mocks/table';
import CallSection from 'container/CallSection/CallSection';
import { getToken } from 'utils/getToken';
import ConfirmationModal from 'container/Modal/ConfirmationModal';
import { getAllRequestAction, confirmRequest } from 're-ducks/request';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import toast from 'react-hot-toast';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import MediaQuery from 'helpers/useMediaQuery';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { RequestAcceptance } from 'types/requests';
import { fetchUserProfile } from 're-ducks/user';
import Profile from '../../assets/icons/icons/clientIcon.svg';
import Earnings from '../../assets/icons/icons/earningsIcon.svg';
import Time from '../../assets/icons/icons/sessionsIcons.svg';
import Docs from '../../assets/icons/icons/documentsIcon.svg';
import Dashboard from '../../dashboard/SidebarLayout/index';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import Buttonstyles from '../../components/Button/button.module.scss';
import { ReactComponent as Empty } from '../../assets/icons/requestEmptyState.svg';

interface User {
  is_id_verified?: boolean;
}

const EmptyState = ({ user }: any) => (
  <div className={styles.empty__state}>
    <Empty />
    <div>
      <p>Welcome {user},</p>
      <p>Start Notarising documents right away!</p>
    </div>
  </div>
);

const badgeType = (status: string) => {
  switch (status) {
    case 'signed':
      return 'awaitingPayment';
    case 'scheduled':
      return 'info';
    case 'Completed':
      return 'success';
    case 'Awaiting':
      return 'payment';
    case 'Pending':
      return 'payment';
    case 'Accepted':
      return 'pending';
    case 'Cancelled':
      return 'error';
    case 'pay now':
      return 'payNow';
    default:
      return 'pending';
  }
};

const checkForTime = (time: any) => {
  let style = {};
  if (time === 'Immediate') {
    style = { color: '#EE0004', fontWeight: '600' };
  } else {
    style = { color: '#194FBB', fontWeight: '600' };
  }

  return style;
};

const HomePage = () => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RequestAcceptance>({} as RequestAcceptance);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const user: User = useTypedSelector((state: RootState) => state?.auth?.signIn);
  const dashboardOverview: any = useTypedSelector((state: any) => state?.user?.dashboardDetails);
  const { requests }: any = useTypedSelector((state) => state?.request);
  const user_profile = useTypedSelector((state: any) => state.user);

  const env_variable =
    `${process.env.REACT_APP_ENVIRONMENT}` === 'live'
      ? `${process.env.REACT_APP_VIRTUAL_NOTARY_LIVE}`
      : `${process.env.REACT_APP_ENVIRONMENT}` === 'staging'
        ? `${process.env.REACT_APP_VIRTUAL_NOTARY_STAGING}`
        : `${process.env.REACT_APP_VIRTUAL_NOTARY_DEV}`;

  useEffect(() => {
    dispatch(
      fetchUserProfile(
        {},
        (success) => {
          setUserProfile(success);
        },
        (error: any) => {
          // toast.error(error.message);
        }
      )
    );
  }, [dispatch]);

  const [updatedUser, setUpdatedUser] = useState<any>({ ...user, ...userProfile });

  useEffect(() => {
    if (!user_profile?.national_verification) {
      setIsCloseModal(true);
    } else if (user_profile?.national_verification) {
      setIsCloseModal(false);
    }
  }, [user_profile, setIsCloseModal]);

  useEffect(() => {
    setUpdatedUser({ ...user, ...user_profile });
  }, [user_profile, user]);

  const fetchAllRequest = useCallback(
    (status: string = '', nextPage: any = 1, itemsPerPage: any = 10) => {
      const params = {
        status: status === 'all' ? '' : status,
        page: nextPage === 0 ? 1 : nextPage,
        per_page: itemsPerPage
      };
      setLoading(true);
      dispatch(
        getAllRequestAction(
          { params },
          (res) => {
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        )
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setLoading(true);
    fetchAllRequest();
  }, [fetchAllRequest, userProfile]);

  const confirmOrRejectRequest = () => {
    dispatch(
      confirmRequest(
        {
          ...selectedRequest
        },
        () => {
          setLoading(true);
          fetchAllRequest();
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

  // console.log(userProfile, isCloseModal)

  return (
    <Dashboard>
      {userProfile?.national_verification === false ? (
        <Alert className=" mt-2" severity="warning">
          Please{' '}
          <NavLink
            style={{
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
            to="/settings/personal-info"
          >
            Click here
          </NavLink>{' '}
          to complete your profile
        </Alert>
      ) : null}
      {isCloseModal && <VerifyNotaryId isOpen={isCloseModal} isClose={() => setIsCloseModal(!isCloseModal)} />}
      <section>
        <div className=" pt-2">
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Metrics iconPath={Profile} label="Clients" value={dashboardOverview?.message?.clients} theme="white" />
            </Grid>
            <Grid item xs={6} md={3}>
              <Metrics iconPath={Earnings} label="Earnings" value={dashboardOverview?.message?.earnings} theme="white" />
            </Grid>
            <Grid item xs={6} md={3}>
              <Metrics iconPath={Time} label="Avg session time(hrs)" value={dashboardOverview?.message?.session_time} theme="white" />
            </Grid>
            <Grid item xs={6} md={3}>
              <Metrics iconPath={Docs} label="Notarised Docs" value={dashboardOverview?.message?.notarised_docs} theme="white" />
            </Grid>
          </Grid>
        </div>
      </section>

      <CallSection data={requests?.data} />

      <section className="pt-1 ">
        <div className={styles.table_container} style={{ overflow: 'auto' }}>
          <div className={styles.table_container__headerFlex}>
            <h4 className={styles.table_container__header}>All Requests</h4>
          </div>
          <div className="mt-1">
            {MediaQuery().matchMD ? (
              <Table
                type="primary"
                tableData={requests?.data?.slice(0, 5) || []}
                headers={requestHeaders}
                loading={loading}
                placeHolderImg={<EmptyState user={!!userProfile} />}
              >
                {(row: { [k: string]: any }) => (
                  <>
                    <td className="table__row-text center">
                      <Link className="text--blue text--600" to={`/requests/${row.id}`}>
                        {' '}
                        {row?.document_name || row?.title || '-'}
                      </Link>
                      <br />
                      {/* <span className="text--grey">{row.participants.slice(0, 2).join(', ')}</span> */}
                    </td>
                    <td className="table__row-text center">
                      <Badge size="md" theme={badgeType(row?.status)} type="secondary">
                        {row?.status}
                      </Badge>
                    </td>
                    <td className="table__row-text center">{format(parseISO(row?.date), 'PPPP')}</td>

                    <td className="table__row-text center" style={checkForTime(row?.immediate === 1 ? 'Immediate' : row?.start_time)}>
                      {row?.immediate === 0 ? row?.start_time?.slice(0, 5) : 'Immediate'}
                    </td>
                    <td className="table__row-text center">
                      {row?.status === 'Awaiting' && (
                        <>
                          <button
                            onClick={() =>
                              setSelectedRequest({
                                type: 'accept',
                                id: row?.id,
                                body: {
                                  status: 'Accepted',
                                  schedule_session_id: row?.id,
                                  schedule_session_request_id: row?.id
                                }
                              })
                            }
                            className="text--600 text--coral px-1"
                          >
                            {row.status === 'Awaiting' && <span>Accept</span>}
                          </button>

                          <button
                            onClick={() =>
                              setSelectedRequest({
                                type: 'reject',
                                id: row?.id,
                                body: {
                                  status: 'Rejected',
                                  schedule_session_id: row?.id,
                                  schedule_session_request_id: row?.id
                                }
                              })
                            }
                            className="text--600 text--red px-1"
                          >
                            {row.status === 'Awaiting' && <span>Reject</span>}
                          </button>
                        </>
                      )}
                      {row?.status === 'Accepted' && (
                        <>
                          <a
                            href={`${env_variable}notary/session-prep/${row?.id}?token=${getToken()}`}
                            target="_blank"
                            rel="noreferrer"
                            className={classnames(Buttonstyles.btn, Buttonstyles.btn__primary, Buttonstyles.btn__sm)}
                          >
                            Join Call
                          </a>
                        </>
                      )}
                    </td>
                  </>
                )}
              </Table>
            ) : (
              <List sx={{ width: '100%', padding: 0 }}>
                {requests?.data?.slice(0, 5).map((value: any) => (
                  <ListItem key={value.id} sx={{ width: '100%', padding: 0, marginBottom: '12px' }}>
                    <Card sx={{ width: '100%', boxShadow: '0px 0px 16px rgba(137, 151, 164, 0.1)' }}>
                      <CardHeader
                        action={
                          <span className={classnames(Buttonstyles.btn, Buttonstyles.btn__primary, Buttonstyles.btn__xs)}>
                            {value?.status}
                          </span>
                        }
                        subheader={<p className="fs_xs">{format(parseISO(value?.date), 'PPPP')}</p>}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            maxWidth: '400px',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <p className="fs_xs">Document Name</p>
                          <Link className="text--blue text--600 fs_xs text--right" to={`/requests/${value.id}`}>
                            {' '}
                            {value?.document_name || value?.title || '-'}
                          </Link>
                        </Box>
                        <Box
                          sx={{
                            marginTop: '18px',
                            maxWidth: '400px',
                            display: 'flex',
                            textAlign: 'left',
                            justifyContent: 'space-between'
                          }}
                        >
                          <p className="fs_xs">Time</p>
                          <p
                            className="fs_xs text--right"
                            style={checkForTime(value?.immediate === true ? 'Immediate' : value?.start_time)}
                          >
                            {value?.immediate === false ? value?.start_time?.slice(0, 5) : 'Immediate'}
                          </p>
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Stack direction="row" spacing={2}>
                          {value?.status === 'Pending' && (
                            <>
                              <button
                                onClick={() =>
                                  setSelectedRequest({
                                    type: 'accept',
                                    id: value?.id,
                                    body: {
                                      status: 'Accepted',
                                      schedule_session_id: value?.id,
                                      schedule_session_request_id: value?.id
                                    }
                                  })
                                }
                                className="text--600 fs_xs text--coral px-1"
                              >
                                {value.status === 'Awaiting' && <span>Accept</span>}
                              </button>

                              <button
                                onClick={() =>
                                  setSelectedRequest({
                                    type: 'reject',
                                    id: value?.id,
                                    body: {
                                      status: 'Rejected',
                                      schedule_session_id: value?.id,
                                      schedule_session_request_id: value?.id
                                    }
                                  })
                                }
                                className="text--600  fs_xs text--red px-1"
                              >
                                {value.status === 'Awaiting' && <span>Reject</span>}
                              </button>
                            </>
                          )}
                          {value?.status === 'Accepted' && (
                            <>
                              <a
                                href={`${env_variable}notary/session-prep/${value?.id}?token=${getToken()}`}
                                target="_blank"
                                rel="noreferrer"
                                className={classnames(Buttonstyles.btn, Buttonstyles.btn__primary, Buttonstyles.btn__sm)}
                              >
                                Join Call
                              </a>
                            </>
                          )}

                          {/* <Button variant="contained">Contained</Button>
                <Button variant="contained">Status</Button> */}
                        </Stack>
                      </CardActions>
                    </Card>
                  </ListItem>
                ))}
              </List>
            )}

            {selectedRequest.type && (
              <ConfirmationModal
                isOpen={!!selectedRequest.type}
                isClose={() => setSelectedRequest({} as RequestAcceptance)}
                action={confirmOrRejectRequest}
                buttonCaption={selectedRequest.type === 'accept' ? 'Yes, Accept' : 'Reject'}
              />
            )}
          </div>
        </div>
      </section>
    </Dashboard>
  );
};

export default HomePage;
