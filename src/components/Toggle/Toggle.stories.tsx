import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Toggle, { ToggleProps } from '.';

export default {
  title: 'Components/Toggle',
  component: Toggle
};

const Template: Story<ToggleProps> = (args: ToggleProps) => <Toggle {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Billing & payment'
};

