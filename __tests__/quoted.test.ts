import QuotedLeg from '../src/types/quoted-leg';
import QuotedPlace from '../src/types/quoted-place';
import MinimalLeg from '../src/types/leg-min';
import DateTime from '../src/types/date';
import Policy from '../src/types/policy';
import QuotedFlight from '../src/types/quoted-flight';
import QuotedBooking from '../src/types/quoted-booking';
import MinimalAttendant from '../src/types/attendant-min';
import AgeRange from '../src/types/age-range';


const date = DateTime.fromISO('2020-07-24T00:25:15.277Z');
const minimalLeg = new MinimalLeg({
  arrivalAirportIATA: 'CDG',
  departureAirportIATA: 'JFK',
  departureDate: date
});
const minimalLegJSON = minimalLeg.toJSON();
const policy = new Policy({
  price: { EUR: 100.3 },
  products: [1],
});
const quotedLeg = new QuotedLeg({
  ...minimalLeg,
  policy,
});
const quotedFlight = new QuotedFlight({
  legs: [quotedLeg],
  policy,
});
const quotedPlace = new QuotedPlace({
  start: date,
  end: date,
  countryCode: 'FR',
  policy
});
const attendant = new MinimalAttendant({ ageRange: AgeRange.Adult });

describe('#Quoted', () => {
  describe('#Leg', () => {
    it('should not be possible to create without data', () => {
      expect(() => QuotedLeg.fromJSON(null)).toThrow();
    });

    it('should not be possible without policy', () => {
      expect(
        () =>
          new QuotedLeg({
            ...minimalLeg,
            policy: null,
          }),
      ).toThrow('leg.policy is required');
    });

    it('should not be possible without departureDate', () => {
      expect(
        () =>
          new QuotedLeg({
            ...minimalLeg,
            policy,
            departureDate: null,
          }),
      ).toThrow('leg.departureDate is required');
    });

    it('should not be possible to create and copy', () => {
      const quote = new QuotedLeg({
        ...minimalLeg,
        policy,
      });

      const copy = new QuotedLeg(quote);
      expect(quote).toStrictEqual(copy);
    });

    describe('#fromJSON', () => {
      it('should not be possible without policy', () => {
        expect(() =>
          QuotedLeg.fromJSON({
            policy: null,
            ...minimalLegJSON,
          }),
        ).toThrow('leg.policy is required');
      });

      it('should not be possible without departure_date', () => {
        expect(() =>
          QuotedLeg.fromJSON({
            policy: policy.toJSON(),
            ...minimalLegJSON,
            departure_date: null,
          }),
        ).toThrow('leg.departure_date is required');
      });
    });

    describe('#toJSON', () => {
      it('should not be possible to serialize to JSON', () => {
        const leg = QuotedLeg.fromJSON({
          policy: policy.toJSON(),
          ...minimalLegJSON,
        });
        expect(JSON.stringify(leg, Object.keys(leg).sort())).toStrictEqual(
          JSON.stringify(
            {
              arrival_airport_iata: 'CDG',
              departure_airport_iata: 'JFK',
              departure_date: '2020-06-15T17:46:14.369+03:00',
              policy: {
                price: { EUR: 103.1 },
                products: [1],
              },
            },
            Object.keys(leg).sort(),
          ),
        );
      });
    });
  });

  describe('#Flight', () => {
    it('should not be possible to create without data', () => {
      expect(() => QuotedFlight.fromJSON(null)).toThrow();
    });

    it('should not be possible without policy', () => {
      expect(
        () =>
          new QuotedFlight({
            legs: [quotedLeg],
            policy: null,
          }),
      ).toThrow('flight.policy is required');
    });

    it('should not be possible without legs', () => {
      expect(
        () =>
          new QuotedFlight({
            legs: null,
            policy,
          }),
      ).toThrow('flight.legs is required');
    });

    it('should not be possible to create and copy', () => {
      const quote = new QuotedFlight({
        legs: [quotedLeg],
        policy,
      });

      const copy = new QuotedFlight(quote);
      expect(quote).toStrictEqual(copy);
    });

    describe('#fromJSON', () => {
      it('should not be possible without policy', () => {
        expect(() =>
          QuotedFlight.fromJSON({
            policy: null,
            legs: [quotedLeg.toJSON()],
          }),
        ).toThrow('flight.policy is required');
      });

      it('should not be possible without departure_date', () => {
        expect(() =>
          QuotedFlight.fromJSON({
            policy: policy.toJSON(),
            legs: null,
          }),
        ).toThrow('flight.legs is required');
      });
    });

    describe('#toJSON', () => {
      it('should not be possible to serialize to JSON', () => {
        const flight = QuotedFlight.fromJSON({
          policy: policy.toJSON(),
          legs: [quotedLeg.toJSON()],
        });
        expect(
          JSON.stringify(flight, Object.keys(flight).sort()),
        ).toStrictEqual(
          JSON.stringify(
            {
              legs: [
                {
                  arrival_airport_iata: 'CDG',
                  departure_airport_iata: 'JFK',
                  departure_date: '2020-06-15T17:46:14.369+03:00',
                  policy: {
                    price: { EUR: 103.1 },
                    products: [1],
                  },
                },
              ],
              policy: {
                price: { EUR: 103.1 },
                products: [1],
              },
            },
            Object.keys(flight).sort(),
          ),
        );
      });
    });
  });

  describe('#Booking', () => {
    it('should not be possible to create without data', () => {
      expect(() => QuotedBooking.fromJSON(null)).toThrow();
    });

    it('should not be possible without policy', () => {
      expect(
        () =>
          new QuotedBooking({
            flights: [quotedFlight],
            places: [quotedPlace],
            price: 100,
            policy: null,
            attendants: [],
          }),
      ).toThrow('booking.policy is required');
    });

    it('should not be possible without price', () => {
      expect(
        () =>
          new QuotedBooking({
            flights: [quotedFlight],
            places: [quotedPlace],
            price: null,
            policy,
            attendants: [],
          }),
      ).toThrow('booking.price is required');
    });

    it('should not be possible without flights', () => {
      expect(
        () =>
          new QuotedBooking({
            flights: null,
            places: [quotedPlace],
            price: 100,
            policy,
            attendants: [],
          }),
      ).toThrow('booking.flights is required');
    });

    it('should not be possible without attendants', () => {
      expect(
        () =>
          new QuotedBooking({
            flights: [quotedFlight],
            places: [quotedPlace],
            price: 100,
            policy,
            attendants: null,
          }),
      ).toThrow('booking.attendants is required');
    });

    it('should not be possible to create and copy', () => {
      const quote = new QuotedBooking({
        flights: [quotedFlight],
        places: [quotedPlace],
        price: 100,
        policy,
        attendants: [attendant],
      });

      const copy = new QuotedBooking(quote);
      expect(quote).toStrictEqual(copy);
    });

    describe('#fromJSON', () => {
      it('should not be possible without policy', () => {
        expect(() =>
          QuotedBooking.fromJSON({
            policy: null,
            price: 100,
            flights: [quotedFlight.toJSON()],
            places: [quotedPlace.toJSON()],
            attendants: [attendant.toJSON()],
          }),
        ).toThrow('booking.policy is required');
      });

      it('should not be possible without price', () => {
        expect(() =>
          QuotedBooking.fromJSON({
            policy: policy.toJSON(),
            price: null,
            places: [quotedPlace.toJSON()],
            flights: [quotedFlight.toJSON()],
            attendants: [attendant.toJSON()],
          }),
        ).toThrow('booking.price is required');
      });

      it('should not be possible without flights', () => {
        expect(() =>
          QuotedBooking.fromJSON({
            policy: policy.toJSON(),
            price: 100,
            flights: null,
            places: [quotedPlace.toJSON()],
            attendants: [attendant.toJSON()],
          }),
        ).toThrow('booking.flights is required');
      });

      it('should not be possible without attendants', () => {
        expect(() =>
          QuotedBooking.fromJSON({
            policy: policy.toJSON(),
            price: 100,
            flights: [quotedFlight.toJSON()],
            places: [quotedPlace.toJSON()],
            attendants: null,
          }),
        ).toThrow('booking.attendants is required');
      });
    });

    describe('#toJSON', () => {
      it('should not be possible to serialize to JSON', () => {
        const quote = QuotedBooking.fromJSON({
          policy: policy.toJSON(),
          flights: [quotedFlight.toJSON()],
          places: [quotedPlace.toJSON()],
          price: 100,
          attendants: [attendant.toJSON()],
        });
        expect(JSON.stringify(quote, Object.keys(quote).sort())).toEqual(
          JSON.stringify(
            {
              flights: [
                {
                  legs: [
                    {
                      departure_date: '2020-06-15T22:50:45.222+02:00',
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
              places: [
                {
                  policy: {
                    products: [1],
                    price: {
                      EUR: 100.3,
                    },
                  },
                }
              ],
              price: 100,
              policy: {
                products: [1],
                price: {
                  EUR: 100.3,
                },
              },
              attendants: [
                {
                  age_range: 'Adult',
                },
              ],
            },
            Object.keys(quote).sort(),
          ),
        );
      });
    });
  });
});
