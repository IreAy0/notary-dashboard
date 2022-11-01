import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

interface calendarProps {
  onDayClick: (day: Date) => void;
  selectedDays: [];
  disableDays: any;
  onDayFocus: (res: Date) => void;
  modifiers: {
    birthday: Date;
  };
  initialMonth: Date;
  onMonthChange: (res: Date) => void;
  fromMonth: Date;
}

const NotaryCalendar = ({
  onDayClick,
  selectedDays,
  disableDays,
  onDayFocus,
  modifiers,
  initialMonth,
  onMonthChange,
  fromMonth
}: calendarProps) => (
  <div>
    <DayPicker
      showOutsideDays
      onDayClick={onDayClick}
      selectedDays={selectedDays}
      disabledDays={disableDays}
      onDayMouseDown={onDayFocus}
      modifiers={modifiers}
      showWeekDays
      initialMonth={initialMonth}
      onMonthChange={onMonthChange}
      fromMonth={fromMonth}
    />
  </div>
);

export default NotaryCalendar;

