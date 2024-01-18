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
  prevStep,
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
  const fonts = ['Great Vibes', 'Arizonia'];
  const [fullName , setFullName] = useState<any>({
    firstName: '',
    lastName: ''
  });
  const getFullName = () => `${user?.first_name} ${user?.last_name}`;

  useEffect(() => {
    setFullName({
      firstName: user?.first_name,
      lastName: user?.last_name,
      initials: user?.initials
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
      nextTab: {
        label: 'Draw'
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
    }  else if (showAgreement && (!imageURL || !acceptPolicy)){
      setIsDisabled(true);
    }
    else {
      setIsDisabled(false);
    }
  }, [text, isSaving, showImage, acceptPolicy, showAgreement, imageURL]);

  const onChange = ( e: any, fontType: any, index): void => {
    setFontFamily(fontType);
    setFontIndex(index);
    updateText(e.currentTarget.textContent)
    
  };


  return (
    <div>
     
        <div className="grid grid__layout gap-1 pt-1">
          <div className="col-4">
            <Input onChange={(e) => setFullName({...fullName, firstName: e.target.value })} label="First Name*" placeholder="Emily R. Waren"  type="text" value={fullName.firstName} />
          </div>
          <div className="col-4">
            <Input onChange={(e) => setFullName({...fullName, lastName: e.target.value })} label="Last Name*" placeholder="Emily R. Waren"  type="text" value={fullName.lastName} />
          </div>
          {/* <div className="col-3">
            <Input label="Initials*"  placeholder="EW" type="text" value={getInitials(getFullName())} />
          </div> */}
        </div>
     
      <div className="signature__body-wrapper">
        <div tabIndex={-1} className="signature__body mb-2 mt-1" onFocus={() => handleSigBoxFocused()} onBlur={() => handleSigBoxBlurred()}>
            {fonts.map((font, index) => ( <div 
            key={font+1}
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
              }} type="radio" onChange={()=>{}} checked={index  === fontIndex} value={`${fullName.firstName  } ${  fullName.lastName}`} className={styles.radio_input} name={font}  ref={(element) =>{ refs.current[index] = element}}  />
              <label className='  w-full pr-2' htmlFor={`${fullName.firstName  } ${  fullName.lastName}`} >
                {`${fullName.firstName  } ${  fullName.lastName}`} 
               
               </label>
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
           {`${fullName.firstName  } ${  fullName.lastName}`}
            {/* <span >{`${fullName.initials}`} </span> */}
    </div>
        }
        <div />
          {/* <img src={fileURL} alt="signature file"  /> */}
      </div>
    </div>
       <SignaturePolicy policy='By selecting this signature, I agree that it is as valid as my hand-written signature to the extent allowed by law' acceptPolicy={acceptPolicy} setAcceptPolicy={setAcceptPolicy} />

      <div className="bb-1 mb-2" />
      <Button onClick={prevStep} type="button" theme="grey" variant="outline" style={{borderRadius: '50%'}} className='mr-2'>
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                      fill="#A1A0A0" />
                  </svg>
        </Button>
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
