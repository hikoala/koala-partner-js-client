import Claim from './claim';
import { getField } from './validators';

interface Interface {
  claimed: boolean;

  value: number;

  currencyCode: string;

  claim?: Claim;
}

interface JSON {
  claimed: boolean;

  value: number;

  currency_code: string;

  claim?: any;
}

export default class ProductStatus implements Interface {
  claimed: boolean;

  value: number;

  currencyCode: string;

  claim?: Claim;

  constructor(data: Interface) {
    this.claimed = getField(data.claimed, 'data.claimed');
    this.value = getField(data.value, 'data.value');
    this.currencyCode = getField(data.currencyCode, 'data.currencyCode');
    this.claim = data.claim;
  }

  toJSON(): JSON {
    return {
      claimed: this.claimed,
      value: this.value,
      currency_code: this.currencyCode,
      claim: this.claim ? this.claim.toJSON() : undefined,
    };
  }

  static fromJSON(data: JSON): ProductStatus {
    return new ProductStatus({
      claimed: getField(data.claimed, 'data.claimed'),
      value: getField(data.value, 'data.value'),
      currencyCode: getField(data.currency_code, 'data.currency_code'),
      claim: data.claim ? Claim.fromJSON(data.claim) : undefined,
    });
  }
}
