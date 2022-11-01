import { SAVE_ALL_COMPLETE_REQUEST } from './locker.types';
import { ILockerAction, ILockerState } from './locker.inteface';

export const initialState: ILockerState = {
  lockers: [
    {
      document_name: '',
      status: '',
      call_start_time: '',
      notary_fee_in_naira: 0,
      call_date: '',
      owner_name: '',
      owner_phone: 0,
      owner_email: '',
      participants: [],
      id: ''
    }
  ]
};

const lockerReducer = (state = initialState, { type, payload }: ILockerAction) => {
  switch (type) {
    case SAVE_ALL_COMPLETE_REQUEST:
      return {
        ...state,
        lockers: payload as object
      };

    default:
      return state;
  }
};

export default lockerReducer;
