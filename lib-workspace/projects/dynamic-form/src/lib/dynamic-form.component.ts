import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions[];
  required: boolean;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'lib-dynamic-form',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <ng-container *ngFor="let control of definition?.controls">
        <mat-form-field
          *ngIf="['text', 'password', 'email', 'number', 'search', 'tel', 'url'].includes(control.type)"
          class="col-12"
        >
          <input [formControlName]="control.name" matInput placeholder="{{ control.label }}" /> </mat-form-field
        ><br />

        <mat-form-field *ngIf="control.type === 'select'" appearance="fill">
          <mat-label>Favorite language</mat-label>
          <mat-select [formControlName]="control.name">
            <mat-option *ngFor="let opt of control.options" [value]="opt">
              {{ opt }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-selection-list *ngIf="control.type === 'list'" [formControlName]="control.name">
          <mat-list-option *ngFor="let opt of control.options" [value]="opt">
            {{ opt }}
          </mat-list-option>
        </mat-selection-list>
      </ng-container>

      <button mat-raised-button>Submit</button>
    </form>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnChanges {
  @Input() definition: JsonFormData | undefined | any;
  @Output() onFormSubmit: EventEmitter<FormGroup> = new EventEmitter()
  constructor(private formBuilder: FormBuilder) {}
  public myForm: FormGroup = this.formBuilder.group({});

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['definition'].firstChange) {
      console.log(this.definition?.controls);
      this.createForm(this.definition?.controls);
    }
  }

  validateForm(entries: any, validatorsToAdd: Validators[]) {
    for (const [key, value] of entries) {
      switch (key) {
        case 'required':
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
          break;
        case 'email':
          if (value) {
            validatorsToAdd.push(Validators.email);
          }
          break;
        case 'minLength':
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case 'maxLength':
          validatorsToAdd.push(Validators.maxLength(value));
          break;
        case 'pattern':
          validatorsToAdd.push(Validators.pattern(value));
          break;
        default:
          break;
      }
    }
  }

  createForm(controls: JsonFormControls[] | undefined) {
    const validatorsToAdd: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null | undefined = [];

    if (controls != undefined) {
      for (const control of controls) {
        const entries = Object.entries(control.validators);
        this.validateForm(entries, validatorsToAdd);
        this.myForm.addControl(control.name, this.formBuilder.control(control.value, validatorsToAdd));
      }
    }
  }

  onSubmit() {
    this.onFormSubmit.emit(this.myForm);
  }
}
