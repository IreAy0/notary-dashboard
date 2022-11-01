import React, { HTMLAttributes, useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import parse from 'date-fns/parse';
import styles from './DateInput.module.scss';

export interface IDateInputProps extends HTMLAttributes<HTMLInputElement> {
  isRange?: boolean;
  setDate: (date: Date) => void;
  selectedDate: Date | null | string;
}

export const DateInput = ({ isRange, setDate, selectedDate }: IDateInputProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date('2021/07/01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2021/07/10'));
  const [formattedDate, setFormattedDate] = useState(selectedDate);

  useEffect(() => {
    // handle valid date formatting
    if (typeof selectedDate === 'string' && Date.parse(selectedDate)) {
      setFormattedDate(new Date(selectedDate));
    } else if (typeof selectedDate === 'string' && selectedDate.includes('-')) {
      const date = selectedDate.split('-').reverse().join('-');
      setFormattedDate(parse(date, 'yyyy-MM-dd', new Date()));
    } else setFormattedDate(selectedDate || new Date());
  }, [selectedDate]);

  return (
    <>
      {isRange ? (
        <>
          <ReactDatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className={styles.storybookTextInput}
          />
          <ReactDatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className={styles.storybookTextInput}
          />
        </>
      ) : (
        <div>
          <ReactDatePicker
            placeholderText="DD-MM-YYYY"
            dateFormat="dd-MM-yyyy"
            selected={formattedDate as Date}
            onChange={(date: Date) => setDate(date)}
            className={styles.storybookTextInput}
          />
        </div>
      )}
    </>
  );
};

DateInput.defaultProps = {
  isRange: false
}
