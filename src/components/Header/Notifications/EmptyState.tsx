import React from 'react';
import { ReactComponent as SearchEmpty } from 'assets/icons/searchEmpty.svg';

export interface Props {
  text: string;
}

const EmptyState = ({ text }: Props) => (
  <div className="flex flex__column flex__item-center">
    <div className="flex flex__column flex__item-center flex__center">
      <SearchEmpty className="mb-1 mt-6" />
      <div>{text}</div>
    </div>
  </div>
);

export default EmptyState;
