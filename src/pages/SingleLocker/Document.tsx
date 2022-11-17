import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Document from 'components/Document';
import { getLockerDetails } from 're-ducks/locker/locker.actions';
import DocumentLoader from 'components/DocumentLoader';
import { getRequestDetails, getRequestDocument } from 're-ducks/request';
import toast from 'react-hot-toast';
import { fetchUserProfile } from 're-ducks/user';
import history from 'utils/history';
import Dashboard from '../../dashboard/SidebarLayout/index';

const LockerDocument = () => {
  const dispatch = useDispatch();
  const [, setLoading] = useState(true);
  const [lockerDocument, setLockerDocument] = useState<any>([]);
  const [document, setDocument] = useState<any>({});
  const { id } = useParams<{ id?: string }>();

  const fetchRequestDetails = useCallback(() => {
    dispatch(
      getLockerDetails(
        { id },
        (requestData: any) => {
          setLockerDocument(requestData?.documentUploads);
          setLoading(false);
        },
        (error) => {
          toast.error(error);
          setLoading(false);
        }
      )
    );
  }, [id, dispatch]);

  useEffect(fetchRequestDetails, [fetchRequestDetails]);

  // useEffect(
  //   () => {
  //     dispatch(
  //       getRequestDocument(
  //         {
  //           id
  //         },
  //         (doc) => {
  //           setDocument(doc);
  //           setLoading(false);
  //         },
  //         () => {
  //           setLoading(false);
  //         }
  //       )
  //     );
  //   },
  //   // eslint-disable-next-line
  //   []
  // );

  useEffect(() => {

    dispatch(
      fetchUserProfile(
        
        {},
        () => {
         
        },
        () => {}
      )
    );
  }, [dispatch]);

  const goBack = () => {
    history.goBack();
  };
  // console.log(lockerDocument, 'lockerDocument')

  return (
    <Dashboard>
      <button onClick={goBack} className="flex flex__item-center mt-2">
              <svg className="mr-1" width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 16.5v-3h16v-2H6v-3l-4 4 4 4Z" fill="#363740" />
              </svg>
              Go Back
            </button>
      {lockerDocument?.length === 0 ? <DocumentLoader /> : 
      <> {lockerDocument?.map((doc) =>(
          <div key={doc?.id}>
            <Document type="request" doc={doc} />
          </div>
        
      ))}</>
      }
    
    </Dashboard>
  );
};

export default LockerDocument;

