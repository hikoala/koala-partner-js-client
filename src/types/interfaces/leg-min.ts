import DateTime from '../date';

export default interface Interface {
  departureDate: DateTime | string;

  departureAirportIATA: string;

  arrivalAirportIATA: string;
}
