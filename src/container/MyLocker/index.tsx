import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lockerHeaders } from 'mocks/table';
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
import toast from 'react-hot-toast';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// import Box from '@mui/material/Box';
import {DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColumns} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Upload from 'components/Upload';
import Table from '../../components/Table';
import { ReactComponent as EmptyIcon } from '../../assets/icons/requestEmptyIcon.svg';
import styles from '../../pages/MyRequest/request.module.scss';

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

export const mockClientItems = (itemsNumber = 10) => {
  const mockItems: mockData[] = [];
  for (let i:number = 1; i < itemsNumber + 1; i += 1) {
    const item: mockData = { 
      id: i,
      title: `Client ${i}`,
      date: `'12/${i}/2020'`,
      email: `client${i}@email.com  `,
      phone: `08012345678  `,
      amount: 100000
    }

    mockItems.push( item );
  }

  return mockItems;

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

const MyLockerTable = () => {
  const [loading, setLoading] = useState(true);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [complectedRequest, setCompletedRequest] = useState([]);
  const [useMockData, setUseMockData] = useState<any>([]);
  const dispatch = useDispatch();
  const { locker }: any = useTypedSelector((state) => state);
  const user: any = useTypedSelector((state) => state);
  const [showOTPModal, setOTPModal] = useState<Boolean>(false);
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  const fetchAllCompleteRequest = useCallback(
    (nextPage: any = 1, itemsPerPage: any = 10) => {
      setLoading(true);
      setDataPerPage(itemsPerPage);
      const params = {
        page: nextPage === 0 ? 1 : nextPage,
        per_page: itemsPerPage
      };
      dispatch(
        getAllCompleteRequestAction(
          { params },
          (res: any) => {
            setLoading(false);
            setCompletedRequest(res);
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
    fetchAllCompleteRequest();
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

  useEffect(() => {
    // setOTPModal(user?.user?.access_locker_documents)
    setUseMockData(mockClientItems(10));
  }, []);

  useEffect(() => {
    setOTPModal(user?.user?.access_locker_documents === false);
  }, [user?.user])
      
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const lockerMain = locker?.lockers
  type Row = typeof lockerMain[number];

  const [rows, setRows] = React.useState<Row[]>(lockerMain);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: 'title', headerName: 'Document Name', type: 'string' ,flex: 1, headerAlign: 'center',sortable: false, renderCell: (params: any) => (
        <Link to={params?.is_the_owner_of_document ? `/locker/${params?.id}/document` :  `/locker/${params?.id}`} className="text--600 text--blue">
          {/* /locker/${locker?.id}/document */}
          {params?.is_the_owner_of_document}  {params?.value} 
      </Link>
      )},
      { field: 'phone', headerName: 'Phone Number', type: 'number',headerAlign: 'center', flex: 1, sortable: false },
      { field: 'email', headerName:'Email', type: 'string' ,headerAlign: 'center', flex: 1,sortable: false},
      {
        headerName:'Action',
        field: 'actions',
        type: 'actions',
        headerAlign: 'center', flex: 1,
        getActions: (params) => [
          <GridActionsCellItem
            label="Share"
            // onClick={toggleAdmin(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
          label="Download"
          // onClick={toggleAdmin(params.id)}
          showInMenu
        />,
          <GridActionsCellItem
            label="Delete"
            // onClick={duplicateUser(params.id)}
            showInMenu
          />
        ]
      }
    ],
    [ ]
  );

  useEffect(() => {
    if(user?.user?.access_locker_documents === false){
      instance.get('/notary/notary-otp-locker')
        .then(res => {
          toast.success(res?.data?.message);
        
        })
        .catch((err) => {
          toast.error(err.message);
        })
    }
  },[user?.user?.access_locker_documents])

  // console.log(showOTPModal, user?.user?.access_locker_documents, locker, locker?.length <= 0 )

  return (
    <div className="mt-1">
      {showOTPModal  && <OTPModal isOpen={showOTPModal} isClose={() => setOTPModal(false)} />}
      <Upload maxFilesize={2} fileRule=" " label='Upload Document' placeholder='Please click here to upload document'/>
      <Divider  sx={{my:3}} />
      <Typography sx={{
        mb:3
      }} variant="h4" component="h4">
          All Documents
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        disableColumnMenu 
        disableColumnFilter	
        experimentalFeatures={{ newEditingApi: true }}
      />
      {/* <Table
        type="primary"
        tableData={locker?.lockers || []}
        headers={lockerHeaders}
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
              <td className="table__row-text center">
                 <Tooltip title="Document Actions">
                  
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon  />
          </IconButton>
        </Tooltip>
        </td>
          </>
        )}
        
      </Table> */}
      <div className="pt-2">
        {!loading && !!locker?.lockers?.requests?.length && (
          <Pagination
            currentPage={locker?.lockers?.pagePayload?.page}
            total={locker?.lockers?.pagePayload?.total}
            perPage={dataPerPage}
            fetchPage={(nextPage, itemsPerPage) => fetchAllCompleteRequest(nextPage, itemsPerPage)}
          />
        )}{' '}
      </div>
      {/* <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          Share
        </MenuItem>
        <MenuItem>
          Download
        </MenuItem>
        <MenuItem>
          Delete
        </MenuItem>
      </Menu> */}
    </div>
  );
};

export default MyLockerTable;

