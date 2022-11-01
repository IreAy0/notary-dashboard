import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import AlertTooltip, { IAlertTooltipProps } from '.';

const meta: Meta = {
  title: 'Components/AlertTooltip',
  component: AlertTooltip
};

const Template: Story<IAlertTooltipProps> = (args) => <AlertTooltip {...args} />;

export const Error = Template.bind({});
Error.args = {
  errorText: 'email must be a valid email',
  error: true
};

export default meta;
