import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Select, { SelectProps } from '.';

export default {
  title: 'Components/Select',
  component: Select
};

const options = [
  {
    name: 'Lagos',
    id: 15
  },
  {
    name: 'Anambra',
    id: 12
  },
  {
    name: 'Kogi',
    id: 1
  },
  {
    name: 'Lokoja',
    id: 10
  },
  {
    name: 'Kwara',
    id: 11
  }
];

const Template: Story<SelectProps> = (args: SelectProps) => <Select {...args} />;

export const Default = Template.bind({});

Default.args = {
  selected: {
    name: 'Lagos'
  },
  handleChange: () => 'hi',
  label: 'Filter By Stat',
  options
};
