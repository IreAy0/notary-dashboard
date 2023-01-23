import React, { useRef, useState, FC, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { TabsProps } from 'types/tabs.interface';
// import urlToImageObj from 'utils/urlToImageObj';
import SignaturePolicy from 'container/document/SignaturePolicy';
import toast from 'react-hot-toast';
import { fetchUserSignature } from 're-ducks/user';
import { useDispatch } from 'react-redux';
import Button from './Button';
import SignatureEditor from './Toolbar/SignatureEditor';

const DrawSignature: FC<TabsProps> = ({ isSaving, onSave, fetching, fileURL, hideButton, showAgreement, prevStep }) => {
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
              
              () => {
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

        },
        nextTab: {
          label: 'Initials'
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
    }  else if (showAgreement && (!imageURL || !acceptPolicy)){
      setIsDisabled(true);
    }
    else {
      setIsDisabled(false);
    }
  }, [isSaving, showImage, acceptPolicy, showAgreement, imageURL]);

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
      <Button onClick={prevStep} type="button" theme="grey" variant="outline" style={{borderRadius: '50%'}} className='mr-2'>
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                      fill="#A1A0A0" />
                  </svg>
        </Button>
      <Button disabled={isDisabled} className="mb-1" theme="primary" width={161} loading={isSaving} onClick={() => saveCanvas()}>
        Save
      </Button>
    </div>
    
  );
};

export default DrawSignature;

