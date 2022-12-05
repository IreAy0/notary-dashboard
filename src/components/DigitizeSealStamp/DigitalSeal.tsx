/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 're-ducks/rootReducer';
import { editNotaryFiles, fetchStampsAndSeals, fetchUserProfile, uploadNotaryFiles } from 're-ducks/user';
import toast from 'react-hot-toast';
import UploadIcon from 'assets/img/upload.svg';
import useTypedSelector from 'hooks/useTypedSelector';
import formatCommissionNumber from 'utils/formatCommissionNumber';
import { useLocation } from 'react-router-dom';
import SignaturePolicy from 'container/document/SignaturePolicy';
import html2canvas from 'html2canvas';
import styles from './sealstamp.module.scss';
import EditButton from './EditButton';
import Button from '../Button';
import { Input } from '../TextInput/TextInput';
import seal_gray from 'assets/img/seal_gray.png';
import seal_green from 'assets/img/seal_green.png';
import seal_orange from 'assets/img/seal_orange.png';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import VideoIcon from '../../assets/icons/checkmarks.svg';
import CheckMark from 'assets/icons/CheckMark';

// /Users/mac/Documents/tonate-notary/src/assets/icons/checkmarks.svg
// import Button from '@mui/material/Button';

// import SealImage from './SealImage';
interface User {
  team_role_code?: string | null;
  first_name?: string;
  last_name?: string;
  surname?: string;
  email?: string;
  avatar?: string;
  is_verified_profile?: boolean;
  plan?: string;
  notary_commission_number?: number;
  verified_commission_number?: boolean;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const DigitalSeal = ({ setSignature, actionType, requestData, showAgreement,fetching,  Save, isSaving, fileURL, prevStep}: any,) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companySeal, setCompanySeal] = useState({ file_url: '', file_id: '' });
  const user: User = useSelector((state: RootState) => state?.auth?.signIn);
  const [editSeal, setEditSeal] = useState<boolean>(false);
  const [sealSuccess, setSealSuccess] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<any>();
  const [uploadedSeal, setUploadedSeal] = useState<any>('');
  const userProfile: any = useTypedSelector((state: RootState) => state.user);
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const { pathname } = useLocation();
  const [fullName , setFullName] = useState<any>({
    firstName: '',
    lastName: '',
    notary_number: '',
  });
const [base64Url, setBase64Url] = useState<any>('');
const [sealColor, setSealColor] = useState<any>('grey');
  // const canvas = useRef();
  const canvas = useRef<any>()
  const sealImage = useRef<any>()
  let ctx: any = null;


  function onChangeValue(event) {
    setSealColor(event.target.value);
  }


  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)

    
    setPreview(objectUrl);

  }, [selectedFile])


  useEffect(() => {
    updateFullName();

    return () => {
      setFullName({}); 
    };
   
  }, [])


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const updateFullName = () => {
    setFullName({
      firstName: userProfile?.first_name,
      lastName: userProfile?.last_name,
      notary_number: userProfile?.notary_commission_number,
    })
  }

  useEffect(() => {
    dispatch(
      fetchUserProfile(
        {},
        () => { },
        () => { }
      )
    );
  }, [dispatch]);

  useEffect(() => {
    // setUpdatedUser({ ...user, ...userProfile });
    if (actionType === 'requests') {
      setUpdatedUser(requestData);
    } else {
      setUpdatedUser({ ...user, ...userProfile });
    }
  }, [user, userProfile, requestData, actionType]);

  

  const isDefaultDisabled = (sealSuccess && !editSeal) || loading || !preview

  const setStampAndSeal = (file: any, name: string) => {
    const formData = new FormData();
    formData.append('file', file);
    const payload = {
      type: name,
      formData
    };

    setLoading(true);
    dispatch(
      uploadNotaryFiles(
        name,
        payload,
        (response: any) => {
          setLoading(false);
          switch (name) {
            case 'seal':
              setCompanySeal({ file_url: response.file_url, file_id: response.file_id });
              setEditSeal(false)
              break;

            default:
              break;
          }
          toast.success('Upload done successfully');
        },
        (error: any) => {
          setLoading(false);
          toast.error(error);
        }
      )
    );
  };

  const editStampAndSeal = (file: any, name: string) => {
    const formData = new FormData();
    formData.append('file', file);
    const payload = {
      type: name,
      file_id: companySeal.file_id,
      formData
    };
    setLoading(true);
    dispatch(
      editNotaryFiles(
        payload,
        (response: any) => {
          setLoading(false);
          switch (name) {
            case 'seal':
              setCompanySeal({ file_url: response.file_url, file_id: response.file_id });
              setEditSeal(false);
              break;
            default:
              break;
          }
          toast.success('Update done successfully');
        },
        (error: any) => {
          setLoading(false);
          toast.error(error);
        }
      )
    );
  };

  useEffect(() => {
    setLoading(true);
    const fileType = 'seal';
    const payload = {
      type: fileType
    };
    dispatch(
      fetchStampsAndSeals(
        payload,
        (response: any) => {
          setLoading(false);
          switch (fileType) {
            case 'seal':
              setCompanySeal({ file_url: response.file_url, file_id: response.file_id });
              setSealSuccess(true);

              break;

            default:
              break;
          }
        },
        () => setLoading(false)
      )
    );
  }, [dispatch, setCompanySeal, user]);

  const saveHtmlAsImage = () => {
    setLoading(true)
    if (sealImage.current) {
      html2canvas(sealImage.current, { allowTaint: true }).then((canvas) => {
       
        const url = canvas.toDataURL('image/png');
        setLoading(false)
        setUploadedSeal(url)
       

      });
    }
    
  };



  useEffect(() => {
    if (!showAgreement) {
      setIsDisabled(true);
    } else if (showAgreement && !acceptPolicy) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [acceptPolicy, showAgreement]);

 

  const onSave = () => {
      Save({
        file: uploadedSeal,
        type: 'NotaryDigitalSeal',
        category: 'Upload',
        done: () => {
          setUploadedSeal('')
          setIsDisabled(true)
          toast.success('Seal Uploaded successfully.', {
            position: "top-right",
            style: {
              background: '#389750',
              color: '#fff',
              border: 'none',
              padding: '16px'

            }
          })
        }, 
        nextTab: {
          label: 'Stamp'
        },
        fail: () => {
           toast.error('Please generate a seal or stamp', {
              position: "top-right",
              style: {
                background: 'red',
                color: '#fff',
                border: 'none',
                padding: '16px'

              }
            })
        }
      });
    
  }

   // initialize the canvas context
   useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, [fullName]);


  useEffect(() => {
    if (fileURL) {
      setBase64Url(fileURL?.NotaryDigitalSeal?.find(
        (signature) => signature?.category === "Upload"
      )?.file || '');
    }
  }, [fileURL]);


const r = 111;
const space = Math.PI / 12;

 

  const updateCanvas = (text, x, y, radius, space, top, fontSize) => {
  
  
    draw3dText(ctx, "", canvas.current.width / 2, 120, 5);

    ctx.font = "normal " + fontSize + " arial ";
    ctx.beginPath();
    ctx.arc(160, 150, r, 0, Math.pow(r, 2), false);
    ctx.closePath();
    ctx.clearRect(0, top ? 0 : y, 600, y);
    space = space || 0;
    const numRadsPerLetter = (Math.PI - space * 2) / text.length;
    ctx.save();
    ctx.translate(x, y);
    const k = top ? 1 : -1;
    ctx.rotate(-k * ((Math.PI - numRadsPerLetter) / 2 - space));
  
    for (let i = 0; i < text.length; i++) {
      ctx.save();
      ctx.rotate(k * i * numRadsPerLetter);
      ctx.textAlign = "left";
      ctx.textBaseline = !top ? "top" : "bottom";
      ctx.backgroundColor = "rgba(255,255,255,0.1)";
      
      const cText = text[i].split(" ").join(String.fromCharCode(8201));
      ctx.fillText(cText.toUpperCase(), 0, -k * radius);
      ctx.restore();


    }

    console.log(sealImage.current, 'ctx');
    // base64Url.value = canvas.toDataURL("image/png");
    ctx.restore();
  };

  const draw3dText = (context, text, x, y, textDepth) => {
    let n;
    for (n = 0; n < textDepth; n++) {
      context.fillText(text, x - n, y - n);
    }
    context.shadowColor = "#000";
    // context.fillStyle = "#5E97FF";
    context.shadowBlur = 10;
    context.shadowOffsetX = textDepth + 2;
    context.shadowOffsetY = textDepth + 2;
    context.fillText(text, x - n, y - n);
  };

  useEffect(() => {
  //  updateCanvas(`${fullName?.firstName} ${fullName?.lastName}`, 130.5, 155, r, space, 1, "1.125em");
    // updateCanvas(`SCN:${fullName?.notary_number}`, 130.5, 155, r, space, 0, "1.125em");
  } , [fullName])

  
  return (
    <div className='pt-2'>
       <div className={styles.payment__options} onChange={onChangeValue}>
          <label className={styles.payment__option} htmlFor="color-grey">
            <input name="sealColor"  type="radio" id="color-grey"  value="grey" checked={sealColor == "grey"} />

            <div className={styles.payment__option_content}>
              <div className={styles.parent} style={{borderColor: "rgb(152, 152, 152)"}}>
                <div className={styles.child1} style={{borderColor: "rgb(152, 152, 152)"}}></div>
              </div>
            </div>
          </label>
          <label className={styles.payment__option} htmlFor="color-blue">
            <input name="sealColor" v-model="sealColor"  type="radio" id="color-blue" value="green" checked={sealColor == "green"} />
            <div className={styles.payment__option_content}>
             
              <div className={styles.parent} style={{borderColor: "#36935b"}}>
                <div className={styles.child1} style={{borderColor: "#36935b"}}></div>
              </div>
            </div>
          </label>
          <label className={styles.payment__option} htmlFor="color-red">
            <input name="sealColor" v-model="sealColor" type="radio" id="color-red" value="orange" checked={sealColor == "orange"} />
            <div className={styles.payment__option_content}>
              
              <div className={styles.parent} style={{borderColor: "#fac77a"}} >
                <div className={styles.child1} style={{borderColor: "#fac77a"}}></div>
              </div>
            </div>
          </label>

          <div className="preview">
            {/* <img v-if="data.file"  className="img-fluid" alt="Seal" /> */}
          </div>
        </div>
    
      <div className="signature__body-wrapper grid grid__layout gap-1 pt-1">
  
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>

      <div className="col-7 ">

      {/* {!uploadedSeal ? base64Url : uploadedSeal} */}
        <div ref={sealImage} className="position-relative" style={{width : '380px',overflow: 'scroll', position: "relative"}} >
          <div  id="coy_number"  style={{
             
              position: "absolute",
              top: "168px",
              left: "-45px",
              fontWeight: "normal",
              fontSize: "25px",
              fontFamily: "arial",
              width: "480px",
              textAlign: "center",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.7)",
              // textShadow: "14px 14px 12px rgba(0, 0, 0, 1)",
              // /* color: blue; */
              /* color: #c1353f; */
              /* text-shadow: 3px 1px 0px #000; */
            
          }}> <span>SCN:{fullName?.notary_number}</span> </div>
          <img style={{maxWidth : '380px' }} className="" width="380" height="380" src={`${sealColor == 'grey' ? seal_gray : sealColor == 'green' ? seal_green : sealColor == 'orange' ? seal_orange : ''}`} alt="seal" />
          <canvas  width="300" height="300"  ref={canvas} id="canvas"  style={{
              transform: "translate(-48%, -50%)",
              position: "absolute",
              top:" 50%",
              left: "203px"
            }}></canvas>
        </div>
    
       
      </div>
      <div className="container col-5 m-auto">
        <span className="text--red text--700 ">* Kindly click ‘here’ before saving</span>
        <Button
        className="my-1"
        theme="primary"
        width={161}
        onClick={() => saveHtmlAsImage()}
        loading={loading}
        disabled={loading === true}
        icon={uploadedSeal ? <CheckMark className='ml-1'/> : null }
        wide={true}
      >
       {uploadedSeal ? 'Adopted' : 'Adopt'}
      </Button>
     
        <div className={fetching ? 'signature__body--disabled mt-2' : ''} />
      {/* <img src={!uploadedSeal ? base64Url : uploadedSeal} alt="seal" /> */}
        </div>
      </div>


      
      {/* <canvas ref={canvas}></canvas> */}
      <div className="mt-1" />
      {showAgreement && <SignaturePolicy acceptPolicy={acceptPolicy} setAcceptPolicy={setAcceptPolicy} />}

      <div className="bb-1 mb-2" />
      <Button onClick={prevStep} type="button" theme="grey" variant="outline" style={{borderRadius: '50%'}} className='mr-2'>
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                      fill="#A1A0A0" />
                  </svg>
        </Button>
      <Button
        className="mb-1"
        theme="primary"
        width={161}
        onClick={() => onSave()}
        // loading={loading}
        loading={isSaving}
        // disabled={actionType === 'requests' ? isDisabled : isDefaultDisabled}
        disabled={isDisabled || !uploadedSeal}
      >
        Save
      </Button>
    </div>
  );
};

DigitalSeal.defaultProps = {
  actionType: 'default',
  requestData: {},
  showAgreement: false
};

export default DigitalSeal;

