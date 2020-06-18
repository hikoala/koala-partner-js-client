import MinimalLeg from './leg-min';
import { default as LegInterface } from './interfaces/leg-min';
import { default as LegJSON } from './JSON/leg-min';
import { getField } from './validators';
import Policy from './policy';

interface Interface extends LegInterface {
  policy: Policy;
}

interface JSON extends LegJSON {
  policy: any;
}

export default class QuotedLeg extends MinimalLeg implements Interface {
  policy: Policy;

  constructor(data: Interface) {
    super(data);
    this.policy = getField(data.policy, 'leg.policy');
  }

  static fromJSON(data: JSON): QuotedLeg {
    return new QuotedLeg({
      ...MinimalLeg._fromJSON(data as LegJSON),
      policy: new Policy(getField(data.policy, 'leg.policy')),
    });
  }

  toJSON(): JSON {
    return {
      ...super.toJSON(),
      policy: this.policy,
    };
  }
}
