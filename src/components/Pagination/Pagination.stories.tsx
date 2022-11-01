import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Pagination, { Props } from './Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination
};

const Template: Story<Props> = (args: Props) => <Pagination {...args} />;

export const Default = Template.bind({});

Default.args = {
  currentPage: 1,
  total: 1,
  perPage: 10,
  fetchPage: () => 'next page'
};
