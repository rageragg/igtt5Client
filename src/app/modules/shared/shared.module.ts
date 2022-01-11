import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatNumberDirective } from './directives/format-number.directive';



@NgModule({
  declarations: [
    FormatNumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatNumberDirective
  ]
})
export class SharedModule { }
