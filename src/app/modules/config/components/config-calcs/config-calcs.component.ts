import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-calcs',
  templateUrl: './config-calcs.component.html',
  styleUrls: ['./config-calcs.component.css']
})
export class ConfigCalcsComponent implements OnInit {

  @Input() daysPerYear: number = 0;
  @Input() weeksPerYear: number = 0;
  @Input() monthsPerYear: number = 0;

  @Input() daysPerMonths: number = 0;
  @Input() daysPerWeeks: number = 0;
  @Input() hoursPerDay: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  get hoursPerYear(): number {
    return this.daysPerYear * this.hoursPerDay;
  }

  get hoursPerMonth(): number {
    return this.daysPerMonths * this.hoursPerDay;
  }

  get hoursPerWeek(): number {
    return this.daysPerWeeks * this.hoursPerDay;
  }

}
