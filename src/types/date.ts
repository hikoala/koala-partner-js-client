import { DateTime as LuxonDateTime, ToISOTimeOptions } from 'luxon';

export default class DateTime extends LuxonDateTime {
  toISO(args?: ToISOTimeOptions): string {
    if (args === undefined) return super.toISO();
    if (args.includeOffset && this.offset === 0) {
      const iso = super.toISO(args);
      return iso.replace('Z', '-00:00');
    }
    return super.toISO(args);
  }

  static fromISO(text: string): DateTime {
    const instance = LuxonDateTime.fromISO(text, {
      setZone: true,
    });
    instance.toISO = DateTime.prototype.toISO;
    instance.toJSON = function () {
      return this.toISO({ includeOffset: true });
    };
    return instance as DateTime;
  }
}
