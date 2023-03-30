import React, { useState } from 'react';
import CustomSelect, { DefaultTab } from 'components/CustomSelect';
import Button from 'components/Button';
import { DateRangePicker } from 'react-date-range';
import Select from 'components/Select';
import SelectBtnStyles from 'components/CustomSelect/customSelect.module.scss';
import { ReactComponent as WhiteTick } from 'assets/icons/white-tick.svg';
import { IFilterItemProps } from './FilterItem.interface';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './FilterItem.module.scss';

export interface SignerProp {
  [k: string]: null | string | number;
}

const FilterItem = ({ status, setStatus, onRangeSelect, dateRange, refreshDoc }: IFilterItemProps) => {
  const [selectToggled, setSelectToggled] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const options = [
    { name: 'Pending', id: 1 },
    { name: 'Scheduled', id: 2 },
    { name: 'Rejected', id: 3 }
  ];

  const formatDate = (value: Date) => {
    const [month, date, year] = value.toLocaleDateString().split('/');

    return [year, month, date].join('-');
  };

  const handleDate = (value: any) => {
    setSelectedDate(value.selection || value.range1);
  };

  const selectDate = () => {
    const { startDate: start_date, endDate: end_date } = selectedDate;
    onRangeSelect({
      start_date: formatDate(start_date),
      end_date: formatDate(end_date)
    });
    setSelectToggled((prevState) => !prevState);
  };

  return (
    <div className={styles.filterItemWrapper}>
      <div className={styles.filterItemBody}>
        <div className={styles.filterLabel}>
          <span>Date</span>
          <button onClick={() => refreshDoc()} className={styles.clearLabel}>
            Clear
          </button>
        </div>
        <CustomSelect
          tab={
            <DefaultTab
              label={
                <span>
                  {dateRange.start_date
                    ? `${dateRange.start_date.toString().split('-').join('/')} - ${dateRange.end_date.toString().split('-').join('/')}`
                    : 'Select'}
                </span>
              }
            />
          }
          optionSelected={selectToggled}
        >
          <div style={{ transform: 'scale(0.88)', transformOrigin: 'top left' }}>
            <DateRangePicker rangeColors={['#766458']} ranges={[selectedDate]} onChange={handleDate} />
          </div>
          <Button theme="primary" className={SelectBtnStyles['custom__dropdown-btn']} onClick={selectDate}>
            <WhiteTick />
          </Button>
        </CustomSelect>
      </div>
      <div className={styles.filterItemBody}>
        <div className={styles.filterLabel}>
          <span>Status</span>
          <button onClick={() => refreshDoc()} className={styles.clearLabel}>
            Clear
          </button>
        </div>
        <Select selected={status} handleChange={setStatus} label="" options={options} />
      </div>
    </div>
  );
};

export default FilterItem;
