import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import { DateInput, IDateInputProps } from './DateInput';

const meta: Meta = {
  title: 'Components/DateInput',
  component: DateInput
};

const Template: Story<IDateInputProps> = (args) => <DateInput {...args} />;

export const Date = Template.bind({});
Date.args = {
  isRange: false
};

export const DateRange = Template.bind({});
DateRange.args = {
  isRange: true
};

export default meta;
