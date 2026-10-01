export interface User {
  id?: string; 
  username: string; 
  email: string; 
  role: string; 
  status: string; 
}


export type Users = User[];

export interface Role {
  id?: string; 
  rolename: string; 
  description: string; 
  permissions: string[]; 
}
export type Roles = Role[];

export interface Permission {
  id?: string; 
  permissionname: string; 
  description: string; 
}

export type Permissions = Permission[];
