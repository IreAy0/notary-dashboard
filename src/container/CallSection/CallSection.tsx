import React from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import styles from 'layouts/layouts.module.scss';
import { getSessionLink } from 're-ducks/request';
import { RootState } from 're-ducks/rootReducer';
import useTypedSelector from 'hooks/useTypedSelector';
import style from './callsection.module.scss';

interface BodyProps {
  data: any;
}

const CallSection = ({ data }: BodyProps) => {
  const dispatch = useDispatch();
  const { request } = data;
  const user: any = useTypedSelector((state: RootState) => state?.auth?.signIn);

  const handleSessionLink = () => {
    dispatch(
      getSessionLink(
        {
          request_id: request?.request_id,
          type: "notary",
          participant_id: user?.id
        },
        (res:any) => {
          const token:any = new URL(res?.session_url)?.searchParams?.get('token');
          localStorage?.setItem('accessToken', token);
          window.location.href = res?.session_url;
        },
        (error) => {
          toast.error(error)
        }
      )
    )
  }

  return (
    <section className="pt-2">
      <div className={styles.conference_section}>
        <div>
          {data?.request ? (
            <div>
              <h3>
                <strong>{data?.request?.document_name}</strong>
              </h3>
              <div className={styles.conference_section__btn}>
                <button onClick={() => handleSessionLink()}>Click here to join</button>
                <p className={styles.conference_section__type}>{data?.request?.immediate_session ? 'Immediate' : 'Scheduled'}</p>
              </div>
            </div>
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
