export interface IUser {
  id: number;
  name: string;
  email: string;
  valid?: string;
  rol?: string;
  api_token?: string;
  device_id?: string;
}
