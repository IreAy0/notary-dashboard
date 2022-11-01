import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonalInfo from "container/settings/PersonalInfo";
import BankAccountSetUp from "container/settings/BankSetUp";
import PaymentHistory from "container/settings/PaymentHistory";
import SecuritySetUp from "container/settings/Security";
import Calendar from "container/settings/Calendar";
import Dashboard from '../../dashboard/SidebarLayout/index';
import Tabs from '../../components/Tabs';
import PreviewCalendar from "container/settings/Calendar/previewCalendar";

const Settings = () => {
  const tabs = [
    {
      label: 'Personal Info'
    },
    {
      label: 'Bank account setup'
    },
    {
      label: 'Payment History'
    },
    {
      label: 'Calendar'
    },
    {
      label: 'Security'
    }
  ];
  const {tab}: any = useParams();
  // const { tab }: any = useParams()


  const [activeTab, setActiveTab] = useState({label: ''});
  const selectTab = (tabValue: { label: string }) => {
    setActiveTab(tabValue);

  };

  useEffect(() => {
    setActiveTab({label: tab?.replace(/_/g, ' ')});
  }, [tab])

  console.log(tab, 'tab', activeTab?.label )

  
  return(
        <Dashboard>
            <section>
                <div className="flex">
            <Tabs
              setActive={(tabValue) => {
        
                selectTab(tabValue);
              }}
              tabs={tabs}
              active={activeTab?.label}
            />
                </div>
                {activeTab?.label === 'Personal Info' && <PersonalInfo />}
                {activeTab?.label === 'Bank account setup' && <BankAccountSetUp />}
                {activeTab?.label === 'Payment History' && <PaymentHistory />}
                {activeTab?.label === 'Security' && <SecuritySetUp />}
                {activeTab?.label === 'Calendar' && <Calendar />}
                {activeTab?.label === 'Review Calendar' && <PreviewCalendar />}
            </section>
        </Dashboard>
  )
}

export default Settings;
