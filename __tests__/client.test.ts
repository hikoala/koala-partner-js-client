import Client from '../src/types/client';

const clientData = new Client({
  firstName: 'Manu',
  lastName: 'Macron',
  email: 'presi@de.nt',
});

describe('#Client', () => {
  it('should not be possible to create without data', () => {
    expect(() => new Client(null)).toThrow();
  });

  it('should not be possible without firstName', () => {
    expect(
      () =>
        new Client({
          ...clientData,
          firstName: null,
        }),
    ).toThrow('client.firstName is required');
  });

  it('should not be possible without lastName', () => {
    expect(
      () =>
        new Client({
          ...clientData,
          lastName: null,
        }),
    ).toThrow('client.lastName is required');
  });

  it('should not be possible without email', () => {
    expect(
      () =>
        new Client({
          ...clientData,
          email: null,
        }),
    ).toThrow('client.email is required');
  });

  describe('#fromJSON', () => {
    it('should not be possible without first_name', () => {
      expect(() =>
        Client.fromJSON({
          ...clientData.toJSON(),
          first_name: undefined,
        }),
      ).toThrow('client.first_name is required');
    });
  });

  it('should not be possible without last_name', () => {
    expect(() =>
      Client.fromJSON({
        ...clientData.toJSON(),
        last_name: undefined,
      }),
    ).toThrow('client.last_name is required');
  });

  describe('#toJSON', () => {
    it('should not be possible to serialize to JSON', () => {
      const client = Client.fromJSON(clientData.toJSON());
      expect(JSON.stringify(client)).toStrictEqual(
        JSON.stringify(clientData.toJSON()),
      );
    });
  });
});
