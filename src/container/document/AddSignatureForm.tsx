import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal/Modal';
import { useLocation, useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { fetchUserSignature, saveUserSignature } from 're-ducks/user';
import { uploadFiles } from 're-ducks/documents';
import User from 'types/user';
import useTypedSelector from 'hooks/useTypedSelector';
import toast from 'react-hot-toast';
import InitialSignature from 'components/InitialSignature';
import TypeSignature from 'components/TypeSignature';
import DrawSignature from 'components/DrawSignature';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import SealWrapper from 'components/DigitizeSealStamp/SealWrapper';
import StampWrapper from 'components/DigitizeSealStamp/StampWrapper';

interface Props {
  field: {
    type: string;
    field_id: string;
    uploadedText?: string;
  };
  resetField: () => void;
  updateToFirebase: (data: any) => void;
}

const tabs = [
  {
    title: 'Text',
    label: 'Text'
  },
  {
    title: 'Draw',
    label: 'Draw'
  }
];

const AddSignature = ({ field, resetField, updateToFirebase }: Props) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const user: User = useTypedSelector((state) => state?.auth?.signIn);
  const [activeTab, setActiveTab] = useState<{ label: string }>(tabs[0]);
  const [loadingSignatures, setLoadingSignatures] = useState(true);
  const [selectedSignature, setSelectedSignature] = useState<any>({});
  const thirdParty = new URLSearchParams(search).get('thirdParty');
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    setActiveTab({ label: field.type });
  }, [field]);

  useEffect(() => {
    if (['seal', 'stamp'].includes(field.type.toLowerCase())) {
      return;
    }

    const sigType = field.type === 'signature' ? 'draw' : field.type.toLowerCase();
    const signQueries = { fileType: 'signature', sigType };
    setLoadingSignatures(true);
    dispatch(
      fetchUserSignature(
        (data) => {
          setLoadingSignatures(false);
          setSelectedSignature(data);
        },
        (error) => {
          setLoadingSignatures(false);

          return error;
        }
      )
    );
  }, [dispatch, activeTab, field.type]);
  
  console.log('selectedSignature', selectedSignature);


  const setSignatureUrl = (payload: { field_id: string; signature: string, content?: string }) => {
    updateToFirebase(payload);
    resetField();
  };

  // TODO: add function signature
  const appendSignature = ({ fileType, sigType, file, done, content }: any) => {
    const docId = id;
    // Check if user already has saved signature
    if (!selectedSignature.file_url && sigType !== 'text_area' && sigType !== 'date' && !thirdParty) {
      // Check if user is uploading signature
      if (fileType) {
        const queries = { fileType, sigType };
        dispatch(
          saveUserSignature(
            queries,
            file,
            (data) => {
              setSignatureUrl({ field_id: field.field_id, signature: data.file_url });
              done();
              toast.success('Saved successfully');
            },
            (error) => {
              toast.error(error);
            }
          )
        );
      }
    } else if (sigType === 'text_area' || sigType === 'date') {
      dispatch(
        uploadFiles(
          { docId, sigType },
          file,
          (data) => {
            if (sigType === 'text_area') {
              setSignatureUrl({ field_id: field.field_id, signature: data, content });
            } else {
              setSignatureUrl({ field_id: field.field_id, signature: data });
            }
            done();
          },
          (error) => {
            toast.error(error || 'Something went wrong, please try again.');
          }
        )
      );
    } else {
      // else if user is using an already created signature
      setSignatureUrl({ field_id: field.field_id, signature: selectedSignature.file_url });
    }
  };

  const hideClearButton = !thirdParty || selectedSignature.file_url;

  let modalName = field?.type;

  switch (field?.type) {
    case 'text_area':
      modalName = 'Text Area';
      break;
    case 'text':
      modalName = 'Text Signature';
      break;
    case 'signature':
      modalName = 'Draw Signature';
      break;

    default:
      modalName = field?.type;
  }

  return (
    <Modal isOpen isClose={() => {}} size="lg" width={500} height={400} minWidth={400}>
      <div className="flex flex__spaced mb-1">
        <Dialog.Title as="div">
          <h3 className="section__heading" style={{ textTransform: 'capitalize' }}>
            {modalName}
          </h3>
        </Dialog.Title>
        <button onClick={resetField}>
          <span className="sr-only">Close Modal</span>
          <Close />
        </button>
      </div>

      <div>
        <div className="pt-2">
          {['text', 'text_area'].includes(activeTab.label.toLowerCase()) && (
            <TypeSignature
              fetching={loadingSignatures}
              fileURL={selectedSignature}
              isSaving={loadingSignatures}
              onSave={appendSignature}
              signatureType={activeTab.label}
              showAgreement={activeTab.label !== 'text_area'}
              uploadedText={field?.uploadedText}
              hideButton={hideClearButton}
            />
          )}
          {['initials', 'date'].includes(activeTab.label.toLowerCase()) && (
            <InitialSignature
              fetching={loadingSignatures}
              fileURL={selectedSignature.file_url}
              isSaving={loadingSignatures}
              onSave={appendSignature}
              user={user}
              signatureType={activeTab.label as string}
              showAgreement={!['date'].includes(activeTab.label.toLowerCase())}
            />
          )}
          {['Draw', 'signature'].includes(activeTab.label) && (
            <DrawSignature
              fetching={loadingSignatures}
              fileURL={selectedSignature.file_url}
              isSaving={loadingSignatures}
              onSave={appendSignature}
              hideButton={hideClearButton}
              showAgreement
            />
          )}
          {['seal'].includes(activeTab.label.toLowerCase()) && (
            <>
              <SealWrapper
                mode={activeTab.label.toLowerCase()}
                setSignature={(signature) => setSignatureUrl({ signature, field_id: field.field_id })}
                actionType="requests"
                requestData={user}
                showAgreement
              />
            </>
          )}
          {['stamp'].includes(activeTab.label.toLowerCase()) && (
            <>
              <StampWrapper
                mode={activeTab.label.toLowerCase()}
                setSignature={(signature) => setSignatureUrl({ signature, field_id: field.field_id })}
                actionType="requests"
                requestData={user}
                showAgreement
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddSignature;

