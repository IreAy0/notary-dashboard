/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TabsProps } from 'types/tabs.interface';
import {  textToSignImage } from 'utils/textToImage';
// import urlToImageObj from 'utils/urlToImageObj';
import SignaturePolicy from 'container/document/SignaturePolicy';
import toast from 'react-hot-toast';
import Button from './Button';
import { Input } from './TextInput/TextInput';
// import { RadioInput } from './RadioInput/RadioInput'; textToImage,
// import SignatureEditor from './Toolbar/SignatureEditor';
import styles from './RadioInput/RadioInput.module.scss';


const TypeSignature: FC<TabsProps> = ({
  fileURL,
  onSave,
  isSaving,
  showAgreement,
  user,
  // fetching,
  // signatureType,
  // hideButton,
  uploadedText
}: TabsProps) => {
  const [text, setText] = useState<string>(uploadedText || '');
  const [acceptPolicy, setAcceptPolicy] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(true);
  const textColor = '#363740';
  const [fontFamily, setFontFamily] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>('');
  const [fontIndex, setFontIndex] = useState<Number>();
  const textBoxRef = useRef<any>();
  const refs = useRef<any>([])
  // const { pathname } = useLocation();
  const fonts = ['Great Vibes', 'Montserrat'];
  const [fullName , setFullName] = useState<any>({
    firstName: '',
    lastName: ''
  });
  const getFullName = () => `${user?.first_name} ${user?.last_name}`;

  useEffect(() => {
    setFullName({
      firstName: user?.first_name,
      lastName: user?.last_name
    })
  }, [user])

  const getInitials = (names: string) =>
    names
      .split(' ')
      .map((name) => name[0]?.toUpperCase() || '')
      .join('');

  useEffect(() => {
    if (fileURL) {
      setImageURL(fileURL?.Signature?.find(
        (signature) => signature?.category === "Type"
      )?.file || '');
    }
  }, [fileURL]);

  const updateText = (e: any) => {
    setText(e);
  };

  const convertTextToImage = async () => {
    const imageUrl = textToSignImage(text, `55px ${fontFamily}`, textColor);    
    setImageURL(imageUrl);
    // textToSignImage(text)  
    onSave({
      file: imageUrl,
      type: 'Signature',
      category: 'Type',

      done: () => {
        setShowImage(true);
        setText('');
        setFontFamily('');
       
        updateText('')
        toast.success('Signature created successfully.');
      },
      content: text
    });
  };



  const handleSigBoxFocused = () => {
    setShowImage(false);
    if (textBoxRef.current) {
      textBoxRef.current.focus();
    }
  };

  const handleSigBoxBlurred = () => {
    if (!text.length) {
      setShowImage(true);
    }
  };

 

  // const clearTextBox = () => {
  //   setText('');
  //   textBoxRef.current.focus();
  // };


  useEffect(() => {
    if (!showAgreement && (!text || isSaving || showImage)) {
      setIsDisabled(true);
    } else if (showAgreement && (isSaving || !acceptPolicy)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [text, isSaving, showImage, acceptPolicy, showAgreement]);

  const onChange = ( e: any, fontType: any, index): void => {
    setFontFamily(fontType);
    setFontIndex(index);
    updateText(e.currentTarget.textContent)
    
  };


  return (
    <div>
     
        <div className="grid grid__layout gap-1 pt-1">
          <div className="col-4">
            <Input onChange={(e) => setFullName({...fullName, firstName: e.target.value })} label="Last Name*" placeholder="Emily R. Waren"  type="text" value={fullName.firstName} />
          </div>
          <div className="col-4">
            <Input onChange={(e) => setFullName({...fullName, lastName: e.target.value })} label="Last Name*" placeholder="Emily R. Waren"  type="text" value={fullName.lastName} />
          </div>
          <div className="col-3">
            <Input label="Initials*"  placeholder="EW" type="text" value={getInitials(getFullName())} />
          </div>
        </div>
     
      <div className="signature__body-wrapper">
        <div tabIndex={-1} className="signature__body mb-2 mt-1" onFocus={() => handleSigBoxFocused()} onBlur={() => handleSigBoxBlurred()}>
            

            {fonts.map((font, index) => ( <div 
            role="button"
            tabIndex={0}
            onClick={(e) => onChange(e, font, index)}
            // ref={(element) =>{ refs.current[index] = element}}
            style={{
              fontFamily: font,
              fontSize: '40px',
              color: textColor
            }} className={styles.radio_input_container}>

              <input  style={{
                fontFamily: font,
                fontSize: '70px',
                color: textColor
              }} type="radio" checked={index  === fontIndex} value={`${fullName.firstName  } ${  fullName.lastName}`} className={styles.radio_input} name={font}  ref={(element) =>{ refs.current[index] = element}}  />
              <label htmlFor={`${fullName.firstName  } ${  fullName.lastName}`} >{`${fullName.firstName  } ${  fullName.lastName}`}</label>
    </div>))}
        </div>
      </div>
      <div >
      {/* <div className={fetching ? 'signature__body--disabled mt-2' : ''} /> */}
      
      <div className='col-6 py-1'>
        {!fontFamily ?  <img src={imageURL} alt="signature"  />
        : 

  <div 
            style={{
              fontFamily,
              fontSize: '40px',
              color: textColor
            }} 
            className={`${ fontFamily ? '' : 'd-none' } `}>
            <span >{`${fullName.firstName  } ${  fullName.lastName}`} </span>
    </div>
        }
        <div />
          {/* <img src={fileURL} alt="signature file"  /> */}
      </div>
    </div>
       <SignaturePolicy acceptPolicy={acceptPolicy} setAcceptPolicy={setAcceptPolicy} />

      <div className="bb-1 mb-2" />
      {/* loading={isSaving} disabled={isDisabled} */}
      <Button className="mb-1" theme="primary" width={161} onClick={convertTextToImage} disabled={isDisabled} loading={isSaving}>
        Save
      </Button>
    </div>
  );
};

TypeSignature.defaultProps = {
  hideButton: false
};

export default TypeSignature;
