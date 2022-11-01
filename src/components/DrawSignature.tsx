import React, { useRef, useState, FC, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { TabsProps } from 'types/tabs.interface';
import urlToImageObj from 'utils/urlToImageObj';
import SignaturePolicy from 'container/document/SignaturePolicy';
import toast from 'react-hot-toast';
import { fetchUserSignature } from 're-ducks/user';
import { useDispatch } from 'react-redux';
import Button from './Button';
import SignatureEditor from './Toolbar/SignatureEditor';

const DrawSignature: FC<TabsProps> = ({ isSaving, onSave, fetching, fileURL, hideButton, showAgreement }) => {
  const sigCanvasRef = useRef<any>({});
  const dispatch = useDispatch();

  const sigBoxRef = useRef<any>({});
  const [showImage, setShowImage] = useState<boolean>(true);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [drawColor, setDrawColor] = useState<string>('#363740');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>('');
  const [signatureFile, setSignatureFile] = useState<string>('');
  const [fetchingFiles, setFetchingFiles] = useState<boolean>(true);

  const saveCanvas = async () => {
    if (showImage) {
      if (onSave) {
        onSave({
          
          fileType: 'signature',
          sigType: 'draw',
          done: () => setShowImage(true)
        });
      }
    }
    const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');

    if (onSave) {
      onSave({
        file: signature,
        type: 'Signature',
        category: 'Draw',

        // fileType: 'signature',
        // sigType: 'draw',
        // file,
        done: () => {
          // setShowImage(true)
          sigCanvasRef.current.clear()
          setIsDisabled(true)
          setImageURL('')
          dispatch(
            fetchUserSignature(
              
              (data) => {
                setFetchingFiles(false);
                // setCurrentSign(data);
              },
              (error) => {
                setFetchingFiles(false);

                return error;
              }
            )
          );
          toast.success('Signature created successfully.');

        }
      });
    }
  };

  useEffect(() => {
    if (fileURL) {
      setSignatureFile(fileURL?.Signature?.find(
        (signature) => signature?.category === "Draw"
      )?.file || '');
    }
  }, [fileURL]);


  const handleSigBoxFocused = () => {
    setShowImage(false);
  };

  const handleSigBoxBlurred = () => {
    if (sigCanvasRef?.current?.isEmpty()) {
      setShowImage(true);

    }
    
  };

  const onEnd = () => {
    setIsDisabled(true);
    setImageURL(sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png'));
  }
  const clearCanvas = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      setShowImage(false);
      setImageURL('');
      sigBoxRef.current.focus();

      return;
    }
    setShowImage(true);
    setIsDisabled(true);
  };

  useEffect(() => {
    if (!showAgreement && isSaving) {
      setIsDisabled(true);
    } else if (showAgreement && (isSaving || !acceptPolicy)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [isSaving, showImage, acceptPolicy, showAgreement]);

  return (
    <div>
<div className="signature__body-wrapper flex ">
      <div className={fetching ? 'signature__body--disabled mt-2' : ''} />
      {/* <SignatureEditor clear={clearCanvas} setCurrentColor={setDrawColor} hideButton={hideButton} />  */}
      <div
        tabIndex={-1}
        className="signature__body mb-2 mt-2"
        style={{ width: '100%', height: '100%' }}
        ref={sigBoxRef}
        onFocus={() => handleSigBoxFocused()}
        onBlur={() => handleSigBoxBlurred()}
      >
        <SignatureEditor clear={clearCanvas} setCurrentColor={setDrawColor} hideButton={hideButton} />
       
          <SignatureCanvas
            canvasProps={{
              width: 500, height: 200
              // className: 'signature__canvas'
            }}
            penColor={drawColor}
            ref={sigCanvasRef}
            onEnd={onEnd}
          />

      </div>
      <div >
      <div className='col-6 p-3 '>
          {/* <img src="" alt="signature file"  /> */}
          <img src={imageURL === '' ? signatureFile : imageURL} alt="signature" />
      </div>
    </div>
      
    </div>
   
    {showAgreement && <SignaturePolicy acceptPolicy={acceptPolicy} setAcceptPolicy={setAcceptPolicy} />}

      <div className="bb-1 mb-2" />
      <Button disabled={isDisabled} className="mb-1" theme="primary" width={161} loading={isSaving} onClick={() => saveCanvas()}>
        Save
      </Button>
    </div>
    
  );
};

export default DrawSignature;

