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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IconButton } from 'material-ui';
import instance from 'services/axios';
import NotaryCalendar from './components/NotaryCalendar';
import TimeContainer from './components/Time/TimeContainer';
import ConfirmPopulationModal from './CalendarPopulationModal';
import { getNextDay } from './date';
import styles from '../settings.module.scss';
import { Link } from 'react-router-dom';

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

const Calendar = () => {
  const [userProfile, setUserProfile] = useState<any>();
  const [selectedDays, setSelectedDays] = useState<any>([]);
  const [disableSaveButton,setDisableSaveButton] = useState<any>(false);
  const [selectedNotaryCalendar, setSelectedNotaryCalendar] = useState<any>([]);
  const [showPopulationModal, setPopulationModal] = useState(false);
  const [available_times, setAvailableTimes] = useState<any>([]);
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

  const addTableRows = () => {
    const rowsInput = {
      day: '',
      date: '',
      start_time: '',
      end_time: ''
    };
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, event: SelectChangeEvent<typeof calendarData>) => {
    const { name, value } = event.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    if (name === 'day') {
      const next =  getNextDay(value)
      rowsInput[index].date = next.toDateString();
    
    }
    setRowsData(rowsInput);
  };

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



  const saveCalendarDetails = () => {
    console.log('saveCalendarDetails', selectedDays, rowsData);
    dispatch(
      createNotaryCalendar(
        {
          calendar: rowsData
        },
        () => {
          toast.success('Notary available times/dates saved');
          // setSelectedDays(selectedDays);
          setDisableSaveButton(true);
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
          dispatch(
            fetchNotaryCalendar(
              {},
              (success) => {
                console.log(success, 'calendar');
                setAvailableTimes(success);
              },
              (error: any) => {
                toast.error("Couldn't save times/dates");
              }
            )
          );
        },
        () => {}
      )
    );
  };
 

  const isCloseModal = () => {
    setPopulationModal(false);
  };


  return (
    <>
      {/* {showPopulationModal && (
        <ConfirmPopulationModal
          isOpen={showPopulationModal}
          isClose={() => isCloseModal()}
          onPopulateClick={() => populateForOtherMonths()}
        />
      )} */}
      <div>
        <h3 className={styles.calendarHeader}>Select Day & Time</h3>
        <p className={styles.calendarCaption}>You can set your schedule for multiple dates. Click here to see how it works.</p>
        <div className={styles.calendarContainer}>
          <div className={styles.calendarContainer__section_one}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Start time</TableCell>
                    <TableCell align="center">End time</TableCell>
                    <TableCell align="center">
                      <Button size="sm" onClick={addTableRows} variant="solid" color="primary">
                        <AddIcon fontSize="medium" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
               
                <TableBody>
                  {rowsData.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Select
                          displayEmpty
                          value={row.day}
                          onChange={(e) => handleChange(index, e)}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          inputProps={{
                            name: 'day'
                          }}
                        >
                          <MenuItem disabled value="">
                            <em>Select day</em>
                          </MenuItem>
                          {days.map(({ name}) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="center"><MenuItem disabled >
                            
                            {row.date ? row.date : <em>Date</em>}
                          </MenuItem> </TableCell>
                      <TableCell align="center">
                        <Select
                          displayEmpty
                          value={row.start_time}
                          onChange={(e) => handleChange(index, e)}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          inputProps={{
                            name: 'start_time'
                          }}
                        >
                          <MenuItem disabled value="">
                            <em>Select start time</em>
                          </MenuItem>
                          {time_slots.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <Select
                          displayEmpty
                          value={row.end_time}
                          onChange={(e) => handleChange(index, e)}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          inputProps={{
                            name: 'end_time'
                          }}
                        >
                          <MenuItem disabled value="">
                            <em>Select end time</em>
                          </MenuItem>
                          {time_slots.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <Button theme='reject' size="sm" onClick={() => deleteTableRows(index)} color="error">
                          <CloseIcon fontSize="medium" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
          </div>
          <div className="br-1" />
          
        </div>
        <div className={styles.calendarButtonContainer}>
          
          <Button className="mt-4" type="submit" width={161} onClick={() => saveCalendarDetails()} >
            Save
          </Button>
          <Link to='/settings/Review_Calendar' className="mt-4" >

           View
          </Link>
        </div>
      </div>
    </>
  );
};

export default Calendar;
