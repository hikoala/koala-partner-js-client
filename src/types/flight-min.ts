import IFlight from './iflight';
import MinimalLeg from './leg-min';
import { getField } from './validators';
import { default as JSON } from './JSON/flight-min';
import { default as Interface } from './interfaces/flight-min';

export default class MinimalFlight implements IFlight<MinimalLeg> {
  legs: MinimalLeg[];

  constructor(data: Interface) {
    this.legs = getField(data.legs, 'flight.legs');
  }

  static _fromJSON(data: JSON): Interface {
    return {
      legs: getField(data.legs, 'flight.legs').map((leg: any) =>
        MinimalLeg.fromJSON(leg),
      ),
    };
  }

  static fromJSON(data: JSON): MinimalFlight {
    return new MinimalFlight(MinimalFlight._fromJSON(data));
  }

  toJSON(): JSON {
    return {
      legs: this.legs.map((leg: MinimalLeg) => leg.toJSON()),
    };
  }
}
