import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Document from 'components/Document';
import { getRequestDetails, getRequestDocument } from 're-ducks/request';
import Dashboard from '../../dashboard/SidebarLayout/index';
import toast from 'react-hot-toast';
import { fetchUserProfile } from 're-ducks/user';

const RequestDocument = () => {
  const dispatch = useDispatch();
  const [, setLoading] = useState(true);
  const [request, setRequest] = useState<any>({});
  const [document, setDocument] = useState<any>({});
  const { id } = useParams<{ id?: string }>();

  const fetchRequestDetails = useCallback(() => {
    dispatch(
      getRequestDetails(
        { id },
        (requestData: any) => {
          setRequest(requestData);
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

  useEffect(
    () => {
      dispatch(
        getRequestDocument(
          {
            id
          },
          (doc) => {
            setDocument(doc);
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        )
      );
    },
    // eslint-disable-next-line
    []
  );

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


  console.log(request, 'get document')

  return (
    <Dashboard>
      <Document type="request" doc={document} />
    </Dashboard>
  );
};

export default RequestDocument;

