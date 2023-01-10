/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import Tabs from 'components/Tabs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import useTypedSelector from 'hooks/useTypedSelector';
import { Filters } from 'components/Filters';
import { getAllRequestAction, confirmRequest } from 're-ducks/request';
import Pagination from 'components/Pagination';
import Table from 'components/Table';
import Badge from 'components/Badge';
import { Grid } from '@mui/material';
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ConfirmationModal from 'container/Modal/ConfirmationModal';
import { ReactComponent as EmptyIcon } from 'assets/icons/requestEmptyIcon.svg';
import { requestHeaders } from 'mocks/table';
import toast from 'react-hot-toast';
import { RequestAcceptance } from 'types/requests';
import classnames from 'classnames';
import Button from 'components/Button';
import instance from 'services/axios';
import MediaQuery from 'helpers/useMediaQuery';
import styles from './request.module.scss';
// import Dashboard from '../../layouts/dashboard';
import Dashboard from '../../dashboard/SidebarLayout/index';

// import { Button } from '@mui/material';
import Buttonstyles from '../../components/Button/button.module.scss';

const EmptyState = ({ isDocumentEmpty = false }: { isDocumentEmpty: boolean }) => {
  const user = useSelector((state: any) => state?.auth?.signIn);

  return (
    <div className={styles.empty__state__icon}>
      <EmptyIcon />
      {isDocumentEmpty ? (
        <p>No documents available.</p>
      ) : (
        <div>
          <p>Hi {user?.first_name},</p>
          <p>Thanks for signing up, {user?.first_name}! You have no documents yet.</p>
        </div>
      )}
    </div>
  );
};

const badgeType = (status: string) => {
  switch (status) {
    case 'signed':
      return 'awaitingPayment';
    case 'scheduled':
      return 'info';
    case 'completed':
      return 'success';
    case 'Awaiting':
      return 'payment';
    case 'Accepted':
      return 'pending';
    case 'cancelled':
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

export default function Request() {
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RequestAcceptance>({} as RequestAcceptance);
  const [searchValue, setSearchValue] = useState('');
  const [dataPerPage, setDataPerPage] = useState(10);
  const { requests }: any = useTypedSelector((state) => state?.request);
  const dispatch = useDispatch();

  const tabs = [
    {
      label: `All (${requests?.generalStatus?.total_count || 0})`,
      title: 'all'
    },
    {
      label: `Pending (${requests?.generalStatus?.pending_count || 0})`,
      title: 'pending'
    },
    {
      label: `Scheduled (${requests?.generalStatus?.scheduled_count || 0})`,
      title: 'scheduled'
    },
    {
      label: `Awaiting Payment (${requests?.generalStatus?.pay_now_count || 0})`,
      title: 'pay now'
    }
  ];
  const [activeTabContent, setActiveTabContent] = useState(tabs[0]);
 

  const fetchRequest = useCallback(
    (status: string = '', nextPage: any = 1, itemsPerPage: any = 10) => {
      const params = {
        status: status === 'all' ? '' : status,
        page: nextPage === 0 ? 1 : nextPage,
        per_page: itemsPerPage,
        search: searchValue.toLowerCase()
      };
      setLoading(true);
      setDataPerPage(itemsPerPage);
      dispatch(
        getAllRequestAction(
          { params },
          () => {
            setLoading(false);
          },
          (error) => {
            toast.error(error);
            setLoading(false);
          }
        )
      );
    },
    [dispatch, searchValue]
  );

 


  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const confirmOrRejectRequest = () => {
    dispatch(
      confirmRequest(
        {
          ...selectedRequest
        },
        () => {
          fetchRequest();
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
    if (activeTabContent.title) {
      setLoading(true);
      fetchRequest(activeTabContent.title);
    }
  }, [activeTabContent, fetchRequest, searchValue]);

  return (
    <Dashboard>
      <section className="pt-1">
        <div className={styles.request_container}>
          <div className={styles.request_container__flex}>
            <div>
              <Tabs tabs={tabs} active={activeTabContent} setActive={(tab: any) => setActiveTabContent(tab)} />
            </div>
            {activeTabContent.title === 'all' && (
              <div>
                <Filters onClick={() => {}} filterBtn={false} searchBtn={false} onFilter={fetchRequest}>
                  <input
                    type="text"
                    onChange={(e) => handleSearch(e)}
                    value={searchValue}
                    placeholder="Search Title"
                    className={styles.requestSearch}
                  />
                </Filters>
              </div>
            )}
          </div>
          <div className="mt-1" style={{overflow: 'auto'}}>
            {MediaQuery().matchMD ? 
            <Table
            type="primary"
            tableData={requests || []}
            headers={requestHeaders}
            loading={loading}
            placeHolderImg={!loading && (
              searchValue !== '' ? (
                <div className={styles.empty__state__icon}>
                  <EmptyIcon />
                  <p>No search available.</p>
                </div>
              ) : (
                <EmptyState isDocumentEmpty={!!requests?.generalStatus?.total_count} />
              )
            )}
          >
            {(row: { [k: string]: any }) => (
              <>
                <td className="table__row-text center">
                  <Link className="text--blue text--600" to={`/requests/${row?.id}`}>
                    {row?.document_name}
                  </Link>
                  <br />
                  {/* <span style={{ color: '#7B7171' }}>{row?.participants?.slice(0, 2).join(', ')}...</span> */}
                </td>
                <td className="table__row-text center">
                  <Badge size="md" theme={badgeType(row.status.toString())} type="secondary">
                    {row.status}
                  </Badge>
                </td>
                {/* {format(parseISO(row?.call_date), 'PPPP')} */}
                <td className="table__row-text center">{format(parseISO(row?.schedule_session?.date), 'PPPP')}</td>
                <td className="table__row-text center" style={checkForTime(row?.schedule_session?.immediate === true ? 'Immediate' : row?.start_time)}>
                  {row?.schedule_session?.immediate === false ? row?.schedule_session?.start_time?.slice(0, 5) : 'Immediate'}
                </td>
                <td className="table__row-text center">
                  {row?.status === 'Awaiting' && (
                    <>
                      <button
                        onClick={() => setSelectedRequest({ type: 'accept', id :row?.id , body: {
                          "status": "Accepted",
                          "schedule_session_id":  row?.schedule_session?.id,
                          "schedule_session_request_id": row?.id
                        } })}

                        className="text--600 text--coral px-1"
                      >
                        {row.status === 'Awaiting' && <span>Accept</span>}
                      </button>

                      <button
                        onClick={() => setSelectedRequest({ type: 'reject', id :row?.id , body: {
                          "status": "Rejected",
                          "schedule_session_id":  row?.schedule_session?.id,
                          "schedule_session_request_id": row?.id
                        } })}
                        className="text--600 text--red px-1"
                      >
                        {row.status === 'Awaiting' && <span>Reject</span>}
                      </button>
                    </>
                  )}
                  {row?.status === 'Accepted' && (
                    <>
                  <a href={row?.link} target="_blank" rel="noreferrer" className={classnames(
                    Buttonstyles.btn,
                    Buttonstyles.btn__primary,
                    Buttonstyles.btn__sm
                  )}  >Join Call</a>

                     
                    </>
                  )}
                </td>
              </>
            )}
          </Table>
              : 
            <List sx={{ width: "100%" , padding: 0}}>
      {requests?.map((value: any) => (
        <ListItem key={value.id} sx={{width: "100%", padding: '0 0.9rem', marginBottom:'12px'}}>
          <Card sx={{width: "100%" }}>
            <CardHeader
              action={
                <span className={classnames(
                  Buttonstyles.btn,
                  Buttonstyles.btn__primary,
                  Buttonstyles.btn__xs
                )}  >{value?.status}</span>
             }
              subheader={<p className="fs_xs">{format(parseISO(value?.schedule_session?.date), 'PPPP')}</p> }
            />
            <CardContent>
              <Box
                sx={{
                  maxWidth: "400px",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <p className="fs_xs">Document Name</p>
                <Link className="text--blue text--600 fs_xs text--right" to={`/requests/${value.id}`}>
                      {' '}
                      {value?.document_name || value?.schedule_session?.title || '-'}
                    </Link>
              </Box>
              <Box
                sx={{
                  marginTop: '18px',
                  maxWidth: "400px",
                  display: "flex",
                  textAlign: "left",
                  justifyContent: "space-between"
                }}
              >
                <p className="fs_xs">Time</p>
                <p className="fs_xs text--right" style={checkForTime(value?.schedule_session?.immediate === true ? 'Immediate' : value?.start_time)}>{value?.schedule_session?.immediate === false ? value?.schedule_session?.start_time?.slice(0, 5) : 'Immediate'}</p>
              </Box>
            </CardContent>
            <CardActions>
              <Stack direction="row" spacing={2}>
               {value?.status === 'Awaiting' && (
                 <>
                  <button
                    onClick={() => setSelectedRequest({ type: 'accept', id :value?.id , body: {
                      "status": "Accepted",
                      "schedule_session_id":  value?.schedule_session?.id,
                      "schedule_session_request_id": value?.id
                    } })}

                    className="text--600 fs_xs text--coral px-1"
                  >
                    {value.status === 'Awaiting' && <span>Accept</span>}
                  </button>

                  <button
                    onClick={() => setSelectedRequest({ type: 'reject', id :value?.id , body: {
                      "status": "Rejected",
                      "schedule_session_id":  value?.schedule_session?.id,
                      "schedule_session_request_id": value?.id
                    } })}
                    className="text--600  fs_xs text--red px-1"
                  >
                    {value.status === 'Awaiting' && <span>Reject</span>}
                  </button>
                 </>
               )}
            {  value?.status === 'Accepted' && (
              <>
              <a href={value?.link} target="_blank" rel="noreferrer" className={classnames(
                Buttonstyles.btn,
                Buttonstyles.btn__primary,
                Buttonstyles.btn__sm
              )}  >Join Call</a>
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
            }
            

            <div className="pt-2">
              {!loading && !!requests?.requests?.length && (
                <Pagination
                  currentPage={requests?.page}
                  total={requests?.total_count}
                  perPage={dataPerPage}
                  fetchPage={(nextPage, itemsPerPage) => fetchRequest(activeTabContent.title, nextPage, itemsPerPage)}
                />
              )}
            </div>
          </div>

          {selectedRequest.type && (
            <ConfirmationModal
              isOpen={!!selectedRequest.type}
              isClose={() => setSelectedRequest({} as RequestAcceptance)}
              action={confirmOrRejectRequest}
              buttonCaption={selectedRequest.type === 'accept' ? 'Yes, Accept' : 'Reject'}
            />
          )}
        </div>
      </section>
    </Dashboard>
  );
}

