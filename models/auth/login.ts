export type loginModel = {
  username: string;
  password: string;
  employeecode? : string
 
};

export type ForgotPasswordModel = {
  email: string;
};

export type ResetPasswordModel = {
  userId: string;
  code: string;
  password: string;
  cpassword: string;
};

export type ChangePasswordModel = {
  email: string;
  oldPassword: string;
  newPassword: string;
 
};


