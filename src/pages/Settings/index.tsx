import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonalInfo from "container/settings/PersonalInfo";
import BankAccountSetUp from "container/settings/BankSetUp";
import PaymentHistory from "container/settings/PaymentHistory";
import SecuritySetUp from "container/settings/Security";
import Calendar from "container/settings/Calendar";
import PreviewCalendar from "container/settings/Calendar/previewCalendar";
import Dashboard from '../../dashboard/SidebarLayout/index';
import Tabs from '../../components/Tabs';

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
    setActiveTab({label: tab?.replace(/-/g, ' ')});
  }, [tab])
  
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
                {activeTab?.label === 'personal info' && <PersonalInfo />}
                {activeTab?.label === 'bank account setup' && <BankAccountSetUp />}
                {activeTab?.label === 'payment history' && <PaymentHistory />}
                {activeTab?.label === 'security' && <SecuritySetUp />}
                {activeTab?.label === 'calendar' && <Calendar />}
                {activeTab?.label === 'review calendar' && <PreviewCalendar />}
            </section>
        </Dashboard>
  )
}

export default Settings;
