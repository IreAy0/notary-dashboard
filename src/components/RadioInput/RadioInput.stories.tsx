import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';

import { RadioInput, IRadioInputProps } from './RadioInput';

const meta: Meta = {
  title: 'components/RadioInput',
  component: RadioInput,
  argTypes: {
    onClick: { action: 'clicked' }
  }
};

const Template: Story<IRadioInputProps> = (args) => <RadioInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  validate: false,
  disabled: false
};

export default meta;
