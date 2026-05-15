import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cva } from './cva';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, Cva],
  template: `
    Selected control: {{ $any(selectedControl).id }}
    @if(showControl) {
      <app-cva [formControl]="selectedControl" />
    }
    <button (click)="switchControl()"> Switch control</button><br>
    Control values: [{{ formControls[0].value }}, {{ formControls[1].value }}]
  `,
})
export class App implements OnInit {
  protected selectedControl!: FormControl<string | null>
  private selectedIndex = 0

  protected formControls = [
    new FormControl('1'),
    new FormControl('2')
  ]

  public ngOnInit(): void {
    this.selectedControl = this.formControls[this.selectedIndex]
    ;(this.formControls[0] as any).id = 1
    ;(this.formControls[1] as any).id = 2
  }

  constructor(
    private cd: ChangeDetectorRef,
  ) {}

  protected showControl = true

  protected switchControl() {
    this.showControl = false
    this.cd.detectChanges()
    this.selectedIndex = (this.selectedIndex + 1) % this.formControls.length
    this.selectedControl = this.formControls[this.selectedIndex]
    this.showControl = true
    this.cd.detectChanges()
  }
}
