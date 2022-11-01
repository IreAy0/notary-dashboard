import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Upload, { Props } from '.';

export default {
  title: 'Components/Upload',
  component: Upload
};

const Template: Story<Props> = (args: Props) => <Upload {...args} />;

export const Default = Template.bind({});

Default.args = {
  fileRule: 'Please, use: PDF, XLS, WORD etc',
  placeholder: 'Upload Document',
  maxFilesize: 2,
  label: 'Personal ID'
};
