export interface DocsState {
  documents: {};
  isTable: boolean;
  signers: ISignersState[];
  signatureFields: SignatureObj[];
}

export interface ISignersState {
  id: null | string;
  document_id: null | string;
  unique_id: null | string;
  name: null | string;
  email: null | string;
  status: null | string;
  created_at: null | string;
}

export type SignatureObj = {
  field_id: string;
  signature: string;
};

export interface DocsAction {
  payload: { page: number; perPage: number };
  type: string;
  cbError: (message?: string) => void;
  cb: (message?: string) => void;
}

export interface IDocumentState {
  page: number;
  total_count: number;
  total_pages: number;
  userDocuments: {
    id: string;
    title: string;
    document_url: string;
    document_id: string;
    message: string;
    user_id: string;
    fields: null | Array<string>;
    signature_status: string;
    created_at: string;
    updated_at: string;
    status: string;
    is_deleted: boolean;
    sent_to: Array<string>;
  }[];
  userDocumentCount: {
    total_count: string | number;
    viewed_count: string | number;
    sent_count: string | number;
    draft_count: string | number;
    notarized_count: string | number;
    signed_count: string | number;
    retract_count: string | number;
  };
  perPage: number;
}

export interface IDocumentAction {
  type: string;
  payload: { data: IDocumentState };
}

export interface IFetchDocument {
  type: string;
  payload: { page: number; perPage: number };
  cbError: (message?: string) => void;
  cb: (message?: string) => void;
}
