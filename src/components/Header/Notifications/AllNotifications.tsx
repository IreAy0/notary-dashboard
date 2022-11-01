import React, { useCallback, useEffect, useState } from "react";
import moment from 'moment';
import UserIcon from 'assets/img/avatar-dummy.svg';
import { useSelector, useDispatch } from "react-redux";
import { fetchGeneralNotifications } from "re-ducks/notifications";
import EmptyState from './EmptyState';
import NotificationLoader from "./NotificationLoader";
import styles from '../../Modal/Modal.module.scss';

const AllNotifications = () => {
  const [loading, setLoading] = useState(false);
  const data: any = useSelector((state: any) => state.notification);
  const { notifications } = data

  const dispatch = useDispatch();

  const fetchNotifications = useCallback(
    (nextPage = 1, itemsPerPage = 10) => {
      setLoading(true);
      const payload = {
        page: nextPage,
        perPage: itemsPerPage
      };
      dispatch(
        fetchGeneralNotifications(
          () => {
            setLoading(false);
          },
          () => setLoading(false),
          payload
        )
      );
    },
    [dispatch, setLoading]
  );

  useEffect(
    () => {
      fetchNotifications();
    },
    // eslint-disable-next-line
    [dispatch, fetchNotifications]
  );
  
  return(
        <div>
            {loading ? (
                <NotificationLoader />
            ) : (
              <>
          {notifications && notifications.length === 0 && <EmptyState text="No available notifications" />}
          {notifications &&
            notifications.length > 0 &&
            notifications.map((item: any) => (
              <div className={styles.notifs__single} key={item.id}>
                <div className={styles.left}>
                  <div className={styles.image}>
                    <img src={UserIcon} alt="user-icon" />
                  </div>

                  <div className={styles.action}>
                    <span>{item?.content}</span>
                  </div>
                </div>
                <div className={styles.right}>
                  <h4>{moment(item.updated_at).fromNow()}</h4>
                </div>
              </div>
            ))}
              </>
            )}
        </div>
  )
}

AllNotifications.defaultProps = {
  loading: false
};

export default AllNotifications;
