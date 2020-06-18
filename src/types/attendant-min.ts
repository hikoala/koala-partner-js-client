import AgeRange from './age-range';
import Interface from './interfaces/attendant-min';
import JSON from './JSON/attendant-min';

export default class MinimalAttendant implements Interface {
  ageRange: AgeRange;

  constructor(data: Interface) {
    if (data.ageRange === undefined) throw new Error('Unknown ageRange');
    this.ageRange = data.ageRange;
  }

  static _fromJSON(data: JSON): Interface {
    return {
      ageRange: AgeRange[data.age_range || 'Adult'],
    };
  }

  static fromJSON(data: JSON): MinimalAttendant {
    return new MinimalAttendant(MinimalAttendant._fromJSON(data));
  }

  toJSON(): JSON {
    return {
      age_range: this.ageRange,
    };
  }
}
