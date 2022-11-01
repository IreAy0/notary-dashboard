import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import { SidebarLink } from './SidebarLink';
import Sidebar from '.';

const meta: Meta = {
  title: 'Layout/SideBar',
  component: Sidebar
};

const Template: Story<any> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <SidebarLink isActive  title="Dashboard" /> <SidebarLink title="My documents" />{' '}
      <SidebarLink  title="Settings" />{' '}
    </>
  )
};

export const Closed = Template.bind({});

export default meta;
