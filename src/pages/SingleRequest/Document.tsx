import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Document from 'components/Document';
import { getRequestDetails, getRequestDocument } from 're-ducks/request';
import toast from 'react-hot-toast';
import { fetchUserProfile } from 're-ducks/user';
import { getLockerDetails } from 're-ducks/locker/locker.actions';
import DocumentLoader from 'components/DocumentLoader';
import history from 'utils/history';
import Dashboard from '../../dashboard/SidebarLayout/index';

const RequestDocument = () => {
  const dispatch = useDispatch();
  const [, setLoading] = useState(true);
  const [request, setRequest] = useState<any>([]);
  const [document, setDocument] = useState<any>({});
  const { id } = useParams<{ id?: string }>();

  const fetchRequestDetails = useCallback(() => {
    dispatch(
      getLockerDetails(
        { id },
        (requestData: any) => {
          setRequest(requestData?.documentUploads);
          setLoading(false);
          setDocument(requestData);
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
        () => {},
        () => {}
      )
    );
  }, [dispatch]);

  // console.log(document, 'request');

  const goBack = () => {
    history.goBack();
  };

  return (
    <Dashboard>
      <button onClick={goBack} className="flex flex__item-center mt-2">
        <svg className="mr-1" width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 16.5v-3h16v-2H6v-3l-4 4 4 4Z" fill="#363740" />
        </svg>
        Go Back
      </button>
      {request?.length === 0 ? (
        <DocumentLoader />
      ) : document.status === 'Completed' ? (
        <>
          {' '}
          {request
            ?.filter((data) => data?.status === 'Completed')
            ?.map((doc) => (
              <div key={doc?.id}>
                <Document type="request" doc={doc} />
              </div>
            ))}
        </>
      ) : (
        <>
          {' '}
          {request?.map((doc) => (
            <div key={doc?.id}>
              <Document type="request" doc={doc} />
            </div>
          ))}
        </>
      )}

      {/* <Document type="request" doc={document} /> */}
    </Dashboard>
  );
};

export default RequestDocument;
