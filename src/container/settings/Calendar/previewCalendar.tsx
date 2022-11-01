/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import generateCurrentMonth from 'utils/generateCurrentMonth';
// import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'components/Button';
import getAllDaysInMonth from 'utils/generateDaysInMonths';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createNotaryCalendar, fetchUserProfile } from 're-ducks/user';
import { fetchNotaryCalendar } from 're-ducks/user/user.action';
import List from '@mui/material/List';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Box, { BoxProps } from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IconButton } from 'material-ui';
import instance from 'services/axios';
import { Link } from 'react-router-dom';
import NotaryCalendar from './components/NotaryCalendar';
import TimeContainer from './components/Time/TimeContainer';
import ConfirmPopulationModal from './CalendarPopulationModal';
import { getNextDay } from './date';
import styles from '../settings.module.scss';

const times = [
  {
    id: '09:00',
    show: false
  },
  { id: '10:00', show: false },
  { id: '11:00', show: false },
  { id: '12:00', show: false },
  { id: '13:00', show: false },
  { id: '14:00', show: false },
  { id: '15:00', show: false },
  { id: '16:00', show: false },
  { id: '17:00', show: false },
  { id: '18:00', show: false }
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const days = [
  { name: 'Monday', id: '1' },
  { name: 'Tuesday', id: '2' },
  { name: 'Wednesday', id: '3' },
  { name: 'Thursday', id: '4' },
  { name: 'Friday', id: '5' }
];

const PreviewCalendar = () => {
  const [userProfile, setUserProfile] = useState<any>();
  const [selectedDays, setSelectedDays] = useState<any>([]);
  const [disableSaveButton,setDisableSaveButton] = useState<any>(false);
  const [selectedNotaryCalendar, setSelectedNotaryCalendar] = useState<any>([]);
  const [showPopulationModal, setPopulationModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<any>([]);
  const [time_slots, setTime_slots] = useState<any>([]);
  const [rowsData, setRowsData] = useState<any>([]);
  const [calendarData, setCalendarData] = useState<any>({
    day: '',
    date: '',
    start_time: '',
    end_time: ''
  });
  const [weekDays, setWeekDays] = useState<any>([]);

  useEffect(() => {
    instance
      .get(`/time-slots`)
      .then((res: any) => {
        setTime_slots(res?.data);
      })
      .catch((err: any) => console.log(err));
  }, []);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchNotaryCalendar(
        {},
        (success) => {
          setAvailableTimes(success);
        },
        (error: any) => {
          toast.error(error?.message);
        }
      )
    );

    dispatch(
      fetchUserProfile(
        {},
        (success) => {
          setUserProfile(success);
        },
        (error: any) => {
          toast.error(error?.message);
        }
      )
    );
  }, [dispatch]);


  const isCloseModal = () => {
    setPopulationModal(false);
  };


  return (
    <>
      <div>
        {/* <h3 className={styles.calendarHeader}>Select Day & Time</h3>
        <p className={styles.calendarCaption}>You can set your schedule for multiple dates. Click here to see how it works.</p>
        */}
        <div className={styles.calendarContainer}>
         
          <List
      sx={{
        width: '100%',
        // maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
        '& ul': { padding: 0 }
      }}
      subheader={<li />}
    >
      {[0].map((sectionId) => (
        <li key={sectionId}>
          <ul>
            <ListSubheader > 
            <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'transparent',
          padding: '10px'
        }}
      >
        {`Schedule for (${availableTimes?.data?.[0]?.date} - ${availableTimes?.data?.[availableTimes?.data?.length - 1]?.date}) `}
       <Link className='fs_sm' to='/settings/Review_Calendar' >
           Edit
        </Link>
      </Box>
      </ListSubheader>
      <TableContainer sx={{
        borderRadius: 0
      }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{borderBottom:"none"}}>Day</TableCell>
                    <TableCell style={{borderBottom:"none"}} align="left">Date</TableCell>
                    <TableCell style={{borderBottom:"none"}} align="left">Start time</TableCell>
                    <TableCell style={{borderBottom:"none"}} align="left">End time</TableCell>
                   
                  </TableRow>
                </TableHead>
               
                <TableBody>
                  {availableTimes?.data?.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell style={{borderBottom:"none"}} component="th" scope="row">
                        {row?.day}
                      </TableCell>
                      <TableCell style={{borderBottom:"none"}} align="left">
                       
                            { row.date }
                          
                        </TableCell>
                      <TableCell style={{borderBottom:"none"}} align="left">
                        {row?.start_time}
                      </TableCell>
                      <TableCell style={{borderBottom:"none"}} align="left">
                          {row?.end_time}
                      </TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          
          </ul>
        </li>
      ))}
    </List>
         
          {/* <div className="br-1" /> */}
          
        </div>
       
      </div>
    </>
  );
};

export default PreviewCalendar;
