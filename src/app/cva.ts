import { Component } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cva',
  imports: [ReactiveFormsModule],
  template: '<input type="text" [formControl]="innerCtl">',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: Cva,
    multi: true
  }]
})
export class Cva implements ControlValueAccessor {
  protected innerCtl = new FormControl<string>('')

  writeValue(obj: string): void {
    this.innerCtl.setValue(obj)
  }
  registerOnChange(fn: any): void {
    this.innerCtl.valueChanges.subscribe(fn)
  }

  onTouched = () => {}
  registerOnTouched(fn: any): void {
    const oldOnTouched = this.onTouched
    this.onTouched = () => {
      oldOnTouched()
      fn()
    }
  }
}
