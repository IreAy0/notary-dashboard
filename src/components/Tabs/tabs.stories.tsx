import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Tabs, { TabsProps } from '.';

export default {
  title: 'Components/Tab',
  component: Tabs
};

const tabs = [
  {
    label: 'Company'
  },
  {
    label: 'Personal'
  },
  {
    label: 'Team Users'
  },
  {
    label: 'Billing & payment'
  }
];

const Template: Story<TabsProps> = (args: TabsProps) => <Tabs {...args} />;

export const Default = Template.bind({});

Default.args = {
  tabs,
  active: {
    label: 'Billing & payment'
  },
  setActive: (tab: any) => tab
};
