# Koala partner NodeJS client

Client for Koala partner's API (See https://development-partner-api.hikoala.co/api-docs).

## Installation.

```bash
npm install --save koala-partner-client
```

## Creating the client.

### Development.

```typescript
import { Koala } from 'koala-partner-client';
const client = new Koala({ token: '<your development token>' });
```

### Production.

```typescript
import { Koala, ServerURL } from 'koala-partner-client';
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
  Flight,
  Leg,
  Place,
  QuoteQuery,
} from 'koala-partner-client/lib/types';

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
  // The currency code of the booking (ISO 4217).
  currencyCode: 'EUR',
  // The itinerary.
  flights: [
    new Flight({
      // The different flights of the itinerary.
      legs: [
        new Leg({
          // The IATA code of the departure airport.
          departureAirportIATA: 'CDG',
          // The IATA code of the arrival airport.
          arrivalAirportIATA: 'JFK',
          // The departure date as an ISO string (ISO 8601).
          departureDate: '2021-06-22T18:10:15+02:00',
          // The departure date as an ISO string (ISO 8601).
          arrivalDate: '2021-06-22T21:10:15-04:00',
          // The IATA of the airline.
          airlineIATA: 'AF',
          // The flight number.
          flightNumber: '2131',
        }),
      ],
    }),
    new Flight({
      // The different flights of the itinerary.
      legs: [
        // Same as before.
        new Leg({
          departureAirportIATA: 'JFK',
          arrivalAirportIATA: 'CDG',
          departureDate: '2021-06-27T21:10:15-04:00',
          arrivalDate: '2021-06-28T12:10:15+02:00',
          airlineIATA: 'AF',
          flightNumber: '2222',
        }),
      ],
    }),
  ],
  // The places.
  places: [
    new Place({
      // The display name of the activity / place.
      name: 'Having lunch with your favorite actor',
      // The description of the activity / place.
      description:
        'Have you ever dream to have diner with your favorite actor... We offer you that.',
      // Your internal ID for the place (allows us to reuse places).
      partnerInternalId: '01838481',
      // The language of the name and description (ISO 639-1).
      lang: 'en',
      // The country code of the country (ISO 3166-1).
      countryCode: 'FR',
      // The start date of the activity (ISO 8601).
      start: '2021-06-28T12:10:15+02:00',
      // The end date of the activity (ISO 8601).
      end: '2021-06-28T12:10:15+02:00',
    }),
  ],
});

const quotes = await client.quotes(quoteQuery);
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
} from 'koala-partner-client/lib/types';
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
    // The places from teh quote query.
    places: quoteQuery.places,
  }),
  // The unaltered quote.
  quote,
});

const subscription = await client.subscribe(subscribe);
```
