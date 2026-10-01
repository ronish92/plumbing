import type { Roles } from '@/models/users';

export const dummyRoles: Roles = [
  {
    id: '1',
    rolename: 'SuperAdmin',
    description: 'Full unrestricted access to the entire platform.',
    permissions: ['user.create', 'user.read', 'user.update', 'user.delete', 'role.manage', 'billing.manage', 'settings.manage'],
  },
  {
    id: '2',
    rolename: 'Admin',
    description: 'Manages users, roles, and day-to-day operations.',
    permissions: ['user.create', 'user.read', 'user.update', 'role.read', 'report.view'],
  },
  {
    id: '3',
    rolename: 'Manager',
    description: 'Oversees workers and reviews reports.',
    permissions: ['user.read', 'user.update', 'report.view', 'report.export'],
  },
  {
    id: '4',
    rolename: 'Worker',
    description: 'Standard access for field and service workers.',
    permissions: ['task.view', 'task.update', 'report.create'],
  },
  {
    id: '5',
    rolename: 'Viewer',
    description: 'Read-only access to reports and dashboards.',
    permissions: ['report.view', 'dashboard.view'],
  },
];