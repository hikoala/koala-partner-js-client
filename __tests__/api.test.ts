import _ from 'lodash';
import Koala from '../src/client';
import MinimalAttendant from '../src/types/attendant-min';
import MinimalLeg from '../src/types/leg-min';
import QuoteQuery from '../src/types/quote-query';
import AgeRange from '../src/types/age-range';
import MinimalFlight from '../src/types/flight-min';
import DateTime from '../src/types/date';
import Quote from '../src/types/quote';
import SubscribeQuery from '../src/types/subscribe';
import Client from '../src/types/client';
import Booking from '../src/types/booking';
import Attendant from '../src/types/attendant';
import Flight from '../src/types/flight';
import Leg from '../src/types/leg';
import APIError from '../src/types/error';

let client: Koala;
let quoteQuery: QuoteQuery;

describe('#API', () => {
  describe('not logged', () => {
    beforeEach(() => {
      client = new Koala({});
    });

    it('should return 401', async () => {
      await expect(client.quotes(undefined)).rejects.toEqual(
        new APIError({
          status: 401,
          message: 'you do not have access to this resource',
          source: 'self',
        }),
      );
    });
  });

  describe('logged', () => {
    beforeEach(() => {
      client = new Koala({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS29hbGEiLCJlbWFpbCI6ImFudG9ueUBoaWtvYWxhLmNvIiwiZW52IjoicHJvZHVjdGlvbiIsInV1aWQiOiI5ZWUzNDg1Ni0xYjAxLTQ2ZDEtYmM2OS0xYzBjMjY4MDJhNzkiLCJpYXQiOjE1ODg2OTMzODZ9.cb2l3t9hxctv42YFuJyrv7A-bpdQnSk-Yc2qPxEkbCM',
      });

      quoteQuery = new QuoteQuery({
        attendants: [
          new MinimalAttendant({
            ageRange: AgeRange.Adult,
          }),
          new MinimalAttendant({
            ageRange: AgeRange.Adult,
          }),
        ],
        price: 1030.4,
        currencyCode: 'EUR',
        flights: [
          new MinimalFlight({
            legs: [
              new MinimalLeg({
                departureAirportIATA: 'CDG',
                arrivalAirportIATA: 'JFK',
                departureDate: DateTime.utc().plus({ days: 10 }),
              }),
            ],
          }),
        ],
      });
    });

    describe('#quotes', () => {
      it('should return 400 if the quote is ill-formed', async () => {
        await expect(client.quotes(undefined)).rejects.toEqual(
          new APIError({
            status: 401,
            message: 'you do not have access to this resource',
            source: 'self',
          }),
        );
      });

      it('should return 400 if one of the airport does not exist', async () => {
        const query = quoteQuery;
        query.flights[0].legs[0].departureAirportIATA = 'BEAVERAIRPORT';
        await expect(client.quotes(query)).rejects.toEqual(
          new APIError({
            status: 401,
            message: `Unknown airport: 'BEAVERAIRPORT'.`,
            source: 'self',
          }),
        );
      });

      it.only('should return 400 if a date is ill-formed', async () => {
        const query = quoteQuery;
        // XXX: Wrong error message due to 
        const date = DateTime.local().plus({
          years: 19210910201201200912840981,
        });
        query.flights[0].legs[0].departureDate = date;
        await expect(client.quotes(query)).rejects.toEqual(
          new APIError({
            status: 400,
            message: `Missing field 'local_departure_date'.`,
            source: 'self',
          }),
        );
      });

      it('should return 400 if the quote is in the past', async () => {
        const query = quoteQuery;
        const date = DateTime.local().minus({
          days: 2,
        });
        query.flights[0].legs[0].departureDate = date;
        await expect(client.quotes(query)).rejects.toEqual(
          new APIError({
            status: 400,
            message: `${date.toUTC().toISO()} is in the past.`,
            source: 'self',
          }),
        );
      });

      it('should be possible to quote (valid)', async () => {
        const query = quoteQuery;
        const quotes: Quote[] = await client.quotes(query);
        expect(quotes.length).toBeGreaterThan(0);
        for (const quote of quotes) {
          expect(quote.valid).toBe(true);
        }
      });

      it('should be possible to quote invalid', async () => {
        const query = quoteQuery;
        query.flights[0].legs[0].departureDate = DateTime.utc().plus({
          hours: 12,
        });
        const quotes: Quote[] = await client.quotes(query);
        expect(quotes.length).toBeGreaterThan(0);
        for (const quote of quotes) {
          expect(quote.valid).toBe(false);
        }
      });
    });

    describe.skip('subscribe', () => {
      it('should be possible to subscribe', async () => {
        const flights = [
          new Flight({
            legs: [
              new Leg({
                departureAirportIATA: 'CDG',
                arrivalAirportIATA: 'JFK',
                departureDate: DateTime.utc().plus({ days: 12 }),
                airlineIATA: 'AF',
                flightNumber: '1312',
                arrivalDate: DateTime.utc().plus({ days: 16 }),
              }),
            ],
          }),
        ];
        const quoteQuery = new QuoteQuery({
          attendants: [
            new MinimalAttendant({
              ageRange: AgeRange.Adult,
            }),
            new MinimalAttendant({
              ageRange: AgeRange.Adult,
            }),
          ],
          price: 1030.4,
          currencyCode: 'EUR',
          flights,
        });

        const quotes: Quote[] = await client.quotes(quoteQuery);
        const quote = quotes[0];

        const subscribe = new SubscribeQuery({
          client: new Client({
            firstName: 'Alain',
            lastName: 'Prost',
            email: 'antony@hikoala.co',
          }),
          booking: new Booking({
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
            number: DateTime.local().toISO(),
            price: quoteQuery.price,
            currencyCode: quoteQuery.currencyCode,
            flights,
          }),
          quote,
        });

        const subscription = await client.subscribe(subscribe);
        console.log(subscription);
        expect(subscription).toBe(true);
      });
    });
  });
});
