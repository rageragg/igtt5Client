export interface ListConfiguration {
    data: Datum[];
}

export interface ConfigurationItem {
  data: Datum;
}

export interface Datum {
    type:       string;
    id:         string;
    attributes: Attributes;
    links:      Links;
}

export interface Attributes {
    localCurrencyCo:               string;
    foreignCurrencyCo:             string;
    lastForeignCurrencyQuoteValue: number;
    lastForeignCurrencyQuoteDate:  Date;
    countryCo:                     string;
    company_description:           string;
    company_address:               string;
    company_telephone_co:          string;
    company_email:                 string;
    company_fiscal_document_co:    string;
    days_per_year:                 number;
    weeks_per_year:                number;
    months_per_year:               number;
    days_per_month:                number;
    days_per_week:                 number;
    hours_per_day:                 number;
    createdAt:                     Date;
    updatedAt:                     Date;
}

export interface Links {
    self: string;
}



