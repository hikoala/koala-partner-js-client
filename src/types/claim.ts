import { DateTime } from '.';
import { Product } from './product';
import { getField } from './validators';

interface Interface {
  id: string;

  status:
    | 'created'
    | 'future'
    | 'needMoreInfo'
    | 'actionNeeded'
    | 'rejected'
    | 'accepted'
    | 'refunded';

  refundDate: DateTime | string;

  IBAN?: string;

  peaId: string;

  product: Product;
}

interface JSON {
  id: string;

  status:
    | 'created'
    | 'future'
    | 'needMoreInfo'
    | 'actionNeeded'
    | 'rejected'
    | 'accepted'
    | 'refunded';

  refund_date: DateTime | string;

  IBAN?: string;

  pea_id: string;

  product: any;
}

export default class Claim implements Interface {
  id: string;

  status:
    | 'created'
    | 'future'
    | 'needMoreInfo'
    | 'actionNeeded'
    | 'rejected'
    | 'accepted'
    | 'refunded';

  refundDate: DateTime;

  IBAN?: string;

  peaId: string;

  product: Product;

  constructor(input: Interface) {
    this.id = getField(input.id, 'input.id');
    this.status = getField(input.status, 'input.status');
    const refundDate = getField(input.refundDate, 'input.refundDate');
    if (typeof refundDate === 'string') {
      this.refundDate = DateTime.fromISO(refundDate as string);
    } else {
      this.refundDate = refundDate as DateTime;
    }
    this.IBAN = getField(input.IBAN, 'input.IBAN');
    this.peaId = getField(input.peaId, 'input.peaId');
    this.product = getField(input.product, 'input.product');
  }

  toJSON() {
    return {
      id: this.id,
      status: this.status,
      refund_date: this.refundDate.toJSON(),
      IBAN: this.IBAN,
      pea_id: this.peaId,
      product: this.product.toJSON(),
    };
  }

  static fromJSON(data: JSON): Claim {
    return new Claim({
      id: data.id,
      status: data.status,
      refundDate: data.refund_date,
      IBAN: data.IBAN,
      peaId: data.pea_id,
      product: Product.fromJSON(getField(data.product, 'input.product')),
    });
  }
}
