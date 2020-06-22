[![TypeScript version][ts-badge]][typescript-39]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][license]
[![Build Status - Travis][travis-badge]][travis-ci]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]
[![Sponsor][sponsor-badge]][sponsor]

# Koala partner NodeJS client

Client for Koala partner's API (See https://development-partner-api.hikoala.co/api-docs).

## Creating the client.

### Development.

```typescript
import { Koala } from 'Koala';
const client = new Koala({ token: '<your development token>' });
```

### Production.

```typescript
import { Koala, ServerURL } from 'Koala';
const client = new Koala({
  token: '<your production token>',
  target: ServerURL.production,
});
```

Note: You can use `KOALA_PARTNER_TOKEN` to set token.

## Quote

```typescript
import { Koala } from 'koala-partner-client';
import {
  MinimalAttendant,
  MinimalFlight,
  MinimalLeg,
  QuoteQuery,
} from 'koala-partner-client/types';

const client = new Koala({ token: '<your development token>' });
const quoteQuery = new QuoteQuery({
  // The flights attendants.
  attendants: [
    new MinimalAttendant({
      ageRange: AgeRange.Adult,
    }),
    new MinimalAttendant({
      ageRange: AgeRange.Adult,
    }),
  ],
  // The price of the booking (without ancillaries)
  price: 1030.4,
  // The currency code of the booking.
  currencyCode: 'EUR',
  // The itinerary.
  flights: [
    new Flight({
      // The different flights of the itinerary.
      legs: [
        new Leg({
          departureAirportIATA: 'CDG',
          arrivalAirportIATA: 'JFK',
          departureDate: DateTime.utc().plus({ days: 10 }),
          arrivalDate: DateTime.utc().plus({ days: 10, hours: 4 }),
          airlineIATA: 'AF',
          flightNumber: '2131',
        }),
      ],
    }),
    new Flight({
      // The different flights of the itinerary.
      legs: [
        new Leg({
          departureAirportIATA: 'JFK',
          arrivalAirportIATA: 'CDG',
          departureDate: DateTime.utc().plus({ days: 17 }),
          arrivalDate: DateTime.utc().plus({ days: 17, hours: 4 }),
          airlineIATA: 'AF',
          flightNumber: '2222',
        }),
      ],
    }),
  ],
});

const quotes = client.quotes(quoteQuery);
// Expected:
// [
//   {
//     name: 'policy 1',
//     price: { EUR: 12.5 },
//     // ...
//   },
//   {
//     name: 'policy 2',
//     price: { EUR: 14.5 },
//     // ...
//   },
//   {
//     name: 'policy 3',
//     price: { EUR: 16.5 },
//     // ...
//   },
// ]
```

## Subscription.

```typescript
import { Koala } from 'koala-partner-client';
import {
  Attendant,
  Flight,
  Leg,
  SubscribeQuery,
  Client,
} from 'koala-partner-client/types';
const client = new Koala({ token: '<your token>' });

const quoteQuery: QuoteQuery = {}; // Your quote query.
const quotes = await client.quotes(quoteQuery);

// Select the right quote.
const quote: Quote = quotes[1];

// Create a subscription.
const subscribe = new SubscribeQuery({
  // The info about the client (the person booking the product).
  client: new Client({
    firstName: 'Alain',
    lastName: 'Prost',
    email: 'alain.prost@gmail.com',
  }),
  // The booking (a detailed version of the quote)
  booking: new Booking({
    // The attendants (a detailed version).
    attendants: [
      new Attendant({
        firstName: 'Christine',
        lastName: 'Bravo',
        ageRange: AgeRange.Adult,
      }),
      new Attendant({
        firstName: 'Alain',
        lastName: 'Prost',
        ageRange: AgeRange.Adult,
      }),
    ],
    // The booking number (must be unique from your system).
    number: 'K131E49',
    // The price of the booking (without ancillaries)
    price: quoteQuery.price,
    // The currency code of the booking.
    currencyCode: quoteQuery.currencyCode,
    // The flights from the quote query.
    flights: quoteQuery.flights,
  }),
  // The unaltered quote.
  quote,
});

const subscription = await client.subscribe(subscribe);
```
