/* eslint-disable */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useCallback, memo, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDrop, DropTargetMonitor, XYCoord } from 'react-dnd';
import DragElement from 'components/DragElement';
import Avatar from 'components/Avatar';
import SignPlaceholder from 'components/SignPlaceholder';
import useTypedSelector from 'hooks/useTypedSelector';
import Button from 'components/Button';
import Toolbar from 'components/Toolbar';
import Select from 'components/Select';
import { DragItem, Doc, SignerFields } from 'types/document';
import User from 'types/user';
import { sealAndStampEligibility } from 're-ducks/documents/documents.actions';
import { ref, set, onValue } from 'firebase/database';
import db from 'hooks/useFirebase';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { ReactComponent as Initial } from 'assets/icons/initial.svg';
import { ReactComponent as Letter } from 'assets/icons/letter.svg';
import { ReactComponent as Pen } from 'assets/icons/pen.svg';
import { ReactComponent as Date } from 'assets/icons/date.svg';
import { ReactComponent as Stamp } from 'assets/icons/stamps.svg';
import { ReactComponent as Seal } from 'assets/icons/seals.svg';
import { ReactComponent as Question } from 'assets/icons/question.svg';
import { ReactComponent as Edit } from 'assets/icons/edit-text.svg';
import styles from 'components/Document/index.module.scss';
import DocumentViewer from 'components/Document';
import toast from 'react-hot-toast';
import AddSignature from './AddSignatureForm';

export const ItemTypes = {
  TEXT: 'text',
  INITIALS: 'initials',
  SIGNATURE: 'signature'
};

export type Signature = {
  field_id: string;
  type: string;
  uploadedText?: string;
};

const signerColors = ['blue', 'orange', 'green', 'lightblue'];

export interface Props {
  doc: Doc;
  onDrop: (item: any) => void;
  signatureFields?: any;
  refetchDoc?: () => void;
  setCanSignComplete: (data: boolean) => void;
}

type Signer = {
  id: string;
  email: string;
  name: string;
  signature?: string;
  field_id?: string;
  status?: string;
  signer_email?: string;
  signer_id?: string;
  signed_at?: any;
  type?: string;
  content?: string;
  top?: string | number;
  left?: string | number;
};

interface SignerPayload {
  [key: string]: string | null;
}

const EditDocument: FC<Props> = memo(({ onDrop, doc, setCanSignComplete }: Props) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const user: User = useTypedSelector((state) => state?.auth?.signIn);
  const [signatureFields, setSignatureFields] = useState<Signer[]>([]);
  const [signActive, setSignActive] = useState(false);
  const [signerFields, setSignerFields] = useState<SignerFields>({});
  const [allSigners, setAllSigners] = useState<Signer[]>([]);
  const [canUploadSealAndStamp, setCanUploadSealAndStamp] = useState(false);

  const [activeSigner, setActiveSigner] = useState<{ name: string; id: string }>({ name: '', id: '' });
  const [activeSignerIndex, setActiveSignerIndex] = useState(0);
  const [selectedSignType, setSelectedSignType] = useState('');
  const [selectedToolIndex, setSelectedToolIndex] = useState<any>(null);
  const [canSign, setCanSign] = useState(false);

  const notaryId = doc && doc.notary_id && doc.notary_id[0];
  const notaryEmail = doc && doc?.notary_email;
  const checkEmail = user.email || notaryEmail;

  useEffect(() => {
    setSignerFields(signerFields);
  }, [signerFields, setSignerFields]);

  const getSealAndStampEligibility = (signer: any) => {
    dispatch(
      sealAndStampEligibility(
        signer.id,
        (res) => {
          setCanUploadSealAndStamp(res);
        },
        () => {}
      )
    );
  };

  useEffect(
    () => {
      if (doc?.signers) {
        setActiveSigner({ name: doc?.signers[0]?.name, id: doc?.signers[0]?.email });
        getSealAndStampEligibility({ name: doc?.signers[0]?.name, id: doc?.signers[0]?.email });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const sessionRef = ref(db, `notary-sessions/${id}`);
    // Listening to live db on firebase
    onValue(sessionRef, (snapshot: any) => {
      const data = snapshot.val();
      const currentUserSigners = data && data?.signatureFields;
      setCanSign(data && data?.canSign);
      setSignActive(data && data?.signActive);
      const newSignerFields =
        data &&
        data?.signers &&
        Object.assign(
          {},
          ...data?.signers.map((item: any) => ({
            [item.field_id]: {
              ...item,
              color: item?.signer_email === checkEmail ? 'blue' : '',
              top: Number(item.top),
              left: Number(item.left)
            }
          }))
        );
      const payload: any = [];
      const signatureStatus: any = [];

      if (data?.signers) {
        setSignerFields(newSignerFields);
        setAllSigners(data?.signers);
      } else {
        setSignerFields({});
        setAllSigners([]);
      }
      if (data?.signatureFields) {
        currentUserSigners &&
          Object.keys(currentUserSigners).forEach((key) => {
            currentUserSigners[key].fields.map((item: any) => {
              payload.push(item);
              signatureStatus.push(item.status);
            });
          });
        setSignatureFields(payload);
        if (!signatureStatus.includes('pending')) {
          setCanSignComplete(true);
        }
      } else {
        setSignatureFields([]);
      }
    });
  }, []);

  useEffect(() => {
    if (doc.signers) {
      const idx = doc.signers.findIndex((signer) => {
        if (activeSigner) {
          return signer.email === activeSigner.id;
        }

        return false;
      });

      setActiveSignerIndex(idx);
    }
  }, [activeSigner, doc.signers]);

  useEffect(() => {
    const docView = document.getElementById('document-view');

    if (docView) {
      const { top, left } = docView?.getBoundingClientRect();

      const handleClick = (e: any) => {
        if (doc.signers) {
          setSignerFields({
            ...signerFields,
            [`${doc.signers[activeSignerIndex].email}-${selectedSignType}-${uuidv4()}`]: {
              top: e.clientY - top,
              left: e.clientX - left,
              color: signerColors[activeSignerIndex],
              type: selectedSignType,
              signer_id: doc.signers[activeSignerIndex].id || notaryId || 'notary-signer'
            }
          });

          docView?.removeEventListener('click', handleClick);
          setSelectedToolIndex(null);
          document.body.style.cursor = 'default';
        }
      };

      if (selectedSignType) {
        docView?.addEventListener('click', handleClick);
        setSelectedSignType('');
      } else {
        docView?.removeEventListener('click', handleClick);
      }
    }
  }, [selectedSignType, doc.signers, activeSignerIndex, signerFields]);

  // Drag functionality before signing
  const moveSignerField = useCallback(
    (idx: string, left: number, top: number) => {
      const elem = { ...signerFields };

      elem[idx].top = top;
      elem[idx].left = left;

      setSignerFields(elem);
    },
    [signerFields, setSignerFields]
  );

  // Drag functionality after signing
  const moveSignedField = (idx: string, left: number, top: number) => {
    const newSignatureFields = signatureFields
      .filter((item) => item?.signer_email === user.email)
      .filter((item) => {
        if (item.field_id === idx) {
          item.top = top;
          item.left = left;
        }

        return signatureFields;
      });

    const newSignerFields = allSigners.filter((item) => {
      if (item.field_id === idx) {
        item.top = top.toString();
        item.left = left.toString();
      }

      return allSigners;
    });

    const sessionSignerFields = ref(db, `notary-sessions/${id}/signers`);
    set(sessionSignerFields, newSignerFields);

    const sessionSignatureRef = ref(db, `notary-sessions/${id}/signatureFields/${newSignatureFields[0].id}`);

    set(sessionSignatureRef, {
      fields: newSignatureFields
    });
  };

  // Drop implementation
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TEXT,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(signerFields[item.id].left + delta.x);
        const top = Math.round(signerFields[item.id].top + delta.y);

        if (canSign) {
          if (item.signed) {
            moveSignedField(item.id, left, top);
          }
        } else {
          moveSignerField(item.id, left, top);
        }

        return undefined;
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType() as string
      })
    }),
    [onDrop, signerFields]
  );

  const [activeSignerField, setActiveSignerField] = useState<Signature>({} as Signature);

  const addSignerField = (type: string, index?: number) => {
    if (activeSignerIndex >= 0) {
      setSelectedSignType(type);
      setSelectedToolIndex(index);
      document.body.style.cursor = 'pointer';
    }
  };

  const updateActiveSigner = (signer: any) => {
    setActiveSigner(signer);
    getSealAndStampEligibility(signer);
  };

  const checkForNotarySeal = Object?.values(signerFields)?.filter((i) => i?.type === "seal" && i?.signer_id?.includes("notary"));

  const checkForSeal = () => {
    if(checkForNotarySeal?.length === 0){
      toast.error("Please add a notary seal to proceed")
    }else {
      addSignatureToFirebase()
    }
  }

  const addSignatureToFirebase = async () => {
    if (verifySenderFields()) {
      const sessionRef = ref(db, `notary-sessions/${id}`);

      const payload: Array<SignerPayload> = [];

      Object.keys(signerFields).forEach((key) => {
        payload.push({
          signer_email: key.split('-')[0],
          signer_id: String(signerFields[key].signer_id),
          type: signerFields[key].type,
          left: String(signerFields[key].left),
          top: String(signerFields[key].top),
          field_id: `${key.split('-')[0]}-${selectedSignType}-${uuidv4()}`
        });
      });

      setCanSign(true);
      setSignActive(true);

      const fields = (payload as any).map((item) => ({
        top: Number(item.top),
        left: Number(item.left),
        color: 'blue',
        type: item.type,
        status: 'pending',
        field_id: item.field_id,
        signer_id: item.signer_id,
        id: item.signer_id,
        signer_email: item.signer_email,
        signature: null,
        signed_at: null
      }));

      let signerIdList: any = [];
      Object.keys(signerFields).forEach((item) => {
        signerIdList.push(signerFields[item].signer_id);
      });

      signerIdList = signerIdList.filter((x, i, a) => a.indexOf(x) === i);

      set(sessionRef, {
        signers: payload,
        status: 'pending',
        canSign: true,
        signActive: true
      });

      signerIdList.forEach((element) => {
        const notaryFields = fields && fields.filter((field) => field?.signer_id === element);
        const signatureFieldsObj = { fields: notaryFields };
        const signatureFieldsId = notaryFields[0].signer_id;
        const sessionSignatureRef = ref(db, `notary-sessions/${id}/signatureFields/${signatureFieldsId}`);
        set(sessionSignatureRef, signatureFieldsObj);
      });

      const newSignerFields = fields && Object.assign({}, ...fields.map((item) => ({ [item.field_id]: item })));
      setSignerFields(newSignerFields);
      setSignatureFields(fields);
      // TODO: check for errors in adding to firebase with a .catch()
    } else {
      toast.error('Please add all signer fields');
    }
  };

  const verifySenderFields = (): boolean => {
    if (doc.signers && doc.signers.length) {
      if (Object.keys(signerFields).length < doc.signers.length) {
        return false;
      }

      // check if all document signers have at least one signer field
      const signerFieldsComplete = doc.signers.every((signer) => {
        if (Object.keys(signerFields).some((key) => key.includes(signer.email))) {
          return true;
        }

        return false;
      });

      if (!signerFieldsComplete) {
        return false;
      }

      return true;
    }

    return false;
  };

  const signerArea = (type: string) => {
    const prompter = canSign && 'Add ';
    switch (type) {
      case 'text_area':
        return (
          <>
            {prompter}
            Text Area
            <Letter style={{ marginLeft: '5px' }} />
          </>
        );
      case 'text':
        return (
          <>
            {prompter}
            Text Signature
            <Letter style={{ marginLeft: '5px' }} />
          </>
        );
      case 'signature':
        return (
          <>
            {prompter}
            Draw Signature
            <Pen style={{ marginLeft: '5px' }} />
          </>
        );
      case 'initials':
        return (
          <>
            {prompter}
            Initials
            <Initial style={{ marginLeft: '5px' }} />
          </>
        );
      case 'seal':
        return (
          <>
            {prompter}
            Seal
            <Seal style={{ marginLeft: '5px' }} />
          </>
        );
      case 'stamp':
        return (
          <>
            {prompter}
            Stamp
            <Stamp style={{ marginLeft: '5px' }} />
          </>
        );
      case 'date':
        return (
          <>
            {prompter}
            Date
            <Date style={{ marginLeft: '5px' }} />
          </>
        );
      default:
        return (
          <>
            {prompter}
            Add Text Area
            <Letter style={{ marginLeft: '5px' }} />
          </>
        );
    }
  };

  const updateToFirebase = (payload: { field_id: string; signature: string; content?: string }) => {
    const newSignatureFields = signatureFields
      .filter((item) => item?.signer_email === checkEmail)
      .filter((item) => {
        if (item.field_id === payload.field_id) {
          item.signature = payload.signature;
          item.status = 'signed';
          item.signed_at = moment().toISOString();
          item.content = payload?.content || '';
        }

        return signatureFields;
      });

    const sessionSignatureRef = ref(db, `notary-sessions/${id}/signatureFields/${newSignatureFields[0].id}`);

    set(sessionSignatureRef, {
      fields: newSignatureFields
    });
  };

  return (
    <div>
      <div id="document-view" className={styles.document__view} ref={drop}>
        {Object.keys(signerFields).map((key) => {
          const { left, top, color, type, field_id } = signerFields[key];
          const signedField = signatureFields && signatureFields.find((field: any) => field?.field_id === field_id);
          const disableTool = key.split('-')[0] !== checkEmail;
          const signedStatus = key === field_id && key.split('-')[0] === user.email;

          let height;
          switch (type) {
            case 'text_area':
              height = 12;
              break;

            case 'stamp':
              height = 85;
              break;

            case 'seal':
              height = 120;
              break;

            case 'profile_picture':
              height = 140;
              break;

            case 'text':
              height = 30;
              break;

            case 'date':
              height = 30;
              break;

            default:
              height = 30;
              break;
          }

          const textAreaEditable = signedField?.type === 'text_area' && field_id && key.split('-')[0] === checkEmail;
          const uploadedText = signedField?.content;
          const isProfilePic = signedField?.type === 'profile_picture';

          return (
            <div key={key}>
              <DragElement isSign={canSign} signed={signedStatus} isDisabled={disableTool} key={key} id={key} left={left} top={top}>
                {signedField?.signature ? (
                  <div style={{ position: 'relative' }}>
                    {signedField?.type === 'text_area' ? (
                      <div style={{ maxWidth: '600px', paddingTop: '13px' }}>
                        <span style={{ zIndex: 100, fontSize: `${height}px` }}>{signedField?.content}</span>
                        {textAreaEditable && (
                          <button
                            onClick={() => {
                              if (field_id && key.split('-')[0] === checkEmail) {
                                setActiveSignerField({ type, field_id, uploadedText });
                              }
                            }}
                          >
                            <Edit />
                          </button>
                        )}
                      </div>
                    ) : isProfilePic ? (
                      <img
                        src={`${signedField?.signature}?${Math.random()}`}
                        alt=""
                        style={{
                          zIndex: 100,
                          height: `${height}px`,
                          width: '120px',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <img
                        src={`${signedField?.signature}?${Math.random()}`}
                        alt=""
                        style={{
                          zIndex: 100,
                          height: `${height}px`
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <SignPlaceholder
                    showCancel={!canSign}
                    onClick={() => {
                      if (field_id && key.split('-')[0] === checkEmail) {
                        setActiveSignerField({ type, field_id });
                      }
                    }}
                    onCancel={() => {
                      const tempFields = { ...signerFields };
                      delete tempFields[key];
                      setSignerFields(tempFields);
                    }}
                    theme={canSign && disableTool ? '' : color}
                  >
                    {signerArea(type)}
                  </SignPlaceholder>
                )}
              </DragElement>
            </div>
          );
        })}

        <DocumentViewer type="request" doc={doc} />
      </div>

      {!signActive && (
        <Toolbar
          docOwner={`${user.first_name} ${user.last_name}`}
          pageCount={1}
          isSent={doc.status ? ['sent', 'signed'].includes(doc.status) : false}
          auditTrail={[]}
        >
          {doc.signers && (
            <section className="mb-1">
              <Select
                placeholder="Signers"
                selected={activeSigner}
                handleChange={(signer) => updateActiveSigner(signer)}
                options={doc.signers && doc.signers.map((signer) => ({ name: signer.name, id: signer.email }))}
              />

              <div className="pt-1">
                <small className="text--sm">Add to the Document</small>
                <div className="mb-1">
                  <SignPlaceholder
                    toolbar
                    onClick={() => addSignerField('text_area', 0)}
                    theme={selectedToolIndex === 0 ? '' : signerColors[activeSignerIndex]}
                  >
                    Text Area
                    <Letter style={{ marginLeft: '5px' }} />
                  </SignPlaceholder>
                  <SignPlaceholder
                    toolbar
                    onClick={() => addSignerField('text', 1)}
                    theme={selectedToolIndex === 1 ? '' : signerColors[activeSignerIndex]}
                  >
                    Text Signature
                    <Letter style={{ marginLeft: '5px' }} />
                  </SignPlaceholder>
                  <SignPlaceholder
                    toolbar
                    onClick={() => addSignerField('signature', 2)}
                    theme={selectedToolIndex === 2 ? '' : signerColors[activeSignerIndex]}
                  >
                    Draw Signature
                    <Pen style={{ marginLeft: '5px' }} />
                  </SignPlaceholder>
                  <SignPlaceholder
                    toolbar
                    onClick={() => addSignerField('initials', 3)}
                    theme={selectedToolIndex === 3 ? '' : signerColors[activeSignerIndex]}
                  >
                    Initials
                    <Initial style={{ marginLeft: '5px' }} />
                  </SignPlaceholder>
                  <SignPlaceholder
                    toolbar
                    onClick={() => addSignerField('date', 4)}
                    theme={selectedToolIndex === 4 ? '' : signerColors[activeSignerIndex]}
                  >
                    Date
                    <Date style={{ marginLeft: '5px' }} />
                  </SignPlaceholder>
                  {canUploadSealAndStamp && (
                    <SignPlaceholder
                      toolbar
                      onClick={() => addSignerField('seal', 5)}
                      theme={selectedToolIndex === 5 ? '' : signerColors[activeSignerIndex]}
                    >
                      Seal
                      <Seal style={{ marginLeft: '5px' }} />
                    </SignPlaceholder>
                  )}
                  {canUploadSealAndStamp && (
                    <SignPlaceholder
                      toolbar
                      onClick={() => addSignerField('stamp', 6)}
                      theme={selectedToolIndex === 6 ? '' : signerColors[activeSignerIndex]}
                    >
                      Stamp
                      <Stamp style={{ marginLeft: '5px' }} />
                    </SignPlaceholder>
                  )}
                </div>
                <Button wide onClick={() => checkForSeal()} loading={false} className="mr-1" size="md">
                  Proceed
                </Button>
              </div>
            </section>
          )}

          {doc.signers && (
            <>
              <div className="pt-2">
                <div className="flex flex__item-center">
                  Witnesses
                  <Question style={{ marginLeft: '5px' }} />
                </div>
                <div className="flex">
                  {doc.signers.map((signer) => (
                    <Avatar className={styles.clusters} key={signer.id} name={signer.name} />
                  ))}
                </div>
              </div>
            </>
          )}
        </Toolbar>
      )}

      {canSign && !!activeSignerField.type && (
        <AddSignature
          field={activeSignerField}
          resetField={() => setActiveSignerField({} as Signature)}
          updateToFirebase={updateToFirebase}
        />
      )}
    </div>
  );
});

EditDocument.defaultProps = {
  refetchDoc: () => {},
  signatureFields: []
};

export default EditDocument;

