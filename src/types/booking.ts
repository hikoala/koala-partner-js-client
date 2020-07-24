import Flight from './flight';
import Place from './place';
import { getField } from './validators';
import BookingInterface from './interfaces/booking';
import BookingJSON from './JSON/booking';
import Attendant from './attendant';

interface Interface extends BookingInterface<Flight, Attendant, Place> {
  number: string;
}

interface JSON extends BookingJSON {
  number: string;
}

export default class Booking implements Interface {
  flights: Flight[];

  attendants: Attendant[];

  places: Place[];

  number: string;

  price: number;

  currencyCode = 'EUR';

  constructor(data: Interface) {
    this.flights = getField(data.flights, 'booking.flights');
    this.places = getField(data.places, 'booking.places');
    this.number = getField(data.number, 'booking.number');
    this.price = getField(data.price, 'booking.price');
    this.currencyCode = data.currencyCode ?? 'EUR';
    this.attendants = getField(data.attendants, 'booking.attendants');
  }

  static fromJSON(data: JSON): Booking {
    return new Booking({
      number: getField(data.number, 'booking.number'),
      price: getField(data.price, 'booking.price'),
      flights: getField(data.flights, 'booking.flights').map(Flight.fromJSON),
      places: getField(data.places, 'booking.places').map(Place.fromJSON),
      attendants: getField(data.attendants, 'booking.attendants').map(
        Attendant.fromJSON,
      ),
      currencyCode: data.currency_code ?? 'EUR',
    });
  }

  toJSON(): JSON {
    return {
      number: this.number,
      price: this.price,
      currency_code: this.currencyCode,
      attendants: this.attendants.map((a: Attendant) => a.toJSON()),
      flights: this.flights.map((f: Flight) => f.toJSON()),
      places: this.places.map((p: Place) => p.toJSON()),
    };
  }
}
