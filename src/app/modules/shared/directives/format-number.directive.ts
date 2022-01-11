import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appFormatNumber]'
})
export class FormatNumberDirective {

  private _value: number = 0.00;

  constructor( private elementRef: ElementRef<HTMLInputElement> ) {
    console.log('Constructor directiva FormatNumberDirective');
  }

  get value(): number {
    return this._value;
  }

}
