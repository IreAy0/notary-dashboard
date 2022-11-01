import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react';
import { Tags, ITagsProps } from './Tags';

const meta: Meta = {
  title: 'Components/Tags',
  component: Tags
};

const Template: Story<ITagsProps> = (args) => <Tags {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Iryna Sofiian'
};

export default meta;
