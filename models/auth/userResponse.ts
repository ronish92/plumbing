


export enum UserRole {
  
  Admin = "Admin",
  Worker ="Worker"
}

export interface userResponseModel {
  name?: string;
  email?: string;
  roles?: UserRole[];  
  token?: string;
  tenant?: string;
  refreshToken?: string;
  expiration?: string;
}