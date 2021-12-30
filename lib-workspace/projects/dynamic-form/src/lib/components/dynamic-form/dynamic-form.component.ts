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
import { JsonFormControls, JsonFormData } from "../../models/dynamic-form.model";

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less'],
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
