import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import Alert, { IAlertProps } from '.';

const meta: Meta = {
  title: 'Components/Alert',
  component: Alert
};

const Template: Story<IAlertProps> = (args) => <Alert {...args} />;

export const Success = Template.bind({});
Success.args = {
  title: 'All Changes saved',
  type: 'success'
};

export const Error = Template.bind({});
Error.args = {
  title: 'Card is not avaliable, please check the card information',
  type: 'error'
};

export const Info = Template.bind({});
Info.args = {
  title: 'You need to be verified by ToNote Admin',
  type: 'info'
};

export default meta;
