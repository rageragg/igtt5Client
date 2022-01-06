export interface UsersList {
  meta:  Meta;
  links: UserLinks;
  data:  UserPayload[];
}

export interface User {
  data: UserPayload;
}

export interface UserPayload {
  type:       string;
  id:         string;
  attributes: Attributes;
  links:      DatumLinks;
}

export interface Attributes {
  name:            string;
  email:           string;
  rol:             string;
  uuid:            string;
  valid:           string;
  apiToken:        string;
  password:        string;
  emailVerifiedAt: Date;
  createdAt:       Date;
  updatedAt:       Date;
  device_id?:      string;
}

export interface DatumLinks {
  self: string;
}

export interface UserLinks {
  first: string;
  next:  string;
  last:  string;
}

export interface Meta {
  page: Page;
}

export interface Page {
  "current-page": number;
  "per-page":     number;
  from:           number;
  to:             number;
  total:          number;
  "last-page":    number;
}

export interface userData {
  id:              string;
  name:            string;
  email:           string;
  rol:             string;
  uuid:            string;
  createdAt:       Date;
  updatedAt:       Date;
  valid:           string;
  apiToken:        string;
  password:        string;
  emailVerifiedAt: Date;
}
