export interface ILockerAction {
  payload: object | boolean;
  type: string;
  id: object;
}

export interface ILockerState {
  lockers: [
    {
      document_name: string;
      status: string;
      call_start_time: string;
      notary_fee_in_naira: number;
      call_date: string;
      owner_name: string;
      owner_phone: number;
      owner_email: string;
      participants: {
        [k: string]: string;
      }[];
      id: string;
    }
  ];
}

