/* eslint-disable */
export const headers = [
  {
    text: 'Document name',
    alignment: 'center',
    sortable: false,
    key: 'document_name'
  },
  {
    text: 'Participants',
    alignment: 'center',
    sortable: false,
    key: 'cost'
  },
  {
    text: 'Transaction Cost',
    alignment: 'center',
    sortable: false,
    key: 'cost'
  },
  {
    text: 'Status',
    alignment: 'center',
    sortable: false,
    key: 'edited'
  },
  {
    text: 'Date',
    alignment: 'center',
    sortable: false,
    key: 'average_time'
  },
  {
    text: 'Time',
    alignment: 'center',
    sortable: false,
    key: 'action'
  },
  {
    text: '',
    alignment: 'center',
    sortable: false,
    key: 'action'
  },
  {
    text: '',
    alignment: 'center',
    sortable: false,
    key: 'action'
  }
];

export const data = [
  {
    document_name: 'ToNote<>LaSoft Contract',
    status: 'pending',
    participants: ['Bello James (CEO)', 'Dapo Tomori (COO)'],
    transaction_cost: 'NA',
    average_time: 'Immediate',
    date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    document_name: 'Power of Attorney',
    status: 'pending',
    participants: ['Titi Faruq', 'Bolanle John', 'Precious Bidemi'],
    transaction_cost: 'NA',
    average_time: '12:00',
    date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    document_name: 'Declaration of citizenship',
    status: 'completed',
    participants: ['Titi Faruq', 'Bolanle John', 'Precious Bidemi'],
    transaction_cost: '₦475.22',
    average_time: '12:00',
    date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    document_name: 'Lease rent agreement',
    status: 'scheduled',
    participants: ['Titi Faruq', 'Bolanle John', 'Precious Bidemi'],
    transaction_cost: 'NA',
    average_time: '12:00',
    date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  }
];

export const requestHeaders = [
  {
    text: 'Document name',
    alignment: 'center',
    sortable: false,
    key: 'document_name'
  },
  {
    text: 'Status',
    alignment: 'center',
    sortable: false,
    key: 'edited'
  },
  {
    text: 'Date',
    alignment: 'center',
    sortable: false,
    key: 'average_time'
  },
  {
    text: 'Time',
    alignment: 'center',
    sortable: false,
    key: 'action'
  },
  {
    text: '',
    alignment: 'center',
    sortable: false,
    key: 'action'
  }
];

export const lockerHeaders = [
  {
    text: 'Request',
    alignment: 'center',
    sortable: false,
    key: 'request'
  },
  {
    text: 'Phone Number',
    alignment: 'center',
    sortable: false,
    key: 'phone_number'
  },
  {
    text: 'Email',
    alignment: 'center',
    sortable: false,
    key: 'email'
  },
  {
    text: 'Amount',
    alignment: 'center',
    sortable: false,
    key: 'amount'
  }
];

export const lockerData = [
  {
    id: 1,
    document_name: 'ToNote<>LaSoft Contract',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'Precious Bidemi',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    phone_number: '(505) 555-0125',
    email: 'debra.holt@example.com',
    amount: 'N 903.00',
    role: 'owner'
  },
  {
    id: 2,
    document_name: 'ToNote<>LaSoft Contract',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'Precious Bidemi',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    role: 'signer',
    phone_number: '(505) 555-0125',
    email: 'debra.holt@example.com',
    amount: 'N 903.00'
  },
  {
    id: 3,
    document_name: 'ToNote<>LaSoft Contract',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'Precious Bidemi',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    role: 'witness',
    phone_number: '(505) 555-0125',
    email: 'debra.holt@example.com',
    amount: 'N 903.00'
  }
];

export const allRequestData = [
  {
    id: 1,
    document_name: 'Tonote <> Enyata Contract',
    status: 'pending',
    participants: [
      'Bolaji Alaba',
      'Julius Makinde',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    immediate_session: false,
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 2,
    document_name: 'Power of Attorney',
    status: 'pending',
    participants: [
      'Titi Faruq',
      'Bolanle John',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    immediate_session: true,
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 3,
    document_name: 'Declaration of citizenship',
    status: 'pending',
    participants: [
      'Bolaji Alaba',
      'Julius Makinde',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: '₦475.22',
    call_time: '12:00',
    immediate_session: false,
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 4,
    document_name: 'Power of Attorney',
    status: 'scheduled',
    participants: [
      'Bolaji Alaba',
      'Julius Makinde',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    immediate_session: false,
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 5,
    document_name: 'Power of Attorney',
    status: 'scheduled',
    participants: [
      'Bolaji Alaba',
      'Julius Makinde',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    immediate_session: true,
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 6,
    document_name: 'Lease rent agreement',
    status: 'scheduled',
    participants: [
      'Bolaji Alaba',
      'Julius Makinde',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    immediate_session: false,
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 7,
    document_name: 'Declaration of citizenship',
    status: 'cancelled',
    participants: [
      'Bolaji Alaba',
      'Julius Makinde',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: '₦475.22',
    call_time: '12:00',
    call_date: '23/02/2022',
    immediate_session: false,
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 8,
    document_name: 'Declaration of citizenship',
    status: 'scheduled',
    participants: [
      'Bolaji Alaba',
      'Julius Makinde',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: '₦475.22',
    call_time: '12:00',
    call_date: '23/02/2022',
    immediate_session: false,
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 9,
    document_name: 'Lease rent agreement',
    status: 'Awaiting Payment',
    participants: [
      'Bolaji Alaba',
      'Julius Makinde',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    immediate_session: false,
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 10,
    document_name: 'Lease rent agreement',
    status: 'Awaiting Payment',
    participants: [
      'Bolaji Alaba',
      'Julius Makinde',
      'Ike Julius',
      'Bala Julius',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe',
      'Bolaji Alaba',
      'John Doe'
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    immediate_session: false,
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  }
];

export const pendingRequestData = [
  {
    id: 1,
    document_name: 'Tonote <> Enyata Contract',
    status: 'pending',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: 'Immediate',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 2,
    document_name: 'Power of Attorney',
    status: 'pending',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 3,
    document_name: 'Declaration of citizenship',
    status: 'pending',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: '₦475.22',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 4,
    document_name: 'Lease rent agreement',
    status: 'pending',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Status'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  }
];

export const scheduledRequestData = [
  {
    id: 1,
    document_name: 'Tonote <> Enyata Contract',
    status: 'scheduled',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: 'Immediate',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 2,
    document_name: 'Power of Attorney',
    status: 'scheduled',
    participants: [
      {
        name: 'Mercy Joy',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'Precious Bidemi',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 3,
    document_name: 'Declaration of citizenship',
    status: 'scheduled',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'Precious Bidemi',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: '₦475.22',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 4,
    document_name: 'Lease rent agreement',
    status: 'scheduled',
    participants: [
      {
        name: 'Titi Raju',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'Precious Bidemi',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  }
];

export const cancelledRequestData = [
  {
    id: 1,
    document_name: 'Tonote <> Enyata Contract',
    status: 'cancelled',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 2,
    document_name: 'Power of Attorney',
    status: 'cancelled',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 3,
    document_name: 'Declaration of citizenship',
    status: 'cancelled',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: '₦475.22',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 4,
    document_name: 'Lease rent agreement',
    status: 'cancelled',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  }
];

export const awaitPaymentData = [
  {
    id: 1,
    document_name: 'Tonote <> Enyata Contract',
    status: 'awaitingPayment',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: 'Immediate',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 2,
    document_name: 'Power of Attorney',
    status: 'awaitingPayment',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 3,
    document_name: 'Declaration of citizenship',
    status: 'awaitingPayment',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: '₦475.22',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  },
  {
    id: 4,
    document_name: 'Lease rent agreement',
    status: 'awaitingPayment',
    participants: [
      {
        name: 'Titi Faruq',
        role: 'owner',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Verified'
      },
      {
        name: 'Bolanle John',
        role: 'signer',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      },
      {
        name: 'John Doe',
        role: 'witness',
        phoneNumber: '(505) 555-0125',
        email: 'debra.holt@example.com',
        status: 'Unverified'
      }
    ],
    transaction_cost: 'NA',
    call_time: '12:00',
    call_date: '23/02/2022',
    action: '',
    desc: 'To: Fikayo, Florence, Andriy, Yulia, Alina'
  }
];

export const singleRequestHeaders = [
  {
    text: 'Participant:',
    alignment: 'center',
    sortable: false,
    key: 'participant'
  },
  {
    text: 'Phone number:',
    alignment: 'center',
    sortable: false,
    key: 'phone_number:'
  },
  {
    text: 'Email',
    alignment: 'center',
    sortable: false,
    key: 'email'
  },
  {
    text: 'Status',
    alignment: 'center',
    sortable: false,
    key: 'edited'
  }
];

export const certificateData = {
  request_url:
    'https://staging-tonote-storage.s3.eu-west-1.amazonaws.com/files/requests/user-b3bc52dec79911ecaecacf5fdba3f68a/notary/8b121daa-fe5b-4ce5-93a8-92629e8f04b0/8b121daa-fe5b-4ce5-93a8-92629e8f04b0.docx',
  documentExt: '.docx',
  request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
  document_name: 'CIS4003  Assignment Brief V2 (3).docx',
  signatureFields: [
    {
      id: 'sign-field36403e82d12711eca5932fcd589899ff',
      request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      field_id: '8629a93b-0db9-4e87-9022-6a9a7db26cfb',
      field_type: 'typed_signature',
      signer_id: 'participant-2c0350d2d12511eca',
      position_x: '76',
      position_y: '39',
      field_location:
        'U2FsdGVkX18sa3iOGJe5QikgEGjf0SwAO4%2BXG6Us2YfRk5DUsQIyoOPSNYGeYtLacGwhOUXsFMHizbO3gpCSg7axkaeh8Ecqg36qrRN7fd7U%2FhN4TsZpE%2FLlmbZZ8hg9Q3JylrEwSsWEVDKiOG6gzVpPtf45Fpkfb3eXpJvFBFq6zsgJM8BBZGj%2BIfjc64ffybzoOLbFSMnb%2FbS5nZXCJCoRJyFCULnoaOPEnVH0XqpRRTmRKFpt89ih7kHXxhXb%2F%2B0Pr0k1iWW5Pq8m8X0uNE1WKW%2FjKbd4jTRUpCgu6jNkka1Cos5MAu%2B9hVPd3hk8Y%2Bt4k9JIGN1r4nvNqd2Upgp8pfB7xCPbxhtlgXRKkUZARVNiWoV1yIWEY%2BeA%2BZKM6gDqRY%2FXIXSEFcZkSTwO7g%3D%3D',
      signed_at: '2022-05-11T12:38:08.566Z',
      signature_url:
        'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/f4d22874-171d-43b3-b2fb-84a8781c1c64-signature.png'
    },
    {
      id: 'sign-field3642aed8d12711eca59303de25e5ef64',
      request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      field_id: '35421934-8afa-4315-9c57-67693879faf8',
      field_type: 'typed_signature',
      signer_id: 'notary-f76d4e56c8c611ec824273348d76275e',
      position_x: '736',
      position_y: '349',
      field_location:
        'U2FsdGVkX1%2By0cyan7AVnEiVUbbwFDpWjVq%2FP5QtLiksNPj8T%2FPZ9UuLU5J1WzNEqaxUxMENE15XV8FaxMb%2FQ4cxamkPJ7apArhAEcLiafjE2%2F6J8WWPDyITB%2Bq4p92yQL59IdkAU3pAA8cYWsQQVnllUI4lG%2F9pcTN7YE2Pryf30t3dVj6hnjwUHkwjA5IbEv2M%2BPiTPCjLT6y0BlK3Q0xDxSeF6NisT5tablTuhSMCGVS9O5oOOCqBQ0sDobNzcXtNkv%2Fafc0z%2BJub2RPyEXbXdTwjxHXKUZg2FiBPYhu5pifLQt82IqLnZjxxbHurg1C2eGRAWHCQVUq3tcpR2xNUxxgb6eT16VbN9%2FrMuCjfj6GLqCTvqFvApXQHdvUT5IzMD5KS3GeaWdkxeZxGug%3D%3D',
      signed_at: '2022-05-11T12:38:08.590Z',
      signature_url:
        'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png'
    },
    {
      id: 'sign-field36403f54d12711ecab36affb829f28db',
      request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      field_id: '35421934-8afa-4315-9c57-67693879faf88930',
      field_type: 'typed_signature',
      signer_id: 'participant-2c0379ead12511ec8',
      position_x: '736',
      position_y: '349',
      field_location:
        'U2FsdGVkX19k3fKTiOC%2BRW9Em8rpkPDeJrbWz1HxDt9L%2FCzqVD%2BJfnxEBrdGX5wxeeZ8%2Bp7DvHMHTjLHq8MjPMwdzaJebT7Uyg2Jebos4b29iLOupjqIGFzNYhz6FEKLXkCDlhbxVaQve9H%2BMxRTUZ5MjteULNQsFVMEtu0GdyKBJ%2Fp7UC4dmb%2FCVr5phwGzYMNouUPjczn344FAZnuGNKQtQQI4byQtR0sDclTFK%2FZgCDdvhlcavvGcfTwFL4lZbH7DqPKt8j3y%2BxFIdsjXR2TlzztBzoqouL9fi1oMy8Z4MDQekwlzTQz0QKglB20ruTelChn29QFUiFc78hqBz4eyZaSZTGz77njv7ZDql1ftpi62ROYpGI0UQhr2Ht%2F%2BwtjNQhTME8yELD0wGHzLRw%3D%3D',
      signed_at: '2022-05-11T12:38:08.568Z',
      signature_url:
        'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png'
    },
    {
      id: 'sign-field3642dd18d12711ec98d34b1989b67642',
      request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      field_id: '35421934-8afa-4315-9c57-67693879faf81rt64',
      field_type: 'date',
      signer_id: 'notary-f76d4e56c8c611ec824273348d76275e',
      position_x: '736',
      position_y: '349',
      field_location:
        'U2FsdGVkX18%2Bq7nC6%2F9QpWzf5mTR%2B%2F1rAt4ByepmVH516XDEuvjSybvSuIypIRJNR%2FCt%2BwhlZmTNf%2BmBaYLslK3UA1j9K%2BtVAFd%2FztTf7DeO1etlAkUYoyicLaBcGUgbrML861ViM1Es86HLLP7BZsa8LZXC%2BSLEAEM%2BmE3zBZ2JvCutLSbI8tnmPihqf1sWGyIAGQ5oJHgRWWlx8x8CTQABwfzV5DpN4LIsK5PJ3hfPXQIlQ2Z8oEkoyTVWt2shcQUvpH8aQXjLfOYOd0vFT%2FksH%2FfD0rPKB9v595R0OaLok%2BVIE5wOWkPI022Nr%2BK%2FIpILRMQCbE0Z3ENyo5n3y5SsCQD2U14A9TD2PONDgyfn67efJo8FFTjDcnZ6kWL%2FRQIq42rzgoFpakgy5hgPxg%3D%3D',
      signed_at: '2022-05-11T12:38:08.590Z',
      signature_url:
        'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png'
    },
    {
      id: 'sign-field36409fdad12711ec8cb89f1d91479905',
      request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      field_id: '35421934-8afa-4315-9c57-67693879faf8577',
      field_type: 'date',
      signer_id: 'participant-2c03549cd12511ec9',
      position_x: '736',
      position_y: '349',
      field_location:
        'U2FsdGVkX1%2FfAWKs9%2Bg3eDVlSlYweZK94M4L9uJo5MmdIGDeQGc%2F4uauMzZTlrcqQ6LqcZVAyXJnEVOPo1O9twyZQfTNGqFmk0Jw0Oz3IUm3H9QhHnaLLFcGIT8JNulgUntli1relR98AsFlMtLg2S3WAhxFPw9YBfagwFa4JdMzSK6rlbLz1afyuhsnreZcSl2LxGpszvd7vcrl6OYDc%2FvakEqgQ2qlYypDylxCNwGnloLNtZIS0bbSZp3z3Nf0GatOw7jGPtk9VBNESkTjYGOkv83yU2cVZUlsOfJkwY8wmazP3%2FKjP4eQyRPQASrc6EH5gu78thJJhRHkh17Y7%2BJ5tfcCHj5l61EGZLSPp8UIzl3szvEjiUMGHwCKojn9E%2FVsh0skRuhq7ipUMRKxug%3D%3D',
      signed_at: '2022-05-11T12:38:08.577Z',
      signature_url:
        'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png'
    },
    {
      id: 'sign-field3640b362d12711ec8327ff916d69f9ee',
      request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      field_id: '35421934-8afa-4315-9c57-67693879faf887390',
      field_type: 'date',
      signer_id: 'participant-2c0379ead12511ec8',
      position_x: '736',
      position_y: '349',
      field_location:
        'U2FsdGVkX1%2FxfepwxmxRbiakA9VgHYWfpIhQGgTXHv%2FfowiGmTu4nklCusIFa88wMwSvW46SE7HuLNOZ4g7VPyZynOCne2aMFwEV6xD54DiinPGlmgTdMD3I7OXBmkziRQL0PbFCdNYK8un0rBxuqFw6O8BZXrZKwuf%2F8QjVr3rhT7%2BZ%2FrwgyyyQdyfUGnh92GHvHobQRWhqAmK4dYp01Kq9BRijwgcw1cbI%2FJhoxcXo%2F5PXsIhg49NUWoEdLj1OnNGIt0Y8uZSBheeHTB3XziJSa8fQsC4WfkiObMmhiAveIL5cI9QnwBn4I%2FohfEvNpILmHFsvv3eFME1dfO9qQkeuL3xF90xPkfWrtYJ86xCURcRkW%2FN2xrgYPjj0g%2BlBm617zkek2ELG%2B0XLsP8ugg%3D%3D',
      signed_at: '2022-05-11T12:38:08.576Z',
      signature_url:
        'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png'
    },
    {
      id: 'sign-field3640be66d12711ecae64d7cd82e06a5b',
      request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      field_id: '35421934-8afa-4315-9c57-67693879faf8467',
      field_type: 'typed_signature',
      signer_id: 'participant-2c03549cd12511ec9',
      position_x: '736',
      position_y: '349',
      field_location:
        'U2FsdGVkX1%2BzhYrYKlEGIHbgj8AS4sVbwvfg7Qa%2B%2BY4JTGE21b9eLaSMBiYQiVlD6Q87wzF%2BSHniFgVv8X%2BRGDbrpZkm18TyGciP0jSP%2BnWgoHB2CmfEzeGzPY4ZW71RwZkRRL5mrY7gOeV5gf4Mg0SDI4JCTcVaQW0u9%2FVq9%2FfodAkalcoyKoWyF86VlOOJq4bUcPxdEQeGqccjmwh58SgBDI3LYUpaB%2BBgf9OyRFtdU2ecmiC2C%2BawfkulRNEq9ZDAq5tSVdRlol3sLQXB%2FVQ5KA2w2T5F9nGF%2BPe1hNgJeKi9RPOdtutjqM1Kk2vFEP8Np%2BNn2q5AOCmr8OAd7gm7RTiHOsbChfzmz%2BbwuxdKMw6saEI6Ri1%2FkNEqyVD2lVcEUyt5s5ZBe%2F%2FSlv%2FSxg%3D%3D',
      signed_at: '2022-05-11T12:38:08.576Z',
      signature_url:
        'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png'
    },
    {
      id: 'sign-field36430db0d12711ec877cfb32658dd055',
      request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      field_id: '35421934-8afa-4315-9c57-67693879faf867853',
      field_type: 'seal',
      signer_id: 'notary-f76d4e56c8c611ec824273348d76275e',
      position_x: '736',
      position_y: '349',
      field_location:
        'U2FsdGVkX1%2FHzh0ZdJqnTa05%2B0YQbBPON1TIvKY%2BsGg36Pq54B7WI0u367pQ%2FP7BFimBihiyA7D5lphnHzXAmZxTt1GUahNYVNBpksRGHfRkjtof4dKaiG5hq91dA8J8mYNcvPXPKLIyNVyGaoS%2FtvRDvR8svXBotx55duwJMWFV6i2c%2FoBiqGBW%2BCQDSdNrg9lDyORD4Ke9MZ0wybY3%2BFJQhL7QWwVxeKA5ExQjc216bga%2BQJt0SdoFGKhXaoNMcAQF8oBOyxOo31q34gvQqDQbyGopUqKzaShZCNSALq6tllLbHmuxm8UOA6hP7PZBoPLoNPRZoY1whzOVFfUGG3WHWOHXizbFoNzum1jgbGhl3wh3KpOxRb7CwFLIrHlZbhgP3qNDsfDlpSTO0IZMLA%3D%3D',
      signed_at: '2022-05-11T12:38:08.592Z',
      signature_url:
        'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png'
    },
    {
      id: 'sign-field36403e8cd12711eca0d70b8aae577d97',
      request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      field_id: '10c741a6-d195-4894-a676-1c1d6d06d51c',
      field_type: 'date',
      signer_id: 'participant-2c0350d2d12511eca',
      position_x: '176',
      position_y: '39',
      field_location:
        'U2FsdGVkX1%2FHaPnqYw3gQTksK1mvurzYmjN3LQv04LF11FVzO59h%2BruHCL3HFWD96NNnOh45wC7oL3N68yapcGK3a4HTPf%2Bf9c%2FOX21WMrBasb%2FAyN2H1kOfb6ZBAyeoP06spMVf%2BZHtBbX8HY1R0Abi1INK9ygMI6xk9Iu0E8McshOQmhBHfb7XRCrKe2eFToWkg3HhXO9Usb%2FjRzMROEUERL9frtjgp4Sw5w2ETFZPPSSaguMx8jTeKMARqOBuaF9JgcpZif0kn4YkDsnZcbg0wrzLBClE71GAbPMrZPaOIvNplnd4wSXGYBy7o8owGpeK52iy8AybwftohvpgCnVdRrxyBm2hmbdl3T1o5v2ALBkapsI1uii%2BARHKFDpR03CbupX3Owtye9BiIcGLXA%3D%3D',
      signed_at: '2022-05-11T12:38:08.568Z',
      signature_url:
        'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/81cc7754-1495-4821-89f2-e93de55e44d8-text_area.png'
    }
  ],
  requestTransactionCertificate: {
    requestDetails: {
      id: 'req-a45e742cd12411ec9',
      document_reference: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
      document_name: 'CIS4003  Assignment Brief V2 (3).docx',
      document_completed_time: '11 May 2022 17:48:58'
    },
    signerParticipantsDetails: [
      {
        id: 'notary-f76d4e56c8c611ec824273348d76275e',
        email: 'ronzpd@candassociates.com',
        commission_number: 'RC44557788',
        full_name: 'John Blake',
        ip_address: '::1',
        signed_at: '11 May 2022 13:49:54',
        signature_url:
          'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png',
        request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
        type: 'Notary Public'
      },
      {
        id: 'participant-2c0350d2d12511eca',
        email: 'akintundeakinpelumi@gmail.com',
        full_name: 'Bolaji Alaba',
        ip_address: '::1',
        signed_at: '11 May 2022 13:38:08',
        signature_url:
          'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/f4d22874-171d-43b3-b2fb-84a8781c1c64-signature.png',
        request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
        is_request_owner: true,
        is_signer: true,
        status: 'verified',
        type: 'Document Owner'
      },
      {
        id: 'participant-2c0379ead12511ec8',
        email: 'akinpelumi@enyata.com',
        full_name: 'Bala Julius',
        ip_address: '::1',
        signed_at: '11 May 2022 13:38:08',
        signature_url:
          'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png',
        request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
        is_request_owner: false,
        is_signer: true,
        status: 'verified',
        type: 'Signer'
      },
      {
        id: 'participant-2c03549cd12511ec9',
        email: 'mwjkggcgzslcr@scpulse.com',
        full_name: 'Ike Julius',
        ip_address: '::1',
        signed_at: '11 May 2022 13:38:08',
        signature_url:
          'https://tonote-temporary-storage.s3.eu-west-1.amazonaws.com/files/documents/user-2bd19f52c7a111ec9b13c712750a3058/ff0bb067-e592-4a94-998c-cc0dd637eac9/signers/signer-8741305ecc6111ec8ddb476e7e45d357/signature/1765f8cf-2ad4-4b24-ae5e-aec7f13b6b90-date.png',
        request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
        is_request_owner: false,
        is_signer: true,
        status: 'verified',
        type: 'Signer'
      }
    ],
    witnessParticipantsDetails: [
      {
        id: 'participant-2c036af4d12511ecb',
        email: 'ykhylidcyzk@scpulse.com',
        full_name: 'Yawe Bala',
        ip_address: '::1',
        request_id: '8b121daa-fe5b-4ce5-93a8-92629e8f04b0',
        is_request_owner: false,
        is_signer: false,
        status: 'verified',
        signed_at: null,
        type: 'Witness'
      }
    ],
    requestTrail: [
      {
        id: 'req-log-a4605404d12411ec9',
        operation_type: 'UPNTRREQDT',
        content: 'Akinpelumi Akintunde created notary request document',
        activity_time: 'May 11, 2022 13:19'
      },
      {
        id: 'req-log-2c08ebfad12511ec8',
        operation_type: 'ADPTNTSS',
        content: 'Ike Julius was added as a signer to the notary session',
        activity_time: 'May 11, 2022 13:23'
      },
      {
        id: 'req-log-2c09b9e0d12511ec8',
        operation_type: 'ADPTNTSS',
        content: 'Bala Julius was added as a signer to the notary session',
        activity_time: 'May 11, 2022 13:23'
      },
      {
        id: 'req-log-2c09df42d12511ec9',
        operation_type: 'ADPTNTSS',
        content: 'Bolaji Alaba was added as a signer to the notary session',
        activity_time: 'May 11, 2022 13:23'
      },
      {
        id: 'req-log-2c09fa86d12511eca',
        operation_type: 'ADPTNTSS',
        content: 'Yawe Bala was added as a witness to the notary session',
        activity_time: 'May 11, 2022 13:23'
      },
      {
        id: 'req-log-5205852ad12511eca',
        operation_type: 'NTRACNTS',
        content: 'Notary John Blake accepted the notary request',
        activity_time: 'May 11, 2022 13:24'
      },
      {
        id: 'req-log-fd4b365ad12511ecb',
        operation_type: 'NTRSST',
        content: 'Notary session started by John Blake',
        activity_time: 'May 11, 2022 13:29'
      },
      {
        id: 'req-log-363f5c10d12711ec8',
        operation_type: 'NTRNTDOC',
        content: 'Notary John Blake signed request document',
        activity_time: 'May 11, 2022 13:38'
      },
      {
        id: 'req-log-363f581ed12711ec8',
        operation_type: 'SDOC',
        content: 'Participant John Blake signed request document',
        activity_time: 'May 11, 2022 13:38'
      },
      {
        id: 'req-log-36498ceed12711ec9',
        operation_type: 'NTRSET',
        content: 'Notary session ended by John Blake',
        activity_time: 'May 11, 2022 13:38'
      }
    ]
  }
};

