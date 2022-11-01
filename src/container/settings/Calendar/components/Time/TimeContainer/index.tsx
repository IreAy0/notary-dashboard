import React, { FC, useCallback, useMemo } from 'react';
import TimeButton from '../TimeButton';
import styles from '../../../../settings.module.scss';

interface Props {
  setCurrentSelectedTimes: (item: any) => void;
  currentSelectedTimes: [];
  timeArray: {
    id?: string;
    show: boolean;
  }[];
  setTimeArray: (item: any) => void;
  disabled: boolean;
  setConfirmButton: (open: boolean) => void;
}

const TimeContainer: FC<Props> = ({
  setCurrentSelectedTimes,
  currentSelectedTimes,
  timeArray,
  setTimeArray,
  disabled,
  setConfirmButton
}: Props) => {
  const handleClick = useCallback(
    (id: string) => {
      const newItems = [...timeArray];
      const index = newItems?.findIndex((item) => item.id === id);
      const selectedItem = newItems?.find((item) => item.id === id);
      newItems[index] = { ...selectedItem, show: !selectedItem?.show };
      setTimeArray(newItems);
      if (newItems[index].show) {
        setCurrentSelectedTimes([...currentSelectedTimes, id]);
        setConfirmButton(false);
      } else {
        setCurrentSelectedTimes(currentSelectedTimes.filter((i: any) => i !== id));
        setConfirmButton(false);
      }
    },
    [setCurrentSelectedTimes, currentSelectedTimes, setConfirmButton, setTimeArray, timeArray]
  );

  return (
    <div className={styles.timeContainer}>
      <h3>Select Time</h3>
      <div className="grid grid__layout grid__layout--4 gap-2">
        {useMemo(
          () =>
            timeArray?.map((item: any) => (
              <TimeButton onButtonClick={() => handleClick(item.id)} time={item.id} active={item.show} disabled={disabled} />
            )),
          [timeArray, disabled, handleClick]
        )}
      </div>
    </div>
  );
};

export default TimeContainer;
