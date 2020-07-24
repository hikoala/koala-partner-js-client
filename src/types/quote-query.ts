import MinimalFlight from './flight-min';
import MinimalPlace from './place-min';
import { getField } from './validators';
import MinimalAttendant from './attendant-min';
import JSON from './JSON/booking';
import BookingInterface from './interfaces/booking';

type Interface = BookingInterface<MinimalFlight, MinimalAttendant, MinimalPlace>;

/**
 * Query to get a quote.
 */
export default class QuoteQuery implements Interface {
  flights: MinimalFlight[];

  places: MinimalPlace[];

  attendants: MinimalAttendant[];

  number: string;

  currencyCode: string;

  price: number;

  constructor(data: Interface) {
    this.flights = getField(data.flights, 'booking.flights');
    this.places = getField(data.places, 'booking.places');
    this.price = getField(data.price, 'booking.price');
    this.attendants = getField(data.attendants, 'booking.attendants');
    this.currencyCode = getField(data.currencyCode, 'booking.currencyCode');
  }

  static fromJSON(data: JSON): QuoteQuery {
    return new QuoteQuery({
      price: getField(data.price, 'booking.price'),
      currencyCode: getField(data.currency_code, 'booking.currency_code'),
      flights: getField(data.flights, 'booking.flights').map(
        MinimalFlight.fromJSON,
      ),
      places: getField(data.places, 'booking.places').map(
        MinimalPlace.fromJSON,
      ),
      attendants: getField(data.attendants, 'bookings.attendants').map(
        MinimalAttendant.fromJSON,
      ),
    });
  }
}
