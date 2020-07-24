import DateTime from '../date';

export default interface Interface {
  start: DateTime | string;
  end: DateTime | string;
  countryCode: string;
}
