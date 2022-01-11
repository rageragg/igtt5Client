export interface CountriesList {
    data: Datum[];
}

export interface CountryItem {
  data: Datum;
}


export interface Datum {
    type:          string;
    id:            string;
    attributes:    Attributes;
    relationships: Relationships;
    links:         DatumLinks;
}

export interface Attributes {
    countryCo:   string;
    description: string;
    pathImage:   string;
    telephoneCo: string;
    slug:        string;
    userId:      number;
    uuid:        string;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface DatumLinks {
    self: string;
}

export interface Relationships {
    user: User;
}

export interface User {
    data:  Data;
    links: UserLinks;
}

export interface Data {
    type: DataType;
    id:   string;
}

export enum DataType {
    Users = "users",
}

export interface UserLinks {
    self:    string;
    related: string;
}
