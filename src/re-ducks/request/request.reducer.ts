import { SAVE_ALL_REQUEST } from './request.types';
import { IRequestAction, IRequestState } from './request.interface';

export const initialState: IRequestState = {
  requests: {
    generalStatus: {
      total_count: '0',
      pending_count: '0',
      scheduled_count: '0',
      pay_now_count: '0',
      cancelled_count: '0'
    },
    page: 1,
    requests: [],
    total_count: 0,
    total_pages: 0
  }
};

const requestReducer = (state = initialState, { type, payload }: IRequestAction) => {
  switch (type) {
    case SAVE_ALL_REQUEST:
      return {
        ...state,
        requests: payload as object
      };

    default:
      return state;
  }
};

export default requestReducer;
