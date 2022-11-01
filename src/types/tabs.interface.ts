import React from 'react';

export interface TabsProps {
  isSaving: boolean;
  onSave: (data: object) => void;
  fileURL: any;
  fetching: boolean;
  showAgreement?: boolean;
  children?: React.ReactNode;
  signatureType?: string;
  user?: string | boolean | Date | any;
  hideButton?: boolean;
  uploadedText?: string;
}

export type TabOption = {
  label: string;
  disabled?: boolean;
  title?: string;
  icon?: React.ReactNode;
};
