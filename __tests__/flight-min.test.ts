import MinimalFlight from '../src/types/flight-min';
import DateTime from '../src/types/date';
import MinimalLeg from '../src/types/leg-min';

const minimalLeg = new MinimalLeg({
  arrivalAirportIATA: 'CDG',
  departureAirportIATA: 'JFK',
  departureDate: DateTime.fromJSDate(new Date()),
});

const minimalLegJSON = minimalLeg.toJSON();

describe('#MinimalFlight', () => {
  it('should not be possible to create without data', () => {
    expect(() => new MinimalFlight(null)).toThrow();
  });

  it('should not be possible without legs', () => {
    expect(
      () =>
        new MinimalFlight({
          legs: null,
        }),
    ).toThrow('flight.legs is required');
  });

  it('should not be possible to create and copy', () => {
    const flight = new MinimalFlight({
      legs: [minimalLeg],
    });
    const copy = new MinimalFlight(flight);
    expect(flight).toStrictEqual(copy);
  });

  describe('#fromJSON', () => {
    it('should not be possible without departureDate', () => {
      expect(() =>
        MinimalFlight.fromJSON({
          legs: null,
        }),
      ).toThrow('flight.legs is required');
    });
  });

  describe('#toJSON', () => {
    it('should not be possible to serialize to JSON', () => {
      const flight = MinimalFlight.fromJSON({
        legs: [minimalLegJSON],
      });
      expect(JSON.stringify(flight)).toStrictEqual(
        JSON.stringify({
          legs: [minimalLegJSON],
        }),
      );
    });
  });
});
