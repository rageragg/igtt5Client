import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { ConfigService } from '../../services/config.service';
import { ConfigurationItem, Datum } from '../../interfaces/confurations.interface';
import { CountriesList } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  dataConfig!: ConfigurationItem;
  dataCountries!: CountriesList;
  dataCurrencies: string[] = [];
  myFormConfigEdit!: FormGroup;
  loading: boolean = true;
  messageProgress: string = '';

  constructor( private fb: FormBuilder,
               private configService: ConfigService
             ) {

    this.loading = true;
    this.messageProgress = 'Cargando datos...!';
    // lista de paises
    this.configService
      .getListCountries()
      .pipe(
        map( resp => {
          console.log(resp);
          return resp
        })
      )
      .subscribe( resp => {
        this.dataCountries = resp;
      });
      // monedas
    this.configService
      .getListCurrencies()
      .pipe(
        map( resp => {
          console.log(resp);
          return resp
        })
      )
      .subscribe( resp => {
        this.dataCurrencies = resp;
      });

    this.myFormConfigEdit = this.fb.group({
      company_address: [ '', [ Validators.required ] ],
      company_description: [  '', [ Validators.required] ],
      company_email: [ '', [ Validators.required, Validators.email ] ],
      company_fiscal_document_co: [ '', [ Validators.required ] ],
      company_telephone_co: [ '', [ Validators.required ] ],
      countryCo: [ '', [ Validators.required ] ],
      localCurrencyCo: [ '', [ Validators.required ] ],
      foreignCurrencyCo: [ '', [ Validators.required ] ],
      lastForeignCurrencyQuoteValue:  [ 0.00, [ Validators.required, Validators.min(0) ] ],
      days_per_year:  [ 0, [ Validators.required, Validators.min(1), Validators.max(365)] ],
      weeks_per_year: [ 0, [ Validators.required, Validators.min(1), Validators.max(52)] ],
      months_per_year:  [ 0, [ Validators.required, Validators.min(1), Validators.max(12)] ],
      days_per_month: [ 0, [ Validators.required, Validators.min(1), Validators.max(31)] ],
      days_per_week: [ 0, [ Validators.required, Validators.min(1), Validators.max(7)] ],
      hours_per_day: [ 0, [ Validators.required, Validators.min(1), Validators.max(24)] ]
    });

  }

  ngOnInit(): void {

    this.configService
        .getConfig()
        .pipe(
          map( resp => {
            return resp
          })
        )
        .subscribe( resp => {
          this.dataConfig = resp;
          this.myFormConfigEdit.get('company_address')!.setValue(this.dataConfig.data.attributes.company_address);
          this.myFormConfigEdit.get('company_description')!.setValue(this.dataConfig.data.attributes.company_description);
          this.myFormConfigEdit.get('company_email')!.setValue(this.dataConfig.data.attributes.company_email);
          this.myFormConfigEdit.get('company_fiscal_document_co')!.setValue(this.dataConfig.data.attributes.company_fiscal_document_co);
          this.myFormConfigEdit.get('company_telephone_co')!.setValue(this.dataConfig.data.attributes.company_telephone_co);
          this.myFormConfigEdit.get('countryCo')!.setValue(this.dataConfig.data.attributes.countryCo);
          this.myFormConfigEdit.get('localCurrencyCo')!.setValue(this.dataConfig.data.attributes.localCurrencyCo);
          this.myFormConfigEdit.get('foreignCurrencyCo')!.setValue(this.dataConfig.data.attributes.foreignCurrencyCo);
          this.myFormConfigEdit.get('lastForeignCurrencyQuoteValue')!.setValue(this.dataConfig.data.attributes.lastForeignCurrencyQuoteValue);
          this.myFormConfigEdit.get('days_per_year')!.setValue(this.dataConfig.data.attributes.days_per_year);
          this.myFormConfigEdit.get('weeks_per_year')!.setValue(this.dataConfig.data.attributes.weeks_per_year);
          this.myFormConfigEdit.get('months_per_year')!.setValue(this.dataConfig.data.attributes.months_per_year);
          this.myFormConfigEdit.get('days_per_month')!.setValue(this.dataConfig.data.attributes.days_per_month);
          this.myFormConfigEdit.get('days_per_week')!.setValue(this.dataConfig.data.attributes.days_per_week);
          this.myFormConfigEdit.get('hours_per_day')!.setValue(this.dataConfig.data.attributes.hours_per_day);
          this.loading = false;
          this.messageProgress = '';
        });

  }

  editConfig() {


    this.loading = true;
    this.messageProgress = 'Actualizando...!';
    const { company_address, company_description, company_email, company_fiscal_document_co,
            company_telephone_co, countryCo, localCurrencyCo, foreignCurrencyCo, lastForeignCurrencyQuoteValue,
            days_per_year, weeks_per_year, months_per_year, days_per_month, days_per_week, hours_per_day
          } = this.myFormConfigEdit.value;

    this.dataConfig.data.attributes = {
      localCurrencyCo:               localCurrencyCo,
      foreignCurrencyCo:             foreignCurrencyCo,
      lastForeignCurrencyQuoteValue: lastForeignCurrencyQuoteValue,
      countryCo:                     countryCo,
      company_description:           company_description,
      company_address:               company_address,
      company_telephone_co:          company_telephone_co,
      company_email:                 company_email,
      company_fiscal_document_co:    company_fiscal_document_co,
      days_per_year:                 days_per_year,
      weeks_per_year:                weeks_per_year,
      months_per_year:               months_per_year,
      days_per_month:                days_per_month,
      days_per_week:                 days_per_week,
      hours_per_day:                 hours_per_day,
      lastForeignCurrencyQuoteDate:  this.dataConfig.data.attributes.lastForeignCurrencyQuoteDate,
      createdAt:                     this.dataConfig.data.attributes.createdAt,
      updatedAt:                     this.dataConfig.data.attributes.updatedAt
    }

    console.log(this.dataConfig);

    this.configService.edit( this.dataConfig )
    .subscribe( resp => {
      this.loading = false;
      this.messageProgress = '';
      if( resp === 'OK' ) {
        Swal.fire( 'Informacion', 'Se ha actualizado con exito!', 'info' );
      } else {
        Swal.fire( 'Error', resp, 'error' );
      }
    });

  }

}
