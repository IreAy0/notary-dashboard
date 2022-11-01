import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Badge, { BadgeProps } from '.';

export default {
  title: 'Components/Badge',
  component: Badge
};

const Template: Story<BadgeProps> = (args: {}) => <Badge {...args}>Default</Badge>;

export const Default = Template.bind({});

export const Info = Template.bind({});

Info.args = {
  theme: 'info'
};

export const Success = Template.bind({});

Success.args = {
  theme: 'success'
};

export const Warning = Template.bind({});

Warning.args = {
  theme: 'warning'
};

export const SecondaryInfo = Template.bind({});

SecondaryInfo.args = {
  theme: 'info',
  type: 'secondary'
};

export const SecondarySuccess = Template.bind({});

SecondarySuccess.args = {
  theme: 'success',
  type: 'secondary'
};

export const SecondaryWarning = Template.bind({});

SecondaryWarning.args = {
  theme: 'warning',
  type: 'secondary'
};
