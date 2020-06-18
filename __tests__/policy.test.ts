import Policy from '../src/types/policy';

describe('#Policy', () => {
  it('should not be possible to create without data', () => {
    expect(() => new Policy(null)).toThrow();
  });

  it('should not be possible without products', () => {
    expect(
      () =>
        new Policy({
          products: null,
          price: { EUR: 310.1 },
        }),
    ).toThrow('policy.products is required');
  });

  it('should not be possible without price', () => {
    expect(
      () =>
        new Policy({
          products: [1, 2],
          price: null,
        }),
    ).toThrow('policy.price is required');
  });

  it('should not be create and copy a booking', () => {
    const policy = new Policy({
      products: [1, 2],
      price: { EUR: 310.1 },
    });
    const copy = new Policy(policy);
    expect(policy).toStrictEqual(copy);
  });

  describe('#fromJSON', () => {
    it('should not be possible without products', () => {
      expect(() =>
        Policy.fromJSON({
          products: null,
          price: { EUR: 310.2 },
        }),
      ).toThrow('policy.products is required');
    });
    it('should not be possible without price', () => {
      expect(() =>
        Policy.fromJSON({
          products: [1, 2],
          price: null,
        }),
      ).toThrow('policy.price is required');
    });
  });

  describe('#toJSON', () => {
    it('should not be possible to serialize to JSON', () => {
      const booking = Policy.fromJSON({
        price: { EUR: 310.2 },
        products: [1, 2],
      });
      const keys = Object.keys(booking).sort();
      expect(JSON.stringify(booking, keys)).toStrictEqual(
        JSON.stringify(
          {
            price: { EUR: 310.2 },
            products: [1, 2],
          },
          keys,
        ),
      );
    });
  });
});
