import DateTime from '../src/types/date';

describe('#Date', () => {
  it('#toJSON', () => {
    expect(DateTime.fromISO('2020-06-18T16:52:33.227+10:00').toJSON()).toBe(
      '2020-06-18T16:52:33.227+10:00',
    );
  });

  describe('#toISO', () => {
    it('should include offset if not asked (with offset)', () => {
      expect(DateTime.fromISO('2020-06-18T16:52:33.227+10:00').toISO()).toBe(
        '2020-06-18T16:52:33.227+10:00',
      );
    });

    it('should not include offset if asked', () => {
      expect(DateTime.fromISO('2020-06-18T16:52:33.227Z').toISO()).toBe(
        '2020-06-18T16:52:33.227Z',
      );
    });

    it('should not include offset if asked even if 0', () => {
      expect(
        DateTime.fromISO('2020-06-18T16:52:33.227Z').toISO({
          includeOffset: true,
        }),
      ).toBe('2020-06-18T16:52:33.227-00:00');
    });
  });
});
