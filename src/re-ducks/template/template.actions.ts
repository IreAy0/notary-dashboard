import {  GET_ALL_TEMPLATES } from './template.types';

export const getAllTemplates = (cb: (success: string) => void, cbError: (error: string) => void) => ({
  type: GET_ALL_TEMPLATES,
  cb,
  cbError
});


