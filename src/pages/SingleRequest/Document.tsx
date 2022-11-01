import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Document from 'components/Document';
import { getRequestDocument } from 're-ducks/request';
import Dashboard from '../../layouts/dashboard';

const RequestDocument = () => {
  const dispatch = useDispatch();
  const [, setLoading] = useState(true);
  const [document, setDocument] = useState<any>({});
  const { id } = useParams<{ id?: string }>();

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

  return (
    <Dashboard>
      <Document type="request" doc={document} />
    </Dashboard>
  );
};

export default RequestDocument;

