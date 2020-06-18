import QuotedFlight from './quoted-flight';
import Policy from './policy';
import { getField } from './validators';
import BookingJSON from './JSON/booking';
import BookingInterface from './interfaces/booking';
import MinimalAttendant from './attendant-min';

interface JSON extends BookingJSON {
  policy: any;
}

interface Interface extends BookingInterface<QuotedFlight, MinimalAttendant> {
  policy: Policy;
}

export default class QuotedBooking implements Interface {
  flights: QuotedFlight[];

  attendants: MinimalAttendant[];

  price: number;

  currencyCode = 'EUR';

  policy: Policy;

  constructor(data: Interface) {
    this.flights = getField(data.flights, 'booking.flights');
    this.price = getField(data.price, 'booking.price');
    this.policy = getField(data.policy, 'booking.policy');
    this.attendants = getField(data.attendants, 'booking.attendants');
    this.currencyCode = data.currencyCode || 'EUR';
  }

  static fromJSON(data: JSON): QuotedBooking {
    return new QuotedBooking({
      price: getField(data.price, 'booking.price'),
      policy: new Policy(getField(data.policy, 'booking.policy')),
      flights: getField(data.flights, 'booking.flights').map(
        QuotedFlight.fromJSON,
      ),
      currencyCode: data.currency_code || 'EUR',
      attendants: getField(data.attendants, 'booking.attendants').map(
        MinimalAttendant.fromJSON,
      ),
    });
  }

  toJSON(): JSON {
    return {
      flights: this.flights.map((f: QuotedFlight) => f.toJSON()),
      policy: this.policy.toJSON(),
      price: this.price,
      attendants: this.attendants.map((a: MinimalAttendant) => a.toJSON()),
      currency_code: this.currencyCode,
    };
  }
}
