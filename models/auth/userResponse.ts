


export enum UserRole {
  
  Admin = "Admin",
  Worker ="Worker",
  SuperAdmin = "SuperAdmin"
}

export interface userResponseModel {
  name?: string;
  token?: string;
  notBefore?: string;
  expiration?: string;
  role?: UserRole;
  userId?: number | null;
  refreshToken?: string;
  refreshTokenExpiration?: string;
  expiresAt?: string;
  companyId?: number;
  companyName?: string | null;
  companyRole?: string | null;
}