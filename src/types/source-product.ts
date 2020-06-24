import { getField } from './validators';

// id":"20","name":"withdrawal","kind":"other","product":"booking","type":"*","premium":0.07,"compensation":0.7,"min_delay":0,"insurer_name":"Seyna","currency_code":"EUR","currency":{"name":"Euro","code":"EUR","symbol":"€"},"insurer":{"name":"Seyna"}}

interface Interface {
  id: string;

  name: string;

  product: 'leg' | 'flight' | 'booking';

  kind:
    | 'delay'
    | 'delay_cancellation'
    | 'lost_luggage'
    | 'missed_connection'
    | 'other';

  type: 'long' | 'medium' | 'short' | '*';

  insurerName: string;

  currencyCode: string;
}

interface JSON {
  id: string;

  name: string;

  product: 'leg' | 'flight' | 'booking';

  kind:
    | 'delay'
    | 'delay_cancellation'
    | 'lost_luggage'
    | 'missed_connection'
    | 'other';

  type: 'long' | 'medium' | 'short' | '*';

  insurer_name: string;

  currency_code: string;
}

export class SourceProduct implements Interface {
  id: string;

  name: string;

  product: 'leg' | 'flight' | 'booking';

  kind:
    | 'delay'
    | 'delay_cancellation'
    | 'lost_luggage'
    | 'missed_connection'
    | 'other';

  type: 'long' | 'medium' | 'short' | '*';

  insurerName: string;

  currencyCode: string;

  constructor(input: Interface) {
    this.id = getField(input.id, 'input.id');
    this.name = getField(input.name, 'input.name');
    this.product = getField(input.product, 'input.product');
    this.kind = getField(input.kind, 'input.kind');
    this.type = getField(input.type, 'input.type');
    this.insurerName = getField(input.insurerName, 'input.insurerName');
    this.currencyCode = getField(input.currencyCode, 'input.currencyCode');
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      product: this.product,
      kind: this.kind,
      type: this.type,
      insurer_name: this.insurerName,
      currency_code: this.currencyCode,
    };
  }

  static fromJSON(data: JSON): SourceProduct {
    return new SourceProduct({
      id: getField(data.id, 'data.id'),
      name: getField(data.name, 'data.name'),
      product: getField(data.product, 'data.product'),
      kind: getField(data.kind, 'data.kind'),
      type: getField(data.type, 'data.type'),
      insurerName: getField(data.insurer_name, 'data.insurer_name'),
      currencyCode: getField(data.currency_code, 'data.currency_code'),
    });
  }
}
