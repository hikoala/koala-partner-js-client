import { getField } from './validators';
import { SourceProduct } from './source-product';

interface Interface {
  id: string;

  name: string;

  distributionPriceTTC: number;

  sourceId: string;

  source: SourceProduct;
}

interface JSON {
  id: string;

  name: string;

  distribution_price_ttc: number;

  source_id: string;

  source: any;
}

export class Product implements Interface {
  id: string;

  name: string;

  distributionPriceTTC: number;

  sourceId: string;

  source: SourceProduct;

  constructor(input: Interface) {
    this.id = getField(input.id, 'input.id');
    this.name = getField(input.name, 'input.name');
    this.distributionPriceTTC = getField(
      input.distributionPriceTTC,
      'input.distributionPriceTTC',
    );
    this.sourceId = getField(input.sourceId, 'input.sourceId');
    this.source = getField(input.source, 'input.source');
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      distribution_price_ttc: this.distributionPriceTTC,
      source_id: this.sourceId,
    };
  }

  static fromJSON(data: JSON): Product {
    return new Product({
      id: getField(data.id, 'data.id'),
      name: getField(data.name, 'data.name'),
      distributionPriceTTC: getField(
        data.distribution_price_ttc,
        'data.distribution_price_ttc',
      ),
      sourceId: getField(data.source_id, 'data.source_id'),
      source: SourceProduct.fromJSON(getField(data.source, 'data.source')),
    });
  }
}
