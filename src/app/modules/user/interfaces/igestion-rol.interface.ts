export interface GestionRolAdministrator {
    data: DataAdministrator;
}

export interface DataAdministrator {
    type:     string;
    contents: ContentAdministrator[];
}

export interface ContentAdministrator {
    valid:               string;
    id:                  number;
    rol:                 string;
    name:                string;
    cant_countries:      number;
    cant_regions:        number;
    cant_provinces:      number;
    cant_municipalities: number;
    cant_cities:         number;
    cant_locations:      number;
    cant_shops:          number;
    cant_customers:      number;
    cant_subsidiaries:   number;
}

export interface GestionRolLogistic {
  data: DataLogistic;
}

export interface DataLogistic {
  type:     string;
  contents: ContentLogistic[];
}

export interface ContentLogistic {
  valid:                string;
  id:                   number;
  rol:                  string;
  name:                 string;
  cant_locations:       number;
  cant_shops:           number;
  cant_customers:       number;
  cant_subsidiaries:    number;
  cant_routes:          number;
  cant_route_locations: number;
  cant_tolls:           number;
  cant_trailers:        number;
  cant_trucks:          number;
}

