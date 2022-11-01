import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import Footer, { IFooterProps } from '.';

const meta: Meta = {
  title: 'Layout/Footer',
  component: Footer
};

const Template: Story<IFooterProps> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};

export default meta;
