/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { RootState } from 're-ducks/rootReducer';
import useTypedSelector from 'hooks/useTypedSelector';
import { ReactComponent as Star } from 'assets/icons/star.svg';
import formatCommissionNumber from 'utils/formatCommissionNumber';
import styles from './sealstamp.module.scss';

const Stamp = ({ actionType, requestData }: any) => {
  let userProfile: any = useTypedSelector((state: RootState) => state.user);

  useEffect(
    () => {
      if (actionType === 'requests') {
        userProfile = requestData;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={styles.company_stamp}>
      <div className={styles.company_stamp_inner}>
        <div className={styles.company_location}>
          <span>NOTARY PUBLIC</span>
        </div>
        <div className={styles.company_info}>
          <div className={styles.company_info_top}>
            <Star className={styles.star_logo} />
            <h3>{`${userProfile.first_name} ${userProfile.last_name}`}</h3>
            <Star className={styles.star_logo} />
          </div>
          <div className={styles.company_info_bottom}>SCNo. {formatCommissionNumber(userProfile.commission_number)}</div>
        </div>
        <div className={styles.company_address}>
          <div>
            +{userProfile.phonenumber}
            <div>
              <div>{userProfile.business_address}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Stamp;

