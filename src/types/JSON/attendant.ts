import { default as MinimalAttendantJSON } from './attendant-min';

export default interface JSON extends Partial<MinimalAttendantJSON> {
  first_name: string;

  last_name: string;
}
