export interface IRequestAction {
  payload: object | boolean;
  type: string;
  id: object;
}

export interface IRequestState {
  // requests: {
  //   generalStatus: {
  //     total_count: string;
  //     pending_count: string;
  //     scheduled_count: string;
  //     pay_now_count: string;
  //     cancelled_count: string;
  //   };
  //   page: number;
  //   requests: {
  //     [k: string]: string;
  //   }[];
  //   total_count: number;
  //   total_pages: number;
  // };
  requests:[]
}
