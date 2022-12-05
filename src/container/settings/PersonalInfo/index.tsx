import Tabs from 'components/Tabs';
import React, { useState } from 'react';
import useTypedSelector from 'hooks/useTypedSelector';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import InfoTabs from 'components/Tabs/infoTab';
import AddPersonalInfo from './components/AddPersonalInfo';
import DigitiseSignature from './components/DigitiseSignature';
import IDVerification from './components/IDVerification';

const tabsContent = [
  {
    label: 'ID Verification'
  },
  {
    label: 'Add personal information'
  },
  
  {
    label: 'Digitise signature'
  }
];

const PersonalInfo = () => {
  const [activeTabContent, setActiveTabContent] = useState(tabsContent[0]);
  const user = useTypedSelector((state) => state);
  const handleActiveTab = (tab: { label: string }) => {
    setActiveTabContent(tab);
  };

  return (
    <div>
      <div className="grid grid__layout ">
        <div className="col-3  pt-2 tab-header">
          <InfoTabs type="vertical" setActive={(tab) => handleActiveTab(tab)} tabs={tabsContent} active={activeTabContent} />
        </div>
       
      <div className="col-8 pt-2 " style={{backgroundColor: '#fff'}}>
      
          {activeTabContent.label === tabsContent[1].label && <AddPersonalInfo prevStep={() => setActiveTabContent(tabsContent[0])}  nextStep={() => setActiveTabContent(tabsContent[1])} />}
          {activeTabContent.label === tabsContent[0].label && (
            <IDVerification nextStep={() => setActiveTabContent(tabsContent[2])} user={user} />
          )}
          {activeTabContent.label === tabsContent[2].label && <DigitiseSignature prevStep={() => setActiveTabContent(tabsContent[1])} user={user} />}


      </div>
   
       
      </div>
    </div>
  );
};

export default PersonalInfo;
