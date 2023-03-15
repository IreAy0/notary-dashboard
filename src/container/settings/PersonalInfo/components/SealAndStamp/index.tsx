import React, { FC, useEffect, useState } from 'react';
import Tabs from 'components/Tabs';
import { useDispatch } from 'react-redux';
import StampWrapper from 'components/DigitizeSealStamp/StampWrapper';
import { editUserSignature, saveUserSignature, fetchUserSignature } from 're-ducks/user/user.action';
import SignatureTabs from 'components/Tabs/signatureTab';
import Seals from '../Seals';


interface Props {
  user: {
    [k: string]: string | boolean | Date | any;
  };
  prevStep: () => void;
}

const SealStamp: FC<Props> = ({ user, prevStep }: Props) => {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState<boolean>(false);
  const [currentSign, setCurrentSign] = useState<any>({});
  const [fetchingFiles, setFetchingFiles] = useState<boolean>(true);

  const tabsContent = [
    {
      label: 'Seal'
    },
    {
      label: 'Stamp'
    }
    
  ];

  const [activeTabContent, setActiveTabContent] = useState(tabsContent[0]);

  const saveSignature = ({ type, category, file, done, fail }: any) => {
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
      <SignatureTabs type="horizontal" tabs={tabsContent} active={activeTabContent} setActive={(tab) => setActiveTabContent(tab)} />
      {activeTabContent.label === 'Seal' && <Seals prevStep={prevStep} user={user}/>}
      {activeTabContent.label === 'Stamp' && <StampWrapper prevStep={prevStep} Save={saveSignature} user={user} isSaving={saving} showAgreement/>}
    </div>
  );
};

export default SealStamp;

