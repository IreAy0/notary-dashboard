import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';

import { Input, Props } from './TextInput';

const meta: Meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    onClick: { action: 'clicked' },
    children: {
      defaultValue: 'Default Text'
    }
  }
};

const Template: Story<Props> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
  type: 'text'
};

export const Date = Template.bind({});
Date.args = {
  type: 'date'
};

export const Radio = Template.bind({});
Radio.args = {
  type: 'radio'
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  type: 'checkbox'
};

export const Phone = Template.bind({});
Phone.args = {
  type: 'phone'
};

export default meta;
