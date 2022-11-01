import React, { useEffect, useState, useCallback } from 'react';
import Table from 'components/Table';
import { ReactComponent as Empty } from 'assets/icons/requestEmptyState.svg';
import { headers } from 'mocks/payment';
import { useDispatch } from 'react-redux';
import styles from 'layouts/layouts.module.scss';
import { fetchPaymentHistory } from 're-ducks/user';
import useTypedSelector from 'hooks/useTypedSelector';
import { RootState } from 're-ducks/rootReducer';
import Pagination from 'components/Pagination';
import priceSplitter from 'helpers/priceSplitter';

const EmptyState = () => (
  <div className={styles.empty__state}>
    <Empty />
    <div>
      <p>No data available!</p>
    </div>
  </div>
);

const checkStatus = (time: any) => {
  let style = {};
  if (time === 'pending') {
    style = { color: '#FF9900', fontWeight: '500', textTransform: 'capitalize' };
  } else {
    style = { color: '#01AD12', fontWeight: '500', textTransform: 'capitalize' };
  }

  return style;
};

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const transactions: any = useTypedSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

  const { transactionDetails } = transactions;

  const fetchAllTransactions = useCallback(
    (nextPage: any = 1, itemsPerPage: any = 10) => {
      setLoading(true);
      setDataPerPage(itemsPerPage);
      setCurrentPage(nextPage === 0 ? 1 : nextPage)
      const params = {
        page: nextPage === 0 ? 1 : nextPage,
        per_page: itemsPerPage || 10
      };
      dispatch(
        fetchPaymentHistory(
          { params },
          () => {
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        )
      );
    },
    [dispatch]
  );

  // eslint-disable-next-line
  useEffect(fetchAllTransactions, [dispatch]);

  return (
    <div className="mt-2">
      <Table type="primary" tableData={transactionDetails?.transaction} headers={headers} loading={loading} placeHolderImg={<EmptyState />} showSecondary>
        {(row: { [k: string]: any }) => (
          <>
            <td className="table__row-text center">{row.transaction_date || '-'}</td>
            <td className="table__row-text center">{row.invoice_number}</td>
            <td className="table__row-text center">{`NGN ${priceSplitter(Math.floor(row.amount))}`}</td>
            <td className="table__row-text center" style={checkStatus(row.status)}>
              {row.status}
            </td>
          </>
        )}
      </Table>
      <div className="pt-2">
            {!loading && transactionDetails?.transaction?.length !== 0 && (
              <Pagination
                currentPage={currentPage}
                total={transactionDetails?.pagePayload?.total}
                perPage={dataPerPage}
                fetchPage={(nextPage, itemsPerPage) => fetchAllTransactions(nextPage, itemsPerPage)}
              />
            )}
          </div>
    </div>
  );
};

export default PaymentHistory;

