import MinimalLeg from '../src/types/leg-min';
import Leg from '../src/types/leg';
import DateTime from '../src/types/date';

const minimalLeg = new MinimalLeg({
  arrivalAirportIATA: 'CDG',
  departureAirportIATA: 'JFK',
  departureDate: DateTime.fromJSDate(new Date()),
});

const minimalLegJSON = minimalLeg.toJSON();

describe('#Leg', () => {
  it('should not be possible to create without data', () => {
    expect(() => new Leg(null)).toThrow();
  });

  it('should not be possible without arrivalDate', () => {
    expect(() =>
      Leg.extendMinimal(minimalLeg, {
        airlineIATA: 'AF',
        flightNumber: '1312',
        arrivalDate: null,
      }),
    ).toThrow('leg.arrivalDate is required');
  });

  it('should not be possible with an ill-formed date', () => {
    const date = DateTime.fromISO('31');
    expect(() =>
      Leg.extendMinimal(minimalLeg, {
        airlineIATA: 'AF',
        flightNumber: '1312',
        arrivalDate: date,
      }),
    ).toThrow('Invalid date');
  });

  it('should not be possible with an ill-formed iso date', () => {
    expect(() =>
      Leg.extendMinimal(minimalLeg, {
        airlineIATA: 'AF',
        flightNumber: '1312',
        arrivalDate: '31',
      }),
    ).toThrow('Invalid date');
  });

  it('should not be possible without arrival airline iata', () => {
    expect(() =>
      Leg.extendMinimal(minimalLeg, {
        airlineIATA: null,
        flightNumber: '1312',
        arrivalDate: DateTime.fromJSDate(new Date()),
      }),
    ).toThrow('leg.airlineIATA is required');
  });

  it('should not be possible without flight number', () => {
    expect(() =>
      Leg.extendMinimal(minimalLeg, {
        airlineIATA: 'AF',
        flightNumber: null,
        arrivalDate: DateTime.fromJSDate(new Date()),
      }),
    ).toThrow('leg.flightNumber is required');
  });

  it('should not be possible to create from a minimalLeg and copy', () => {
    const leg = Leg.extendMinimal(minimalLeg, {
      airlineIATA: 'AF',
      flightNumber: '1312',
      arrivalDate: DateTime.fromJSDate(new Date()),
    });
    const copy = new Leg(leg);
    expect(leg).toStrictEqual(copy);
  });

  it('should not be possible to create a leg using iso date string', () => {
    const leg = Leg.extendMinimal(minimalLeg, {
      airlineIATA: 'AF',
      flightNumber: '1312',
      arrivalDate: '2020-06-18T16:52:33.227Z',
    });
    const copy = new Leg(leg);
    expect(leg).toStrictEqual(copy);
  });

  it('should not be possible to create and copy', () => {
    const leg = new Leg({
      arrivalAirportIATA: 'CDG',
      departureAirportIATA: 'JFK',
      departureDate: DateTime.fromJSDate(new Date()),
      airlineIATA: 'AF',
      flightNumber: '1312',
      arrivalDate: DateTime.fromJSDate(new Date()),
    });
    const copy = new Leg(leg);
    expect(leg).toStrictEqual(copy);
  });

  describe('#fromJSON', () => {
    it('should not be possible without departureDate', () => {
      expect(() =>
        Leg.fromJSON({
          ...minimalLegJSON,
          airline_iata: 'AF',
          flight_number: '1312',
          arrival_date: null,
        }),
      ).toThrow('leg.arrival_date is required');
    });

    it('should not be possible without airport iata', () => {
      expect(() =>
        Leg.fromJSON({
          ...minimalLegJSON,
          airline_iata: null,
          flight_number: '1312',
          arrival_date: new Date().toISOString(),
        }),
      ).toThrow('leg.airline_iata is required');
    });

    it('should not be possible without flight number', () => {
      expect(() =>
        Leg.fromJSON({
          ...minimalLegJSON,
          airline_iata: 'AF',
          flight_number: null,
          arrival_date: new Date().toISOString(),
        }),
      ).toThrow('leg.flight_number is required');
    });
  });

  describe('#toJSON', () => {
    it('should not be possible to serialize to JSON', () => {
      const leg = Leg.fromJSON({
        arrival_airport_iata: 'CDG',
        departure_airport_iata: 'JFK',
        departure_date: '2020-06-15T17:46:14.369+03:00',
        airline_iata: 'AF',
        flight_number: '1312',
        arrival_date: '2020-06-16T17:46:14.369-02:00',
      });
      expect(JSON.stringify(leg, Object.keys(leg).sort())).toStrictEqual(
        JSON.stringify(
          {
            arrival_airport_iata: 'CDG',
            departure_airport_iata: 'JFK',
            departure_date: '2020-06-15T17:46:14.369+03:00',
            airline_iata: 'AF',
            flight_number: '1312',
            arrival_date: '2020-06-16T17:46:14.369-02:00',
          },
          Object.keys(leg).sort(),
        ),
      );
    });
  });
});
