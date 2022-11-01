import { RESET_DOC_STATE, SET_SIGNERS, SET_SIGNATURES, RESET_SIGNATURES } from './documents.types';
import { DocsAction, DocsState, SignatureObj } from './documents.interface';

export const initialState: DocsState = {
  documents: {
    userDocuments: [],
    useDocumentCount: {}
  },
  isTable: true,
  signers: [],
  signatureFields: [] as SignatureObj[]
};

const docsReducer = (state = initialState, { type, payload }: DocsAction) => {
  switch (type) {
    case SET_SIGNERS:
      return {
        ...state,
        signers: payload
      };
    case SET_SIGNATURES:
      return {
        ...state,
        signatureFields: [...state.signatureFields, { ...payload }]
      };
    case RESET_SIGNATURES:
      return {
        ...state,
        signatureFields: []
      };
    case RESET_DOC_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default docsReducer;

