export interface SignerFields {
  [key: string]: {
    top: number;
    left: number;
    color: string;
    type: string;
    signature?: string;
    field_id?: string;
    status?: string;
    signer_email?: string;
    signer_id?: string;
  };
}

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
  signed?: boolean;
}

export type Doc = {
  request_id?: string;
  request_url?: string;
  template_id?: string;
  id?: string;
  title?: string;
  document_url?: string;
  document_name?: string;
  document_id?: string;
  message?: string;
  user_id?: string;
  fields?: null;
  signature_status?: string;
  created_at?: string;
  updated_at?: string;
  is_deleted?: string;
  status?: string;
  signers?: Array<any>;
  signatureFields?: { [k: string]: any }[];
  notary_id?: any;
  notary_email?: string;
};
