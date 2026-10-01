import type { Users } from '@/models/users'; // adjust import path

export const dummyUsers: Users = [
  { id: '1',  username: 'admin',           email: 'admin@nexus.io',           role: 'Admin',      status: 'Active'    },
  { id: '2',  username: 'sarah.khan',      email: 'sarah.khan@nexus.io',      role: 'Manager',    status: 'Active'    },
  { id: '3',  username: 'john.doe',        email: 'john.doe@nexus.io',        role: 'Worker',     status: 'Active'    },
  { id: '4',  username: 'priya.sharma',    email: 'priya.sharma@nexus.io',    role: 'Worker',     status: 'Inactive'  },
  { id: '5',  username: 'michael.lee',     email: 'michael.lee@nexus.io',     role: 'Manager',    status: 'Active'    },
  { id: '6',  username: 'aisha.rahman',    email: 'aisha.rahman@nexus.io',    role: 'Worker',     status: 'Suspended' },
  { id: '7',  username: 'carlos.mendez',   email: 'carlos.mendez@nexus.io',   role: 'Worker',     status: 'Active'    },
  { id: '8',  username: 'emma.wilson',     email: 'emma.wilson@nexus.io',     role: 'SuperAdmin', status: 'Active'    },
  { id: '9',  username: 'raj.patel',       email: 'raj.patel@nexus.io',       role: 'Worker',     status: 'Pending'   },
  { id: '10', username: 'linda.chen',      email: 'linda.chen@nexus.io',      role: 'Manager',    status: 'Active'    },
  { id: '11', username: 'david.okafor',    email: 'david.okafor@nexus.io',    role: 'Worker',     status: 'Inactive'  },
  { id: '12', username: 'fatima.ali',      email: 'fatima.ali@nexus.io',      role: 'Worker',     status: 'Active'    },
  { id: '13', username: 'tom.baker',       email: 'tom.baker@nexus.io',       role: 'Worker',     status: 'Active'    },
  { id: '14', username: 'nina.kovacs',     email: 'nina.kovacs@nexus.io',     role: 'Manager',    status: 'Suspended' },
  { id: '15', username: 'ahmed.hassan',    email: 'ahmed.hassan@nexus.io',    role: 'Worker',     status: 'Active'    },
  { id: '16', username: 'grace.nguyen',    email: 'grace.nguyen@nexus.io',    role: 'Worker',     status: 'Pending'   },
  { id: '17', username: 'peter.olsen',     email: 'peter.olsen@nexus.io',     role: 'Worker',     status: 'Active'    },
  { id: '18', username: 'maria.santos',    email: 'maria.santos@nexus.io',    role: 'Manager',    status: 'Active'    },
  { id: '19', username: 'kevin.tan',       email: 'kevin.tan@nexus.io',       role: 'Worker',     status: 'Inactive'  },
  { id: '20', username: 'zara.ahmed',      email: 'zara.ahmed@nexus.io',      role: 'Worker',     status: 'Active'    },
];