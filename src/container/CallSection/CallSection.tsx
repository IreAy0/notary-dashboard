import React from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import styles from 'layouts/layouts.module.scss';
import { getSessionLink } from 're-ducks/request';
import { RootState } from 're-ducks/rootReducer';
import useTypedSelector from 'hooks/useTypedSelector';
import { Divider , useTheme } from '@mui/material';
import style from './callsection.module.scss';

interface BodyProps {
  data: any;
}



const CallSection = ({ data }: BodyProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const { requests } = data;
  const user: any = useTypedSelector((state: RootState) => state?.auth?.signIn);

  console.log(data.filter(item => item.status === 'Accepted'), 'home')

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
      <div className={styles.conference_section}>
        <div>
          {filtered ? (
            filtered?.map((item: any) => (
              <div>
              <h3>
                <strong>{item?.document_name || item?.schedule_session?.title || '-'}</strong>
              </h3>
              <div className={styles.conference_section__btn}>
                <button onClick={() => handleSessionLink()}>Click here to join</button>
                <p className={styles.conference_section__type}>{item?.schedule_session?.immediate_session === true ? 'Immediate' : 'Scheduled'}</p>
              </div>
              <Divider
              sx={{
                my: theme.spacing(2),
                background: theme.colors.secondary.light
              }}
        />
            </div>
            ))
           
          ) : (
            <div className={style.not_active_container}>
              <h2>Meetings</h2>
              <p>You have no scheduled meetings for today</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallSection;
