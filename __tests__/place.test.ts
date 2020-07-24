import MinimalPlace from '../src/types/place-min';
import Place from '../src/types/place';

const placeData = {
  start: '2020-07-23T22:20:01.467Z',
  end: '2020-07-23T22:20:01.467Z',
  countryCode: 'fr'
};

const data = {
  ...placeData,
  name: 'place',
  description: 'A splendid place',
  partnerInternalId: 'placeId',
  lang: 'fr'
}

const min = new MinimalPlace(placeData);
const place = new Place(data);

describe('#MinimalPlace', () => {
  it('should not be possible to create without data', () => {
    expect(() => new MinimalPlace(null)).toThrow();
  });

  it('should not be possible without start', () => {
    expect(
      () =>
        new MinimalPlace({
          ...placeData,
          start: null,
        }),
    ).toThrow('place.start is required');
  });

  it('should not be possible without end', () => {
    expect(
      () =>
        new MinimalPlace({
          ...placeData,
          end: null,
        }),
    ).toThrow('place.end is required');
  });

  it('should not be possible without countryCode', () => {
    expect(
      () =>
        new MinimalPlace({
          ...placeData,
          countryCode: null,
        }),
    ).toThrow('place.countryCode is required');
  });

  describe('#fromJSON', () => {
    it('should not be possible without start', () => {
      expect(() =>
        MinimalPlace.fromJSON({
          ...min.toJSON(),
          start: undefined,
        }),
      ).toThrow('place.start is required');
    });

    it('should not be possible without end', () => {
      expect(() =>
        MinimalPlace.fromJSON({
          ...min.toJSON(),
          end: undefined,
        }),
      ).toThrow('place.end is required');
    });

    it('should not be possible without country_code', () => {
      expect(() =>
        MinimalPlace.fromJSON({
          ...min.toJSON(),
          country_code: undefined,
        }),
      ).toThrow('place.country_code is required');
    });
  });

  describe('#toJSON', () => {
    it('should not be possible to serialize to JSON', () => {
      const place = MinimalPlace.fromJSON(min.toJSON());
      expect(JSON.stringify(place)).toStrictEqual(
        JSON.stringify(min.toJSON()),
      );
    });
  });
});

describe('#Place', () => {
  it('should not be possible to create without data', () => {
    expect(() => new Place(null)).toThrow();
  });

  it('should not be possible without name', () => {
    expect(
      () =>
        new Place({
          ...data,
          name: null,
        }),
    ).toThrow('place.name is required');
  });

  it('should not be possible without lang', () => {
    expect(
      () =>
        new Place({
          ...data,
          lang: null,
        }),
    ).toThrow('place.lang is required');
  });

  it('should not be possible without partnerInternalId', () => {
    expect(
      () =>
        new Place({
          ...data,
          partnerInternalId: null,
        }),
    ).toThrow('place.partnerInternalId is required');
  });

  describe('#fromJSON', () => {
    it('should not be possible without name', () => {
      expect(() =>
        Place.fromJSON({
          ...place.toJSON(),
          name: undefined,
        }),
      ).toThrow('place.name is required');
    });

    it('should not be possible without lang', () => {
      expect(() =>
        Place.fromJSON({
          ...place.toJSON(),
          lang: undefined,
        }),
      ).toThrow('place.lang is required');
    });

    it('should not be possible without partner_internal_id', () => {
      expect(() =>
        Place.fromJSON({
          ...place.toJSON(),
          partner_internal_id: undefined,
        }),
      ).toThrow('place.partner_internal_id is required');
    });
  });

  describe('#toJSON', () => {
    it('should not be possible to serialize to JSON', () => {
      const p = Place.fromJSON(place.toJSON());
      expect(JSON.stringify(p)).toStrictEqual(
        JSON.stringify(place.toJSON()),
      );
    });
  });
});
