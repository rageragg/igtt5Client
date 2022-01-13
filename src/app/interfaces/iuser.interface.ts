export interface IApiJListUser {
  data: IApiJData[];
}

export interface IApiJDataUser {
  data: IApiJData;
}

export interface IApiJData {
  type:       string;
  id?:        string;
  attributes: IUser;
  links?:     Links;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  valid?: string;
  rol?: string;
  uuid?: string;
  apiToken?: string;
  password?: string;
  device_id?: string;
  emailVerifiedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

}

export interface Links {
  self: string;
}
