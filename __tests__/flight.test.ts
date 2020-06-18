import Flight from '../src/types/flight';
import DateTime from '../src/types/date';
import Leg from '../src/types/leg';

const leg = new Leg({
  arrivalAirportIATA: 'CDG',
  departureAirportIATA: 'JFK',
  departureDate: DateTime.fromJSDate(new Date()),
  airlineIATA: 'AF',
  flightNumber: '1312',
  arrivalDate: DateTime.fromJSDate(new Date()),
});

const legJSON = leg.toJSON();

describe('#Flight', () => {
  it('should not be possible to create without data', () => {
    expect(() => new Flight(null)).toThrow();
  });

  it('should not be possible without legs', () => {
    expect(
      () =>
        new Flight({
          legs: null,
        }),
    ).toThrow('flight.legs is required');
  });

  it('should not be possible to create and copy', () => {
    const flight = new Flight({
      legs: [leg],
    });
    const copy = new Flight(flight);
    expect(flight).toStrictEqual(copy);
  });

  describe('#fromJSON', () => {
    it('should not be possible without departureDate', () => {
      expect(() =>
        Flight.fromJSON({
          legs: null,
        }),
      ).toThrow('flight.legs is required');
    });
  });

  describe('#toJSON', () => {
    it('should not be possible to serialize to JSON', () => {
      const flight = Flight.fromJSON({
        legs: [legJSON],
      });
      expect(JSON.stringify(flight)).toStrictEqual(
        JSON.stringify({
          legs: [legJSON],
        }),
      );
    });
  });
});
