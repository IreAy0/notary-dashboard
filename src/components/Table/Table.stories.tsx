/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Story } from '@storybook/react';
import Table, { TableProps } from '.';
import { data } from '../../mocks/table';

export default {
  title: 'Components/Table',
  component: Table
};

const Template: Story<TableProps> = (args: TableProps) => (
  <Table {...args}>
    {(row) => (
      <>
        <td className="table__row-text center">
          {row.title}
          <br />
          <span style={{ color: '#CACACA' }}>{row.desc}</span>
        </td>
        <td className="table__row-text center">{row.status}</td>
        <td className="table__row-text center">{row.edited}</td>
        <td className="table__row-text center">{row.average_time}</td>
        <td className="table__row-text center">
          <button type="button">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 20.5C10.8954 20.5 10 19.6046 10 18.5C10 17.3954 10.8954 16.5 12 16.5C13.1046 16.5 14 17.3954 14 18.5C14 19.6046 13.1046 20.5 12 20.5ZM12 14.5C10.8954 14.5 10 13.6046 10 12.5C10 11.3954 10.8954 10.5 12 10.5C13.1046 10.5 14 11.3954 14 12.5C14 13.0304 13.7893 13.5391 13.4142 13.9142C13.0391 14.2893 12.5304 14.5 12 14.5ZM12 8.5C10.8954 8.5 10 7.60457 10 6.5C10 5.39543 10.8954 4.5 12 4.5C13.1046 4.5 14 5.39543 14 6.5C14 7.03043 13.7893 7.53914 13.4142 7.91421C13.0391 8.28929 12.5304 8.5 12 8.5Z"
                fill="#7B7171"
              />
            </svg>
          </button>
        </td>
      </>
    )}
  </Table>
);

export const Default = Template.bind({});

Default.args = {
  type: 'primary',
  loading: false,
  tableData: data
};
