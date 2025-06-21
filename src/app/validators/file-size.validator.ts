// src/app/validators/file-size.validator.ts
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    if (!file) {
      return null;
    }
    if (file && file.size > maxSize) {
      return { fileSize: true };
    }
    return null;
  };
}
