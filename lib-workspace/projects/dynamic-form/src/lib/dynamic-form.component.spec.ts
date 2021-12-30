import { ComponentFixture } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { FormBuilder } from '@angular/forms';

const definition = {
  controls: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First name:',
      value: '',
      validators: {
        required: true,
        minLength: 5,
      },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last name:',
      value: '',
      validators: {
        required: true,
        minLength: 5,
      },
    },
    {
      name: 'languages',
      type: 'select',
      label: 'Language',
      value: 'Python',
      options: ['Python', 'C#', 'Angular', 'React'],
      validators: {
        required: true,
      },
    },
    {
      name: 'companies',
      type: 'list',
      label: 'Choose some comapanies',
      value: '',
      options: ['Google', 'Amazon', 'PayPal'],
      validators: {},
    },
  ],
};

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(() => {
    component = new DynamicFormComponent(new FormBuilder());
  });

  it('should call createForm function ', function () {
    spyOn(component, 'createForm');
    component.createForm(undefined);
    expect(component.createForm).toHaveBeenCalled();
  });

  it('should call validateForm function ', function () {
    spyOn(component, 'validateForm');
    component.validateForm([], []);
    expect(component.validateForm).toHaveBeenCalled();
  });

  it('should create an input of type text', function () {
    const compo = new DynamicFormComponent(new FormBuilder());
    compo.definition = definition;
    spyOn(component, 'createForm');
    compo.createForm(compo.definition.controls);
    const inputText = compo.definition.controls.filter((control: { type: string }) => control.type == 'text');
    expect(inputText).not.toBeUndefined();
  });

  it('should create an input of type select', function () {
    const compo = new DynamicFormComponent(new FormBuilder());
    compo.definition = definition;
    spyOn(component, 'createForm');
    compo.createForm(compo.definition.controls);
    const inputText = compo.definition.controls.filter((control: { type: string }) => control.type == 'select');
    expect(inputText).not.toBeUndefined();
  });

  it('should create an input of type list', function () {
    const compo = new DynamicFormComponent(new FormBuilder());
    compo.definition = definition;
    spyOn(component, 'createForm');
    compo.createForm(compo.definition.controls);
    const inputText = compo.definition.controls.filter((control: { type: string }) => control.type == 'list');
    expect(inputText).not.toBeUndefined();
  });

  it('should validate the property name of the inputs', function () {
    const compo = new DynamicFormComponent(new FormBuilder());
    compo.definition = definition;
    spyOn(component, 'createForm');
    compo.createForm(compo.definition.controls);
    const inputsNames = compo.definition.controls.map((control: { name: string }) => control.name);
    expect(inputsNames.includes('firstName', 'lastName', 'languages', 'companies')).toBeTruthy();
  });

  it('should return false when form is invalid', function () {
    const compo = new DynamicFormComponent(new FormBuilder());
    compo.definition = definition;
    spyOn(component, 'createForm');
    compo.createForm(compo.definition.controls);
    expect(compo.myForm.valid).toBe(false);
  });

  it('should return true when form is valid', function () {
    const compo = new DynamicFormComponent(new FormBuilder());
    compo.definition = {
      controls: [
        {
          name: 'validationTest',
          type: 'text',
          label: "That's a length validation",
          value: 'String with the minimum required length',
          validators: {
            required: true,
            minLength: 5,
          },
        },
      ],
    };
    spyOn(component, 'createForm');
    compo.createForm(compo.definition.controls);
    expect(compo.myForm.valid).toBe(true);
  });
});
