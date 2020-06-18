import IFlight from './iflight';
import Leg from './leg';
import { getField } from './validators';

type Interface = IFlight<Leg>;

interface JSON {
  legs: any[];
}

export default class Flight implements Interface {
  legs: Leg[];

  constructor(data: Interface) {
    this.legs = getField(data.legs, 'flight.legs');
  }

  static fromJSON(data: JSON): Flight {
    return new Flight({
      legs: getField(data.legs, 'flight.legs').map((leg: any) =>
        Leg.fromJSON(leg),
      ),
    });
  }

  toJSON(): JSON {
    return {
      legs: this.legs.map((leg: Leg) => leg.toJSON()),
    };
  }
}
