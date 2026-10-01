import type { Permissions } from '@/models/users';

export const dummyPermissions: Permissions = [
  { id: '1',  permissionname: 'user.create',      description: 'Create new users' },
  { id: '2',  permissionname: 'user.read',        description: 'View user details' },
  { id: '3',  permissionname: 'user.update',      description: 'Edit existing users' },
  { id: '4',  permissionname: 'user.delete',      description: 'Remove users from the system' },
  { id: '5',  permissionname: 'role.manage',      description: 'Create, edit, and delete roles' },
  { id: '6',  permissionname: 'role.read',        description: 'View roles and their permissions' },
  { id: '7',  permissionname: 'billing.manage',   description: 'Manage billing and subscriptions' },
  { id: '8',  permissionname: 'settings.manage',  description: 'Change platform-wide settings' },
  { id: '9',  permissionname: 'report.view',      description: 'View reports' },
  { id: '10', permissionname: 'report.create',    description: 'Create new reports' },
  { id: '11', permissionname: 'report.export',    description: 'Export reports to CSV/PDF' },
  { id: '12', permissionname: 'task.view',        description: 'View assigned tasks' },
  { id: '13', permissionname: 'task.update',      description: 'Update task status and details' },
  { id: '14', permissionname: 'dashboard.view',   description: 'Access the main dashboard' },
];