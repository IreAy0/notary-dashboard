import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lockerHeaders } from 'mocks/table';
import Pagination from 'components/Pagination';
import { Link } from 'react-router-dom';
import { fetchUserProfile } from 're-ducks/user';
import { getAllCompleteRequestAction } from 're-ducks/locker';
import useTypedSelector from 'hooks/useTypedSelector';
import priceSplitter from 'helpers/priceSplitter';
import Table from '../../components/Table';
import { ReactComponent as EmptyIcon } from '../../assets/icons/requestEmptyIcon.svg';
import styles from '../../pages/MyRequest/request.module.scss';

interface mockData {
  id: number;
  title: string;
  date: string;
  email: string;
  phone: string;
  amount: number;
}

export const mockClientItems = (itemsNumber = 10) => {
  const mockItems: mockData[] = [];
  for (let i:number = 1; i < itemsNumber + 1; i += 1) {
    const item: mockData = { 
      id: i,
      title: `Client ${i}`,
      date: `'12/${i}/2020'`,
      email: `client${i}@email.com  `,
      phone: `08012345678  `,
      amount: 100000
    }

    mockItems.push( item );
  }

  return mockItems;

}; 

console.log(mockClientItems(10), 'mockClientItems');

const EmptyState = ({ isDocumentEmpty = false }: { isDocumentEmpty: boolean }) => {
  const user = useSelector((state: any) => state?.auth?.signIn);

  return (
    <div className={styles.empty__state__icon}>
      <EmptyIcon />
      {isDocumentEmpty ? (
        <p>No documents available.</p>
      ) : (
        <div>
          <p>Hi {user?.first_name},</p>
          <p>Thanks for signing up, {user?.first_name}! You have no documents yet.</p>
        </div>
      )}
    </div>
  );
};

const MyLockerTable = () => {
  const [loading, setLoading] = useState(true);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [complectedRequest, setCompletedRequest] = useState([]);
  const [useMockData, setUseMockData] = useState<any>([]);
  const dispatch = useDispatch();
  const { locker }: any = useTypedSelector((state) => state);
  
  const fetchAllCompleteRequest = useCallback(
    (nextPage: any = 1, itemsPerPage: any = 10) => {
      setLoading(true);
      setDataPerPage(itemsPerPage);
      const params = {
        page: nextPage === 0 ? 1 : nextPage,
        per_page: itemsPerPage
      };
      dispatch(
        getAllCompleteRequestAction(
          { params },
          (res: any) => {
            setLoading(false);
            console.log(res, 'file')
            setCompletedRequest(res);
          },
          () => {
            setLoading(false);
          }
        )
      );
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllCompleteRequest();
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {

    dispatch(
      fetchUserProfile(
        {},
        () => {},
        () => {}
      )
    );
  }, [dispatch]);

  useEffect(() => {
    setUseMockData(mockClientItems(10));
  }, []);
      
    
  return (
    <div className="mt-1">
      <Table
        type="primary"
        tableData={useMockData}
        headers={lockerHeaders}
        loading={loading}
        placeHolderImg={!loading && <EmptyState isDocumentEmpty={!!locker} />}
      >
        {(row: { [k: string]: any }) => (
          <>
              <td className="table__row-text center">
                <Link to={`/locker/${row?.id}`} className="text--600 text--blue">
                  {row.title}
                </Link>
                <br />
                {/* <span style={{ color: '#7B7171' }}>
                  {row.participants?.slice(0, 2)?.map((item: any) => {
                    const isSigner = item?.is_signer ? 'Signer' : 'Witness';
                    
                    return `${item.name} (${item?.is_request_owner && item?.is_signer ? 'Owner' : isSigner}), `;
                  })}
                </span> */}
              </td>
              <td className="table__row-text center">{row?.phone}</td>
              <td className="table__row-text center">{row?.email}</td>
              <td className="table__row-text center">{`₦ ${priceSplitter(Math.floor(row?.amount))}`}</td>
          </>
        )}
      </Table>
      <div className="pt-2">
        {!loading && !!locker?.lockers?.requests?.length && (
          <Pagination
            currentPage={locker?.lockers?.pagePayload?.page}
            total={locker?.lockers?.pagePayload?.total}
            perPage={dataPerPage}
            fetchPage={(nextPage, itemsPerPage) => fetchAllCompleteRequest(nextPage, itemsPerPage)}
          />
        )}{' '}
      </div>
    </div>
  );
};

export default MyLockerTable;

