import { default as JSON } from './JSON/attendant';
import { default as Interface } from './interfaces/attendant';
import { getField } from './validators';
import AgeRange from './age-range';

export default class Attendant implements Interface {
  firstName: string;
  lastName: string;
  ageRange?: AgeRange;

  constructor(data: Interface) {
    this.firstName = getField(data.firstName, 'attendant.firstName');
    this.lastName = getField(data.lastName, 'attendant.lastName');
    this.ageRange = data.ageRange;
  }

  static fromJSON(data: JSON): Attendant {
    return new Attendant({
      ageRange: AgeRange[data.age_range || 'Adult'],
      firstName: getField(data.first_name, 'data.firstName'),
      lastName: getField(data.last_name, 'data.lastName'),
    });
  }

  toJSON(): JSON {
    return {
      age_range: this.ageRange,
      last_name: this.lastName,
      first_name: this.firstName,
    };
  }
}
