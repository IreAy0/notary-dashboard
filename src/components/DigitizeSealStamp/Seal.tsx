import React from 'react';
import SealImage from './SealImage';
import styles from './sealstamp.module.scss';

const Seal = ({actionType, requestData}: any) => (
	<div className={styles.seal_div}>
		<div className={styles.div1}>
			<SealImage actionType={actionType} requestData={requestData} />
		</div>
	</div>
);

export default Seal;
