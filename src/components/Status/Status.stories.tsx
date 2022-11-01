import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import { Status, IStatusProps } from './Status';

const meta: Meta = {
  title: 'Components/Status',
  component: Status
};

const Template: Story<IStatusProps> = (args) => <Status {...args} />;

export const Default = Template.bind({});
Default.args = {
  Text: 'Pending'
};

export const Sheduled = Template.bind({});
Sheduled.args = {
  Text: 'Scheduled'
};

export const Withdrawn = Template.bind({});
Withdrawn.args = {
  Text: 'Withdrawn'
};

export const Verified = Template.bind({});
Verified.args = {
  Text: 'Verified'
};

export const Incomplete = Template.bind({});
Incomplete.args = {
  Text: 'Incomplete'
};

export const Failed = Template.bind({});
Failed.args = {
  Text: 'Failed'
};

export const Blacklisted = Template.bind({});
Blacklisted.args = {
  Text: 'Blacklisted'
};

export default meta;
