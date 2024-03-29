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
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Modal, Typography, Divider, IconButton } from '@mui/material';
import OTPModal from 'container/Modal/OTPModal';
import instance from 'services/axios';
import toast from 'react-hot-toast';
import Upload from 'components/Upload';
import TemplateUpload from 'components/Upload/templateUpload';
import { getAllTemplates } from 're-ducks/template';
import styles from '../../pages/MyRequest/request.module.scss';
import { ReactComponent as EmptyIcon } from '../../assets/icons/requestEmptyIcon.svg';
import Table from '../../components/Table';

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
  // const [userProfile, setUserProfile] = useState<any>();
  // const [templates, setTemplates] = useState([]);
  const [useMockData, setUseMockData] = useState<any>([]);
  const dispatch = useDispatch();
  // const userProfile = useTypedSelector((state: any) => state.user);
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
          },
          () => {
            setLoading(false);
          }
        )
      );
    },
    [dispatch]
  );

  const deleteDocument = useCallback((id: any = '') => {
    instance.post(`/document-multiple-delete`, {documents: [{ "document_id": id,
      "permanent_delete": true}]})
      .then(res => {
        fetchAllUploadedTemplates()
        toast.success(res?.data?.data?.message);
        
      })
      .catch(err => {
        toast.error(`Couldn't delete Document, Please try again!`)
      })
  }, [fetchAllUploadedTemplates])

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

  // console.log(showOTPModal, user?.user?.access_locker_documents, templates, 'here' )

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
                <Link to={`/locker/${row?.id}/document`} className="text--600 text--blue">
                  {row.title}
                </Link>
                <br />
               
              </td>
              <td className="table__row-text center">
                <IconButton onClick={() => deleteDocument(row?.id)} sx={{"&:hover": {backgroundColor: "transparent" }}} edge="end" aria-label="delete">
               <DeleteIcon color="error"/>
             </IconButton></td>
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

