export interface IResponseUser {
  authentication_token: string;
  id: string;
  phone_number: string;
  password_changed: boolean;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  roles: string;
}
