import DateTime from './date';
import { getField, isDate } from './validators';
import Interface from './interfaces/leg-min';
import JSON from './JSON/leg-min';

/**
 * The minimal representation of a flight for a quote.
 */
export default class MinimalLeg implements Interface {
  // The date of the departure.
  departureDate: DateTime;
  // The IATA of the departure airport.
  departureAirportIATA: string;
  // The IATA of the arrival airport.
  arrivalAirportIATA: string;

  constructor(data: Interface) {
    const departureDate = getField(data.departureDate, 'leg.departureDate');
    if (typeof departureDate === 'string') {
      this.departureDate = DateTime.fromISO(departureDate as string);
    } else {
      this.departureDate = departureDate as DateTime;
    }
    if (!isDate(this.departureDate)) throw new Error('Invalid date');

    this.departureAirportIATA = getField(
      data.departureAirportIATA,
      'leg.departureAirportIATA',
    );
    this.arrivalAirportIATA = getField(
      data.arrivalAirportIATA,
      'leg.arrivalAirportIATA',
    );
  }

  static _fromJSON(data: JSON): Interface {
    return {
      departureDate: DateTime.fromISO(
        getField(data.departure_date, 'leg.departure_date'),
      ),
      departureAirportIATA: getField(
        data.departure_airport_iata,
        'leg.departure_airport_iata',
      ),
      arrivalAirportIATA: getField(
        data.arrival_airport_iata,
        'leg.arrival_airport_iata',
      ),
    };
  }

  static fromJSON(data: JSON): MinimalLeg {
    return new MinimalLeg(MinimalLeg._fromJSON(data));
  }

  toJSON(): JSON {
    return {
      departure_date: this.departureDate.toISO({ includeOffset: true }),
      departure_airport_iata: this.departureAirportIATA,
      arrival_airport_iata: this.arrivalAirportIATA,
    };
  }
}
