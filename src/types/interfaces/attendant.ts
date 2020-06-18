import { default as MinimalAttendantInterface } from './attendant-min';

export default interface Interface extends Partial<MinimalAttendantInterface> {
  firstName: string;

  lastName: string;
}
