import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import { Filters, IFiltersProps } from './Filters';

const meta: Meta = {
  title: 'Components/Filters',
  component: Filters,
  argTypes: {
    onClick: { action: 'clicked' }
  }
};

const Template: Story<IFiltersProps> = (args) => <Filters {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <input type="text" placeholder="Document Title, Status & Date" />
};

export const DateInput = Template.bind({});
DateInput.args = {
  children: <input type="date" placeholder="Document Title, Status & Date" />
};

export const SelectFilter = Template.bind({});
SelectFilter.args = {
  children: (
    <select>
      <option value="1">select</option>
    </select>
  )
};

export const HasFilters = Template.bind({});
HasFilters.args = {
  children: (
    <select>
      <option value="1">select</option>
    </select>
  ),
  filters: 2
};

export default meta;
