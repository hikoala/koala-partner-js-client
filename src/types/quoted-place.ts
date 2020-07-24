import Policy from './policy';
import MinimalPlace from './place-min';
import { default as MinimalJSON } from './JSON/place-min';
import { default as PlaceInterface } from './interfaces/place-min';
import { getField } from './validators';


interface JSON extends MinimalJSON {
  policy: any;
}

interface Interface extends PlaceInterface {
  policy: Policy;
}

export default class QuotedPlace extends MinimalPlace implements Interface {
  policy: Policy;

  constructor(data: Interface) {
    super(data);
    this.policy = getField(data.policy, 'place.policy');
  }

  static fromJSON(data: JSON): QuotedPlace {
    return new QuotedPlace({
      ...MinimalPlace._fromJSON(data as MinimalJSON),
      policy: new Policy(getField(data.policy, 'place.policy')),
    });
  }

  toJSON(): JSON {
    return {
      ...super.toJSON(),
      policy: this.policy,
    };
  }
}
