import { default as MinimalJSON } from './JSON/place-min';
import { default as MinimalInterface } from './interfaces/place-min';
import MinimalPlace from './place-min';

import { getField } from './validators';

interface SelfInterface {
  name: string;

  description: string;

  lang: string;

  partnerInternalId: string;
}

interface Interface extends MinimalInterface, SelfInterface { }

interface JSON extends MinimalJSON {
  name: string;

  description: string;

  lang: string;

  partner_internal_id: string;
}

export default class Place extends MinimalPlace implements Interface {
  name: string;

  description: string;

  lang: string;

  partnerInternalId: string;

  constructor(data: Interface) {
    super(data);
    this.name = getField(data.name, 'place.name');
    this.description = getField(data.description, 'place.description');
    this.lang = getField(data.lang, 'place.lang');
    this.partnerInternalId = getField(data.partnerInternalId, 'place.partnerInternalId');
  }

  static extendMinimal(base: MinimalInterface, data: SelfInterface): Place {
    return new Place({
      ...base,
      ...data,
    });
  }

  static fromJSON(data: JSON): Place {
    return new Place({
      ...MinimalPlace._fromJSON(data as MinimalJSON),
      name: getField(data.name, 'place.name'),
      description: getField(data.description, 'place.description'),
      lang: getField(data.lang, 'place.lang'),
      partnerInternalId: getField(data.partner_internal_id, 'place.partner_internal_id')
    });
  }

  toJSON(): JSON {
    return {
      ...super.toJSON(),
      name: this.name,
      description: this.description,
      lang: this.lang,
      partner_internal_id: this.partnerInternalId
    };
  }
}
