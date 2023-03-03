import React, { FC, useEffect, useState } from 'react';
import Tabs from 'components/Tabs';
import { useDispatch } from 'react-redux';
import TypeSignature from 'components/TypeSignature';
import DrawSignature from 'components/DrawSignature';
import InitialSignature from 'components/InitialSignature';
import SealWrapper from 'components/DigitizeSealStamp/SealWrapper';
import StampWrapper from 'components/DigitizeSealStamp/StampWrapper';
import { editUserSignature, saveUserSignature, fetchUserSignature } from 're-ducks/user/user.action';
import SignatureTabs from 'components/Tabs/signatureTab';
// import toast from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast';
import DigitalSeal from 'components/DigitizeSealStamp/DigitalSeal';
import SealTabs from 'components/Tabs/sealTab';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import seal from 'assets/img/cfo_seal.png';
import seal_gray from 'assets/img/seal_gray.png';

interface Props {
  user: {
    [k: string]: string | boolean | Date | any;
  };
  prevStep: () => void;
}

const Seals: FC<Props> = ({ user, prevStep }: Props) => {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState<boolean>(false);
  const [currentSign, setCurrentSign] = useState<any>({});
  const [fetchingFiles, setFetchingFiles] = useState<boolean>(true);

  const tabsContent = [
    {
      label: 'Traditional Seal',
      icon: <img src={seal} alt="seal" />
    },
    {
      label: 'Digital Seal',
      icon: <img src={seal_gray} alt="seal" />
    }
    
  ];

  const [activeTabContent, setActiveTabContent] = useState(tabsContent[0]);

  const saveSignature = ({ type, category, file, done, fail, nextTab }: any) => {
    setSaving(true);
    const queries = { type, category, file };
    if (!currentSign?.file_url) {
      dispatch(
        saveUserSignature(
          queries,
          file,
          (data) => {
            setSaving(false);
            setCurrentSign(data);
            done();
            // setActiveTabContent(nextTab);
          },
          () => {
  
            // toast.error('Please generate a seal or stamp', {
            //   position: "top-right",
            //   style: {
            //     background: 'red',
            //     color: '#fff',
            //     border: 'none',
            //     padding: '16px'

            //   }
            // })
            // console.log('error');
            fail();
            setSaving(false);

          }
        )
      );

      return;
    }
    dispatch(
      editUserSignature(
        { ...queries, fileId: currentSign.file_id },
        file,
        (data) => {
          setSaving(false);
          setCurrentSign(data);
          done();
        },
        () => {
          setSaving(false);
        }
      )
    );
  };

  useEffect(() => {
    setCurrentSign([]);
    const sigType = activeTabContent.label.toLowerCase();
    const queries = { fileType: 'signature', sigType: sigType === 'type' ? 'text' : sigType };
    setFetchingFiles(true);
    dispatch(
      fetchUserSignature(
        (data) => {            
          setFetchingFiles(false);
          setCurrentSign(data);
        },
        (error) => {
          setFetchingFiles(false);

          return error;
        }
      )
    );
    // if (activeTabContent.label !== 'Seal' && activeTabContent.label !== 'Stamp') {
     
    // }
  }, [dispatch, activeTabContent]);


  return (
    <div>
      <SealTabs type="horizontal" tabs={tabsContent} active={activeTabContent} setActive={(tab: any) => setActiveTabContent(tab)} />
      {activeTabContent.label === 'Traditional Seal' && <SealWrapper prevStep={prevStep} fileURL={currentSign} fetching={fetchingFiles} Save={saveSignature} isSaving={saving} showAgreement/>}
      {activeTabContent.label === 'Digital Seal' && <DigitalSeal prevStep={prevStep} fileURL={currentSign} fetching={fetchingFiles} Save={saveSignature} isSaving={saving} showAgreement/>}


      {/* {activeTabContent.label === 'Stamp' && <StampWrapper prevStep={prevStep} Save={saveSignature} isSaving={saving} showAgreement/>} */}
    </div>
  );
};

export default Seals;

