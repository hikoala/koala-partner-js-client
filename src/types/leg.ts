import MinimalLeg from './leg-min';
import { default as MinimalJSON } from './JSON/leg-min';
import { default as MinimalInterface } from './interfaces/leg-min';

import DateTime from './date';
import { getField, isDate } from './validators';

interface SelfInterface {
  arrivalDate: DateTime;

  airlineIATA: string;

  flightNumber: string;
}

interface Interface extends MinimalInterface, SelfInterface {}

interface JSON extends MinimalJSON {
  arrival_date: string;

  airline_iata: string;

  flight_number: string;
}

export default class Leg extends MinimalLeg implements Interface {
  arrivalDate: DateTime;

  airlineIATA: string;

  flightNumber: string;

  constructor(data: Interface) {
    super(data);
    this.arrivalDate = getField(data.arrivalDate, 'leg.arrivalDate');
    if (!isDate(this.arrivalDate)) throw new Error('Invalid date');
    this.airlineIATA = getField(data.airlineIATA, 'leg.airlineIATA');
    this.flightNumber = getField(data.flightNumber, 'leg.flightNumber');
  }

  static extendMinimal(base: MinimalInterface, data: SelfInterface): Leg {
    return new Leg({
      ...base,
      ...data,
    });
  }

  static fromJSON(data: JSON): Leg {
    return new Leg({
      ...MinimalLeg._fromJSON(data as MinimalJSON),
      arrivalDate: DateTime.fromISO(
        getField(data.arrival_date, 'leg.arrival_date'),
        {
          setZone: true,
        },
      ),
      airlineIATA: getField(data.airline_iata, 'leg.airline_iata'),
      flightNumber: getField(data.flight_number, 'leg.flight_number'),
    });
  }

  toJSON(): JSON {
    return {
      ...super.toJSON(),
      arrival_date: this.arrivalDate.toISO({ includeOffset: true }),
      airline_iata: this.airlineIATA,
      flight_number: this.flightNumber,
    };
  }
}
