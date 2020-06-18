import MinimalLeg from '../src/types/leg-min';
import DateTime from '../src/types/date';

describe('#MinimalLeg', () => {
  it('should not be possible to create without data', () => {
    expect(() => new MinimalLeg(null)).toThrow();
  });

  it('should not be possible without departureDate', () => {
    expect(
      () =>
        new MinimalLeg({
          arrivalAirportIATA: 'CDG',
          departureAirportIATA: 'JFK',
          departureDate: null,
        }),
    ).toThrow('leg.departureDate is required');
  });

  it('should not be possible with an ill-formed date', () => {
    const date = DateTime.fromISO('31');
    expect(
      () =>
        new MinimalLeg({
          arrivalAirportIATA: 'CDG',
          departureAirportIATA: 'JFK',
          departureDate: date,
        }),
    ).toThrow('Invalid date');
  });

  it('should not be possible without arrival airport iata', () => {
    expect(
      () =>
        new MinimalLeg({
          arrivalAirportIATA: null,
          departureAirportIATA: 'JFK',
          departureDate: DateTime.fromJSDate(new Date()),
        }),
    ).toThrow('leg.arrivalAirportIATA is required');
  });

  it('should not be possible without departure airport iata', () => {
    expect(
      () =>
        new MinimalLeg({
          arrivalAirportIATA: 'CDG',
          departureAirportIATA: null,
          departureDate: DateTime.fromJSDate(new Date()),
        }),
    ).toThrow('leg.departureAirportIATA is required');
  });

  it('should not be possible to create and copy', () => {
    const leg = new MinimalLeg({
      arrivalAirportIATA: 'CDG',
      departureAirportIATA: 'JFK',
      departureDate: DateTime.fromJSDate(new Date()),
    });
    const copy = new MinimalLeg(leg);
    expect(leg).toStrictEqual(copy);
  });

  describe('#fromJSON', () => {
    it('should not be possible without departureDate', () => {
      expect(() =>
        MinimalLeg.fromJSON({
          arrival_airport_iata: 'CDG',
          departure_airport_iata: 'JFK',
          departure_date: null,
        }),
      ).toThrow('leg.departure_date is required');
    });

    it('should not be possible without arrival airport iata', () => {
      expect(() =>
        MinimalLeg.fromJSON({
          arrival_airport_iata: null,
          departure_airport_iata: 'JFK',
          departure_date: new Date().toISOString(),
        }),
      ).toThrow('leg.arrival_airport_iata is required');
    });

    it('should not be possible without departure airport iata', () => {
      expect(() =>
        MinimalLeg.fromJSON({
          arrival_airport_iata: 'CDG',
          departure_airport_iata: null,
          departure_date: new Date().toISOString(),
        }),
      ).toThrow('leg.departure_airport_iata is required');
    });
  });

  describe('#toJSON', () => {
    it('should not be possible to serialize to JSON', () => {
      const leg = MinimalLeg.fromJSON({
        arrival_airport_iata: 'CDG',
        departure_airport_iata: 'JFK',
        departure_date: '2020-06-15T17:46:14.369+03:00',
      });
      expect(JSON.stringify(leg, Object.keys(leg).sort())).toStrictEqual(
        JSON.stringify(
          {
            arrival_airport_iata: 'CDG',
            departure_airport_iata: 'JFK',
            departure_date: '2020-06-15T17:46:14.369+03:00',
          },
          Object.keys(leg).sort(),
        ),
      );
    });
  });
});
