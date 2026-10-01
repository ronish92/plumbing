import type { Permission, Role, User, Users } from '@/models/users';

import { dummyUsers } from '@/app/data/users';
import { dummyPermissions } from '@/app/data/permission';
import { dummyRoles } from '@/app/data/roles';


let usersStore: Users = [...dummyUsers];
let rolesStore: Role[] = [...dummyRoles];
let permissionsStore: Permission[] = [...dummyPermissions];



export const getAllUsers = async (): Promise<Users> => {
  await new Promise((r) => setTimeout(r, 400));
  return usersStore;
};
// export const getAllUsers = async () => {
//   const response = await api.get('/users');
//   return response.data;
// };

export const getUserById = async (id: string): Promise<User> => {
  await new Promise((r) => setTimeout(r, 200));
  const user = usersStore.find((u) => u.id === id);
  if (!user) throw new Error('User not found');
  return user;
};
// export const getUserById = async (id: string) => {
//   const response = await api.get(`/users/${id}`);
//   return response.data;
// };

export const createUser = async (data: User): Promise<User> => {
  await new Promise((r) => setTimeout(r, 400));

  const newUser: User = { ...data };
  usersStore = [newUser, ...usersStore];
  return newUser;
};
// export const createUser = async (data: User) => {
//   const response = await api.post('/users', data);
//   return response.data;
// };

export const updateUserDetails = async (data: User): Promise<User> => {
  await new Promise((r) => setTimeout(r, 400));
  if (!data.id) throw new Error('User id is required for update');
  usersStore = usersStore.map((u) =>
    u.id === data.id ? { ...u, ...data } : u
  );
  return data;
};
// export const updateUserDetails = async (data: User) => {
//   const updatedData = { ...data, id: undefined };
//   const response = await api.put(`/users/${data.id}`, updatedData);
//   return response.data;
// };

export const deleteUser = async (id: string): Promise<void> => {
  await new Promise((r) => setTimeout(r, 300));
  usersStore = usersStore.filter((u) => u.id !== id);
};
// export const deleteUser = async (id: string) => {
//   const response = await api.delete(`/users/${id}`);
//   return response.data;
// };

// ---------------------------------------------------------------------------
// Roles API
// ---------------------------------------------------------------------------

export const getAllRoles = async (): Promise<Role[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return rolesStore;
};
// export const getAllRoles = async () => {
//   const response = await api.get('/roles');
//   return response.data;
// };

export const getRoleById = async (id: string): Promise<Role> => {
  await new Promise((r) => setTimeout(r, 200));
  const role = rolesStore.find((r) => r.id === id);
  if (!role) throw new Error('Role not found');
  return role;
};
// export const getRoleById = async (id: string) => {
//   const response = await api.get(`/roles/${id}`);
//   return response.data;
// };

export const createRole = async (data: Role): Promise<Role> => {
  await new Promise((r) => setTimeout(r, 400));
  const nextId = String(
    Math.max(0, ...rolesStore.map((r) => Number(r.id) || 0)) + 1
  );
  const newRole: Role = { ...data, id: nextId };
  rolesStore = [newRole, ...rolesStore];
  return newRole;
};
// export const createRole = async (data: Role) => {
//   const response = await api.post('/roles', data);
//   return response.data;
// };

export const updateRoleDetails = async (data: Role): Promise<Role> => {
  await new Promise((r) => setTimeout(r, 400));
  if (!data.id) throw new Error('Role id is required for update');
  rolesStore = rolesStore.map((r) =>
    r.id === data.id ? { ...r, ...data } : r
  );
  return data;
};
// export const updateRoleDetails = async (data: Role) => {
//   const updatedData = { ...data, id: undefined };
//   const response = await api.put(`/roles/${data.id}`, updatedData);
//   return response.data;
// };

export const deleteRole = async (id: string): Promise<void> => {
  await new Promise((r) => setTimeout(r, 300));
  rolesStore = rolesStore.filter((r) => r.id !== id);
};
// export const deleteRole = async (id: string) => {
//   const response = await api.delete(`/roles/${id}`);
//   return response.data;
// };

// ---------------------------------------------------------------------------
// Permissions API
// ---------------------------------------------------------------------------

export const getAllPermissions = async (): Promise<Permission[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return permissionsStore;
};
// export const getAllPermissions = async () => {
//   const response = await api.get('/permissions');
//   return response.data;
// };

export const getPermissionById = async (id: string): Promise<Permission> => {
  await new Promise((r) => setTimeout(r, 200));
  const permission = permissionsStore.find((p) => p.id === id);
  if (!permission) throw new Error('Permission not found');
  return permission;
};
// export const getPermissionById = async (id: string) => {
//   const response = await api.get(`/permissions/${id}`);
//   return response.data;
// };

export const createPermission = async (data: Permission): Promise<Permission> => {
  await new Promise((r) => setTimeout(r, 400));
  const nextId = String(
    Math.max(0, ...permissionsStore.map((p) => Number(p.id) || 0)) + 1
  );
  const newPermission: Permission = { ...data, id: nextId };
  permissionsStore = [newPermission, ...permissionsStore];
  return newPermission;
};
// export const createPermission = async (data: Permission) => {
//   const response = await api.post('/permissions', data);
//   return response.data;
// };

export const updatePermissionDetails = async (
  data: Permission
): Promise<Permission> => {
  await new Promise((r) => setTimeout(r, 400));
  if (!data.id) throw new Error('Permission id is required for update');
  permissionsStore = permissionsStore.map((p) =>
    p.id === data.id ? { ...p, ...data } : p
  );
  return data;
};
// export const updatePermissionDetails = async (data: Permission) => {
//   const updatedData = { ...data, id: undefined };
//   const response = await api.put(`/permissions/${data.id}`, updatedData);
//   return response.data;
// };

export const deletePermission = async (id: string): Promise<void> => {
  await new Promise((r) => setTimeout(r, 300));
  permissionsStore = permissionsStore.filter((p) => p.id !== id);
};
// export const deletePermission = async (id: string) => {
//   const response = await api.delete(`/permissions/${id}`);
//   return response.data;
// };