import SignaturePolicy from 'container/document/SignaturePolicy';
import React, { FC, useState, useRef, useEffect } from 'react';
import { textToImage } from 'utils/textToImage';
import urlToImageObj from 'utils/urlToImageObj';
import { useLocation } from 'react-router-dom';
import Button from '../Button/index';
import { TabsProps } from '../../types/tabs.interface';

const textColor = '#363740';

const InitialSignature: FC<TabsProps> = ({ showAgreement, onSave, fileURL, isSaving }) => {
  const { search } = useLocation();
  const [text, setText] = useState<string>('EW');
  const [showImage, setShowImage] = useState<boolean>(true);
  const textBoxRef = useRef<any>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const thirdParty = new URLSearchParams(search).get('thirdParty');

  const convertTextToImage = async () => {
    const img = textToImage(text, '70px Poppins', textColor);
    const imgObj = await urlToImageObj(img);
    const file = new FormData();
    file.append(thirdParty ? 'avatar' : 'file', imgObj);
    if (onSave) {
      onSave({
        fileType: 'signature',
        sigType: 'initials',
        file,
        done: () => {
          setShowImage(true);
          setText('');
        }
      });
    }
  };

  const handleSigBoxFocused = () => {
    if (textBoxRef.current) {
      textBoxRef.current.focus();
    }
  };

  const handleSigBoxBlurred = () => {
    if (!text.length) {
      setShowImage(true);
    }
  };

  useEffect(() => {
    if (!showAgreement && (!text || text.length < 2)) {
      setIsDisabled(true);
    } else if (showAgreement && (isSaving || !acceptPolicy)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [text, isSaving, showImage, acceptPolicy, showAgreement]);

  return (
    <div className="signature__body-wrapper">
      <div tabIndex={-1} onFocus={() => handleSigBoxFocused()} onBlur={() => handleSigBoxBlurred()} className="signature__body mb-2 mt-2">
        {fileURL && showImage && (
          <div title="Click to edit" className="signature__image flex flex__center">
            <img src={`${fileURL}?${new Date().getTime()}`} alt="text-bg" />
          </div>
        )}
        <input
          ref={textBoxRef}
          readOnly
          value={text}
          className={`signature__text-box def-font signature__text-${textColor === '#363740' ? 'black' : 'blue'}`}
        />
      </div>

      {showAgreement && <SignaturePolicy acceptPolicy={acceptPolicy} setAcceptPolicy={setAcceptPolicy} />}

      <div className="bb-1 mb-2" />
      <Button className="mb-1" theme="primary" width={161} onClick={() => convertTextToImage()} disabled={isDisabled}>
        Save
      </Button>
    </div>
  );
};

export default InitialSignature;

