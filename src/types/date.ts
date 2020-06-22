import {
  DateTime as LuxonDateTime,
  ToISOTimeOptions,
  DateTimeOptions,
} from 'luxon';

export default class DateTime extends LuxonDateTime {
  toISO(args?: ToISOTimeOptions): string {
    if (args.includeOffset && this.offset === 0) {
      const iso = super.toISO(args);
      return iso.replace('Z', '+00:00');
    }
    return super.toISO(args);
  }

  static fromISO(text: string, options?: DateTimeOptions): DateTime {
    const instance = LuxonDateTime.fromISO(text, options);
    instance.toISO = DateTime.prototype.toISO;
    instance.toJSON = () => DateTime.prototype.toISO({ includeOffset: true });
    return instance as DateTime;
  }
}
