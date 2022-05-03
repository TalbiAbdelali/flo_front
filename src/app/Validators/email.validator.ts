import { AbstractControl } from '@angular/forms';
import { map } from "rxjs/operators";
import { AuthServiceService } from '../service/auth-service.service';
  
export class ValidateEmailNotTaken {
  static createValidator(signupService: AuthServiceService) {
    return (control: AbstractControl) => {
      console.log('control: '); console.log(control);
      return signupService.isEmaiIDExist(control.value).pipe(map(res => { console.log('res: ');console.log(res);
        return !res.body ? null : { emailTaken: true };
      }));
    };
  }
}