import React from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import classnames from 'classnames';
import styles from './select.module.scss';

export interface SelectProps {
  label?: string;
  placeholder?: string;
  handleChange(option: { name: string; id: any }): void;
  options: {
    name: string | any;
    id?: string | number;
  }[];
  selected?: { name: string } | any;
  disabled?: boolean;
}


export default function SelectInput({ options, label, disabled = false, selected, handleChange, placeholder, ...props }: SelectProps) {
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState<string[]>([]);

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {target: { value }} = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value
  //   );
  // };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
        {label && <span className="label__title">{label} </span>}
        <select id="gender" className={classnames(styles.select__btn, disabled ? styles.select__disabled : '')}>
                <option disabled>Please select a gender</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">I&apos;d prefer not to say</option>
              </select>
      </FormControl>
    </div>
  );

}


SelectInput.defaultProps = {
  placeholder: 'Select',
  label: '',
  disabled: false,
  selected: null
}
