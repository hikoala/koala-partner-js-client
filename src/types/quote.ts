import { getField } from './validators';
import QuotedBooking from './quoted-booking';
import DateTime from './date';
import { isDate } from './validators';

interface JSON {
  valid: boolean;

  details?: any;

  price?: { [key: string]: number };

  hash?: string;

  name: string;

  date: string;

  id: string;
}

interface Interface {
  valid: boolean;

  name: string;

  date: DateTime;

  id: string;

  booking?: QuotedBooking;

  price?: { [key: string]: number };

  hash?: string;
}

export default class Quote implements Interface {
  _valid: boolean;

  _name: string;

  _date: DateTime;

  _id: string;

  _booking?: QuotedBooking;

  _price?: { [key: string]: number };

  _hash?: string;

  constructor(data: Interface) {
    this._valid = getField(data.valid, 'quote.valid');
    this._name = getField(data.name, 'quote.name');
    this._id = getField(data.id, 'quote.id');
    this._date = getField(data.date, 'quote.date');
    if (!isDate(this._date)) {
      throw new Error('Invalid date');
    }
    this._booking = this._valid
      ? getField(data.booking, 'quote.booking')
      : data.booking;
    this._price = this._valid
      ? getField(data.price, 'quote.price')
      : data.price;
    this._hash = this._valid ? getField(data.hash, 'quote.hash') : data.hash;
  }

  get valid(): boolean {
    return this._valid;
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }

  get date(): DateTime {
    return this._date;
  }

  get booking(): QuotedBooking {
    return this._booking;
  }

  get price(): { [key: string]: number } {
    return this._price;
  }

  get hash(): string {
    return this._hash;
  }

  static fromJSON(data: JSON): Quote {
    return new Quote({
      valid: getField(data.valid, 'quote.valid'),
      name: getField(data.name, 'quote.name'),
      id: getField(data.id, 'quote.id'),
      date: DateTime.fromISO(getField(data.date, 'quote.date')),
      booking: data.valid
        ? QuotedBooking.fromJSON(getField(data.details, 'quote.details'))
        : undefined,
      price: data.valid ? getField(data.price, 'quote.price') : undefined,
      hash: data.valid ? getField(data.hash, 'quote.hash') : undefined,
    });
  }

  toJSON(): JSON {
    const base = {
      valid: this.valid,
      name: this.name,
      id: this.id,
      date: this.date.toUTC().toString(),
    };
    if (!this.valid) return base;
    return {
      ...base,
      details: this.booking.toJSON(),
      price: this.price,
      hash: this.hash,
    };
  }
}
