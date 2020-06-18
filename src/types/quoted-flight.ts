import Policy from './policy';
import { default as MinimalFlightJSON } from './JSON/flight-min';
import QuotedLeg from './quoted-leg';
import { default as IFlight } from './iflight';
import { getField } from './validators';

interface JSON extends MinimalFlightJSON {
  policy: any;
}

interface Interface extends IFlight<QuotedLeg> {
  policy: Policy;
}

export default class QuotedFlight implements Interface {
  legs: QuotedLeg[];
  
  policy: Policy;

  constructor(data: Interface) {
    this.legs = getField(data.legs, 'flight.legs');
    this.policy = getField(data.policy, 'flight.policy');
  }

  static fromJSON(data: JSON): QuotedFlight {
    return new QuotedFlight({
      legs: getField(data.legs, 'flight.legs').map((leg: any) =>
        QuotedLeg.fromJSON(leg),
      ),
      policy: new Policy(getField(data.policy, 'flight.policy')),
    });
  }

  toJSON(): JSON {
    return {
      legs: this.legs.map((leg: QuotedLeg) => leg.toJSON()),
      policy: this.policy,
    };
  }
}
