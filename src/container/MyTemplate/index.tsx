import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lockerHeaders, templateHeaders } from 'mocks/table';
import Pagination from 'components/Pagination';
import { Link } from 'react-router-dom';
import { fetchUserProfile } from 're-ducks/user';
import { getAllCompleteRequestAction } from 're-ducks/locker';
import useTypedSelector from 'hooks/useTypedSelector';
import priceSplitter from 'helpers/priceSplitter';
import { RootState } from 're-ducks/rootReducer';
import { Box, Button, Modal, Typography, Divider } from '@mui/material';
import OTPModal from 'container/Modal/OTPModal';
import instance from 'services/axios';
import Table from '../../components/Table';
import toast from 'react-hot-toast';
import { ReactComponent as EmptyIcon } from '../../assets/icons/requestEmptyIcon.svg';
import styles from '../../pages/MyRequest/request.module.scss';
import Upload from 'components/Upload';
import TemplateUpload from 'components/Upload/templateUpload';
import { getAllTemplates } from 're-ducks/template';

interface mockData {
  id: number;
  title: string;
  date: string;
  email: string;
  phone: string;
  amount: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};


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

const MyTemplateTable = () => {
  const [loading, setLoading] = useState(true);
  const [dataPerPage, setDataPerPage] = useState(10);
  // const [templates, setTemplates] = useState([]);
  const [useMockData, setUseMockData] = useState<any>([]);
  const dispatch = useDispatch();
  const { locker, templates }: any = useTypedSelector((state) => state);
  const user: any = useTypedSelector((state) => state);
  const [showOTPModal, setOTPModal] = useState<Boolean>(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const fetchAllUploadedTemplates = useCallback(
    
    (nextPage: any = 1, itemsPerPage: any = 10) => {
      setLoading(true);
      setDataPerPage(itemsPerPage);
      dispatch(
        getAllTemplates(
          (res: any) => {
            setLoading(false);
            console.log(res, 'file')
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
    fetchAllUploadedTemplates();
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {

    dispatch(
      fetchUserProfile(
        
        {},
        () => {
         
        },
        () => {}
      )
    );
  }, [dispatch]);     

  console.log(showOTPModal, user?.user?.access_locker_documents, templates, 'here' )

  return (
    <div className="mt-1">
      <TemplateUpload maxFilesize={2} fileRule=" " label='Upload Document' placeholder='Please click here to upload template document'/>
      <Divider  sx={{my:3}} />
      <Typography sx={{
        mb:3
      }} variant="h4" component="h4">
          All Templates
      </Typography>
      <Table
        type="primary"
        tableData={templates?.templates || []}
        headers={templateHeaders}
        loading={loading}
        placeHolderImg={!loading && <EmptyState isDocumentEmpty={locker?.lockers?.length <= 0} />}
      >
        {(row: { [k: string]: any }) => (
          <>
              <td className="table__row-text center">
                <Link to={`/locker/${row?.id}`} className="text--600 text--blue">
                  {row.title}
                </Link>
                <br />
               
              </td>
              <td className="table__row-text center">{row?.phone}</td>
              <td className="table__row-text center">{row?.email}</td>
             
          </>
        )}
      </Table>
      <div className="pt-2">
        {!loading && !!locker?.lockers?.requests?.length && (
          <Pagination
            currentPage={locker?.lockers?.pagePayload?.page}
            total={locker?.lockers?.pagePayload?.total}
            perPage={dataPerPage}
            fetchPage={(nextPage, itemsPerPage) => fetchAllUploadedTemplates(nextPage, itemsPerPage)}
          />
        )}{' '}
      </div>
    </div>
  );
};

export default MyTemplateTable;

