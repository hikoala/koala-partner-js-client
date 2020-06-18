import { getField } from './validators';

interface Interface {
  products: number[];

  price: { [key: string]: number };
}

type JSON = Interface;

export default class Policy {
  products: number[];

  price: { [key: string]: number };

  constructor(data: Interface) {
    this.products = getField(data.products, 'policy.products');
    this.price = getField(data.price, 'policy.price');
  }

  static fromJSON(data: JSON): Policy {
    return new Policy(data);
  }

  toJSON(): JSON {
    return this as JSON;
  }
}
