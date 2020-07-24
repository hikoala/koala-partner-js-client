import MinimalFlight from '../flight-min';
import MinimalAttendant from '../attendant-min';
import MinimalPlace from '../place-min';

export default interface Interface<
  FlightType = MinimalFlight,
  AttendantType = MinimalAttendant,
  PlaceType = MinimalPlace
  > {
  flights: FlightType[];

  places: PlaceType[];

  attendants: AttendantType[];

  price: number;

  currencyCode?: string;
}
