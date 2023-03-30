import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import { ProgressBar, IProgressBarProps } from './ProgressBar';

const meta: Meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar
};

const Template: Story<IProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  Level: 20,
  Color: 'red'
};

export const Light = Template.bind({});
Light.args = {
  Level: 20,
  Color: '#766458'
};

export default meta;
