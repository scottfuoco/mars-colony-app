import { ValidatorFn, AbstractControl } from '@angular/forms';

export const cantBe = (value: string): ValidatorFn => {
    return (control: AbstractControl): {[key: string]: any } =>{
      return control.value === value ? {'Cant be none': { value }} : null;
    }
  }