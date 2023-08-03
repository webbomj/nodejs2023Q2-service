import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isUUID,
} from 'class-validator';
import { Injectable } from '@nestjs/common/decorators';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class isUUIDorNull implements ValidatorConstraintInterface {
  constructor() {}

  validate(value: string | null) {
    if (isUUID(value)) {
      return true;
    }

    if (value === null) {
      return true;
    }

    return false;
  }

  defaultMessage() {
    return `value must UUID or null`;
  }
}
