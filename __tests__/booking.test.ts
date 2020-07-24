import Booking from '../src/types/booking';
import Flight from '../src/types/flight';
import Leg from '../src/types/leg';
import DateTime from '../src/types/date';
import Attendant from '../src/types/attendant';
import AgeRange from '../src/types/age-range';
import { Place } from '../src/types';

const flight = new Flight({
  legs: [
    new Leg({
      arrivalAirportIATA: 'CDG',
      departureAirportIATA: 'JFK',
      departureDate: DateTime.fromJSDate(new Date()),
      airlineIATA: 'AF',
      flightNumber: '1312',
      arrivalDate: DateTime.fromJSDate(new Date()),
    }),
  ],
});

const place = new Place({
  start: DateTime.fromJSDate(new Date()),
  end: DateTime.fromJSDate(new Date()),
  countryCode: 'FR',
  lang: 'fr',
  name: 'place',
  description: 'a place',
  partnerInternalId: 'placeId'
});

const attendant = new Attendant({
  firstName: 'Manu',
  lastName: 'Macron',
  ageRange: AgeRange.Adult,
});

const baseBooking = {
  number: 'ACACAC',
  price: 100,
  flights: [flight],
  places: [place],
  attendants: [attendant],
};
const baseBookingJSON = JSON.parse(JSON.stringify(baseBooking));

describe('#Booking', () => {
  it('should not be possible to create without data', () => {
    expect(() => new Flight(null)).toThrow();
  });

  it('should not be possible without number', () => {
    expect(
      () =>
        new Booking({
          ...baseBooking,
          number: null,
        }),
    ).toThrow('booking.number is required');
  });

  it('should not be possible without price', () => {
    expect(
      () =>
        new Booking({
          ...baseBooking,
          price: null,
        }),
    ).toThrow('booking.price is required');
  });

  it('should not be possible without flights', () => {
    expect(
      () =>
        new Booking({
          ...baseBooking,
          flights: null,
        }),
    ).toThrow('booking.flights is required');
  });

  it('should not be possible without attendants', () => {
    expect(
      () =>
        new Booking({
          ...baseBooking,
          attendants: null,
        }),
    ).toThrow('booking.attendants is required');
  });

  it('should not be create and copy a booking', () => {
    const booking = new Booking(baseBooking);
    const copy = new Booking(booking);
    expect(booking).toStrictEqual(copy);
  });

  describe('#fromJSON', () => {
    it('should not be possible without number', () => {
      expect(() =>
        Booking.fromJSON({
          ...baseBookingJSON,
          number: null,
        }),
      ).toThrow('booking.number is required');
    });
    it('should not be possible without price', () => {
      expect(() =>
        Booking.fromJSON({
          ...baseBookingJSON,
          price: null,
        }),
      ).toThrow('booking.price is required');
    });

    it('should not be possible without flights', () => {
      expect(() =>
        Booking.fromJSON({
          ...baseBookingJSON,
          flights: null,
        }),
      ).toThrow('booking.flights is required');
    });

    it('should not be possible without attendants', () => {
      expect(() =>
        Booking.fromJSON({
          ...baseBookingJSON,
          attendants: null,
        }),
      ).toThrow('booking.attendants is required');
    });
  });

  describe('#toJSON', () => {
    it('should not be possible to serialize to JSON', () => {
      const booking = Booking.fromJSON(baseBookingJSON);
      const keys = Object.keys(booking).sort();
      expect(JSON.stringify(booking, keys)).toStrictEqual(
        JSON.stringify(baseBookingJSON, keys),
      );
    });
  });
});
