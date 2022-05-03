import { AbstractControl } from '@angular/forms';
import { map } from "rxjs/operators";
import { UserServiceService } from '../service/user-service.service';
  
export class ValidateUsernameNotTaken {
  static createValidator(userService: UserServiceService) {
    return (control: AbstractControl) => {
      console.log('control: '); console.log(control);
      return userService.isUsernameExist(control.value).pipe(map(res => { console.log('res: ');console.log(res);
        return !res.body ? null : { usernameTaken: true };
      }));
    };
  }
}