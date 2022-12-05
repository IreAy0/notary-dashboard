import * as React from 'react';
// import json2mq from 'json2mq';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MediaQuery() {
  const matchSM = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
  const matchLG = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  return{ matchSM, matchLG};
}
