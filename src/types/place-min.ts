import { getField } from './validators';
import { default as JSON } from './JSON/place-min';
import { default as Interface } from './interfaces/place-min';
import DateTime from './date';

export default class MinimalPlace implements Interface {
  start: DateTime;

  end: DateTime;

  countryCode: string;

  constructor(data: Interface) {
    const start = getField(data.start, 'place.start');
    if (typeof start === 'string') {
      this.start = DateTime.fromISO(start as string);
    } else {
      this.start = start as DateTime;
    }

    const end = getField(data.end, 'place.end');
    if (typeof end === 'string') {
      this.end = DateTime.fromISO(end as string);
    } else {
      this.end = end as DateTime;
    }

    this.countryCode = getField(data.countryCode, 'place.countryCode');
  }

  static _fromJSON(data: JSON): Interface {
    return {
      start: getField(data.start, 'place.start'),
      end: getField(data.end, 'place.end'),
      countryCode: getField(data.country_code, 'place.country_code'),
    };
  }

  static fromJSON(data: JSON): MinimalPlace {
    return new MinimalPlace(MinimalPlace._fromJSON(data));
  }

  toJSON(): JSON {
    return {
      start: this.start.toISO({ includeOffset: true }),
      end: this.end.toISO({ includeOffset: true }),
      country_code: this.countryCode
    };
  }
}
