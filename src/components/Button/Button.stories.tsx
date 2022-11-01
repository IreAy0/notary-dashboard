import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import Button, { Props } from '.';

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    children: {
      defaultValue: 'Default Text'
    }
  }
};

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  theme: 'primary'
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  children: 'Primary',
  theme: 'primary',
  variant: 'outline'
};

export const PrimaryOutlineDisabled = Template.bind({});
PrimaryOutlineDisabled.args = {
  children: 'Primary',
  theme: 'primary',
  variant: 'outline',
  disabled: true
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  theme: 'secondary'
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'outline',
  variant: 'outline',
  color: 'none'
};

export const Plain = Template.bind({});
Plain.args = {
  children: 'Plain',
  theme: 'plain'
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large',
  size: 'lg'
};

export const Small = Template.bind({});
Small.args = {
  children: 'small btn',
  size: 'sm'
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  disabled: true
};

export default meta;
