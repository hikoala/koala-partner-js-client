import Booking from './booking';
import Client from './client';
import Quote from './quote';

import { getField } from './validators';

interface Interface {
  booking: Booking;

  client: Client;

  quote: Quote;
}

interface JSON {
  booking: any;

  client: any;

  quote: any;
}

export default class SubscribeQuery implements Interface {
  booking: Booking;

  client: Client;

  quote: Quote;

  constructor(data: Interface) {
    this.booking = getField(data.booking, 'subscription.booking');
    this.client = getField(data.client, 'subscription.client');
    this.quote = getField(data.quote, 'subscription.quote');
  }

  static fromJSON(data: JSON): SubscribeQuery {
    return new SubscribeQuery({
      booking: getField(data.booking, 'subscription.booking'),
      client: getField(data.client, 'subscription.client'),
      quote: getField(data.quote, 'subscription.quote'),
    });
  }
}
