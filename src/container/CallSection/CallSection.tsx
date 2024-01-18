import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
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
import MediaQuery from 'helpers/useMediaQuery';
import { getToken } from 'utils/getToken';
import api from 'services/api';
import style from './callsection.module.scss';
import Buttonstyles from '../../components/Button/button.module.scss';
import Table from '../../components/Table';

interface BodyProps {
  data: any;
}



const CallSection = ({ data }: BodyProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [nextRequest, setNextRequest] = useState([])

  // const { requests } = data;
  const user: any = useTypedSelector((state: RootState) => state?.auth?.signIn);
  const start =  new Date().getTime()
  const end=new Date()
  end.setHours(23,59,59,999)
  end.getTime()
  const env_variable = `${process.env.REACT_APP_ENVIRONMENT}` === 'live' ? `${process.env.REACT_APP_VIRTUAL_NOTARY_LIVE}` : `${process.env.REACT_APP_ENVIRONMENT}` === 'staging' ? `${process.env.REACT_APP_VIRTUAL_NOTARY_STAGING}` : `${process.env.REACT_APP_VIRTUAL_NOTARY_DEV}`
  useEffect(() => {
    api.get('notary/notary-virtual-session-today')
      .then(res => 
      {
        setNextRequest(res?.data)
      }
      )
      .catch(err =>{
        toast.success(`Error Fetching requests`);

      } );

  }, [])

  const filtered = nextRequest?.filter((item: any) => item?.status === 'Accepted')
  

  return (
    <section className="pt-2">
       <div className={styles.table_container}>
          <div className="">
            <Table
              type="primary"
              tableData={filtered?.reverse() || []}
              headers={[]}
              loading={false}
              showSecondary
            >
              {(row: { [k: string]: any }) => (
                <>
                 <td  className="table__row-text center">
                    <p className="text--blue text--600">Next Meeting</p>
                    </td>
                  <td className="table__row-text center text-dark text--600">
                    <Link className="text-dark text--600" to={`/requests/${row.id}`}>
                      {' '}
                      {row?.document_name || row?.title || '-'}
                    </Link>
                   
                    <p style={{
                     
                    }} className='mt-1'> {row?.date} - { row?.start_time?.slice(0, 5)}</p>
                  </td>
                
                  <td className="table__row-text center">
                  <a 
                    href={`${env_variable}notary/session-prep/${row.id}?token=${getToken()}`} 
                    target="_blank" rel="noreferrer" 
                    className={classnames(
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
