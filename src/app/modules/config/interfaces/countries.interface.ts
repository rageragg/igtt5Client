export interface CountriesList {
    data: Datum[];
}

export interface Datum {
    type:          string;
    id:            string;
    attributes:    Attributes;
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
