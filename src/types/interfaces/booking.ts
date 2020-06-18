import MinimalFlight from '../flight-min';
import MinimalAttendant from '../attendant-min';

export default interface Interface<
  FlightType = MinimalFlight,
  AttendantType = MinimalAttendant
> {
  flights: FlightType[];

  attendants: AttendantType[];

  price: number;

  currencyCode?: string;
}
