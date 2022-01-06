import { Component, OnInit } from '@angular/core';

import { GestionRolAdministrator, GestionRolLogistic } from '../../interfaces/igestion-rol.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public cantUsers: number = 4;
  public dataGestionAdministrator!: GestionRolAdministrator;
  public dataGestionLogistic!: GestionRolLogistic;

  constructor() {

    this.dataGestionAdministrator = {
      data: {
          type: 'users',
          contents: [
              {
                  valid: 'Y',
                  id: 1,
                  rol: 'ADMINISTRATOR',
                  name: 'Ronald Guerra',
                  cant_countries: 13,
                  cant_regions: 5,
                  cant_provinces: 24,
                  cant_municipalities: 210,
                  cant_cities: 31,
                  cant_locations: 31,
                  cant_shops: 6,
                  cant_customers: 15,
                  cant_subsidiaries: 1
              }
          ]
      }
    }

    this.dataGestionLogistic = {
      "data": {
          "type": "users",
          "contents": [
              {
                  "valid": "Y",
                  "id": 70,
                  "rol": "LOGISTIC",
                  "name": "Eliese Escobar",
                  "cant_locations": 0,
                  "cant_shops": 0,
                  "cant_customers": 0,
                  "cant_subsidiaries": 0,
                  "cant_routes": 17,
                  "cant_route_locations": 2,
                  "cant_tolls": 3,
                  "cant_trailers": 0,
                  "cant_trucks": 0
              }
          ]
      }
    }
  }

  ngOnInit(): void {
  }

}

