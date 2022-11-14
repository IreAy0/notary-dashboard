import React from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
// import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classnames from 'classnames';
// import styles from 'layouts/layouts.module.scss';
import { getSessionLink } from 're-ducks/request';
import { RootState } from 're-ducks/rootReducer';
import useTypedSelector from 'hooks/useTypedSelector';
import { Divider , useTheme } from '@mui/material';
import styles from 'layouts/layouts.module.scss';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import style from './callsection.module.scss';
import Buttonstyles from '../../components/Button/button.module.scss';
import Table from '../../components/Table';

interface BodyProps {
  data: any;
}



const CallSection = ({ data }: BodyProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const { requests } = data;
  const user: any = useTypedSelector((state: RootState) => state?.auth?.signIn);

  // console.log(data.filter(item => item.status === 'Accepted'), 'home')

  const filtered = data.filter(item => item.status === 'Accepted')
  const handleSessionLink = () => {
    // dispatch(
    //   getSessionLink(
    //     {
    //       request_id: requests?.request_id,
    //       type: "notary",
    //       participant_id: user?.id
    //     },
    //     (res:any) => {
    //       const token:any = new URL(res?.session_url)?.searchParams?.get('token');
    //       localStorage?.setItem('accessToken', token);
    //       window.location.href = res?.session_url;
    //     },
    //     (error) => {
    //       toast.error(error)
    //     }
    //   )
    // )
  }

  return (
    <section className="pt-2">
       <div className={styles.table_container}>
          <div className="">
            <Table
              type="primary"
              tableData={filtered || []}
              headers={[]}
              loading={false}
              showSecondary
            >
              {(row: { [k: string]: any }) => (
                <>
                 <td className="table__row-text center">
                    <p className="text--blue text--600">Next Meeting</p>
                    </td>
                  <td className="table__row-text center text-dark text--600">
                    <Link className="text-dark text--600" to={`/requests/${row.id}`}>
                      {' '}
                      {row?.document_name || row?.schedule_session?.title || '-'}
                    </Link>
                    <br />
                    <p className='mt-1'>{format(parseISO(row?.schedule_session?.date), 'PPPP')} - {row?.schedule_session?.start_time?.slice(0, 5)}
</p>
                  </td>
                
                  <td className="table__row-text center">
                    
                   
                    <a href={row?.link} target="_blank" rel="noreferrer" className={classnames(
                      Buttonstyles.btn,
                      Buttonstyles.btn__accept,
                      Buttonstyles.btn__sm
                    )}  >Join Call</a>
                  </td>
                </>
              )}
            </Table>

           
          </div>
        </div>
       
    </section>
  );
};

export default CallSection;
