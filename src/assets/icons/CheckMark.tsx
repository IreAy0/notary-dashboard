import React from 'react';

type Prop = {
  color?: string;
  className?: string;
};

const CheckMark = ({ color, className }: Prop) => (
 <svg className={className} width="24" height="20" viewBox="0 0 24 20" fill={color}  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M23.5465 2.75574L21.6444 0.915191C21.0539 0.343507 20.111 0.359392 19.5394 0.950454L9.43448 11.3968C8.8623 11.9878 7.82072 12.1352 7.10708 11.7263L3.54557 9.68523C2.833 9.2763 1.92283 9.52297 1.51399 10.2365L0.197467 12.5332C-0.211461 13.2467 0.0352094 14.1564 0.748276 14.5652C0.748276 14.5652 9.38832 19.5103 9.39182 19.5033C9.39581 19.4963 20.8064 7.72949 23.5814 4.86126C24.153 4.26978 24.1371 3.32693 23.5465 2.75574Z"
    fill={color}
  />
</svg>);

CheckMark.defaultProps = {
  color: '#fff',
  className: ' '
};

export default CheckMark;
