import QuotedLeg from '../src/types/quoted-leg';
import Quote from '../src/types/quote';
import DateTime from '../src/types/date';
import Policy from '../src/types/policy';
import QuotedFlight from '../src/types/quoted-flight';
import QuotedBooking from '../src/types/quoted-booking';
import MinimalAttendant from '../src/types/attendant-min';
import AgeRange from '../src/types/age-range';

const policy = new Policy({
  price: { EUR: 100.3 },
  products: [1],
});

const quotedBooking = new QuotedBooking({
  flights: [
    new QuotedFlight({
      legs: [
        new QuotedLeg({
          arrivalAirportIATA: 'CDG',
          departureAirportIATA: 'JFK',
          departureDate: DateTime.fromJSDate(new Date()),
          policy,
        }),
      ],
      policy,
    }),
  ],
  price: 103,
  policy,
  attendants: [new MinimalAttendant({ ageRange: AgeRange.Adult })],
});

const quoteData = {
  valid: true,
  name: 'ThePolicy',
  id: 'TheID',
  date: DateTime.local(),
  hash: 'TheHash',
  booking: quotedBooking,
  price: { EUR: 102.54 },
};

const quoteDataJSON = JSON.parse(JSON.stringify(quoteData));
quoteDataJSON.details = quoteDataJSON.booking;
delete quoteDataJSON.booking;

describe('#Quoted', () => {
  describe('#Leg', () => {
    it('should not be possible to create without data', () => {
      expect(() => Quote.fromJSON(null)).toThrow();
    });

    it('should not be possible without price', () => {
      expect(
        () =>
          new Quote({
            ...quoteData,
            price: null,
          }),
      ).toThrow('quote.price is required');
    });

    it('should not be possible without name', () => {
      expect(
        () =>
          new Quote({
            ...quoteData,
            name: null,
          }),
      ).toThrow('quote.name is required');
    });

    it('should not be possible without id', () => {
      expect(
        () =>
          new Quote({
            ...quoteData,
            id: null,
          }),
      ).toThrow('quote.id is required');
    });

    it('should not be possible without date', () => {
      expect(
        () =>
          new Quote({
            ...quoteData,
            date: null,
          }),
      ).toThrow('quote.date is required');
    });

    it('should not be possible without hash', () => {
      expect(
        () =>
          new Quote({
            ...quoteData,
            hash: null,
          }),
      ).toThrow('quote.hash is required');
    });

    it('should not be possible without booking', () => {
      expect(
        () =>
          new Quote({
            ...quoteData,
            booking: null,
          }),
      ).toThrow('quote.booking is required');
    });

    it('should not be possible without valid', () => {
      expect(
        () =>
          new Quote({
            ...quoteData,
            valid: null,
          }),
      ).toThrow('quote.valid is required');
    });

    it('should not be possible to create and copy an invalid quote', () => {
      const quote = new Quote({
        valid: false,
        name: 'TheName',
        id: 'TheId',
        date: DateTime.local(),
      });
      const copy = new Quote(quote);
      expect(quote).toStrictEqual(copy);
    });

    it('should not be possible to create and copy a valid quote', () => {
      const quote = new Quote(quoteData);

      const copy = new Quote(quote);
      expect(quote).toStrictEqual(copy);
    });

    describe('#fromJSON', () => {
      it('should not be possible without policy', () => {
        expect(() =>
          Quote.fromJSON({
            ...quoteDataJSON,
            price: undefined,
          }),
        ).toThrow('quote.price is required');
      });

      it('should not be possible without details', () => {
        expect(() =>
          Quote.fromJSON({
            ...quoteDataJSON,
            details: undefined,
          }),
        ).toThrow('quote.details is required');
      });

      it('should not be possible without name', () => {
        expect(() =>
          Quote.fromJSON({
            ...quoteDataJSON,
            name: undefined,
          }),
        ).toThrow('quote.name is required');
      });

      it('should not be possible without id', () => {
        expect(() =>
          Quote.fromJSON({
            ...quoteDataJSON,
            id: undefined,
          }),
        ).toThrow('quote.id is required');
      });

      it('should not be possible without date', () => {
        expect(() =>
          Quote.fromJSON({
            ...quoteDataJSON,
            date: undefined,
          }),
        ).toThrow('quote.date is required');
      });
    });

    describe('#toJSON', () => {
      it('should not be possible to serialize a valid quote to JSON', () => {
        const quote = Quote.fromJSON(quoteDataJSON);
        expect(JSON.stringify(quote, Object.keys(quote).sort())).toStrictEqual(
          JSON.stringify(
            {
              details: {
                flights: [
                  {
                    legs: [
                      {
                        departure_date: '2020-06-16T11:25:31.530+02:00',
                        departure_airport_iata: 'JFK',
                        arrival_airport_iata: 'CDG',
                        policy: {
                          products: [1],
                          price: {
                            EUR: 100.3,
                          },
                        },
                      },
                    ],
                    policy: {
                      products: [1],
                      price: {
                        EUR: 100.3,
                      },
                    },
                  },
                ],
                policy: {
                  products: [1],
                  price: {
                    EUR: 100.3,
                  },
                },
                price: 103,
              },
              policy: {
                price: {
                  EUR: 100.3,
                },
              },
              valid: true,
            },
            Object.keys(quote).sort(),
          ),
        );
      });
    });

    it('should not be possible to serialize an invalid quote to JSON', () => {
      const quote = Quote.fromJSON({
        id: 'TheID',
        name: 'TheName',
        date: '2020-06-16T11:25:31.530+02:00',
        valid: false,
      });
      expect(JSON.stringify(quote, Object.keys(quote).sort())).toStrictEqual(
        JSON.stringify(
          {
            valid: false,
          },
          Object.keys(quote).sort(),
        ),
      );
    });
  });
});
