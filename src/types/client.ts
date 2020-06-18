import { getField } from './validators';
import { default as AttendantInterface } from './interfaces/attendant';
import { default as AttendantJSON } from './JSON/attendant';

interface Interface extends AttendantInterface {
  email: string;
}

interface JSON extends AttendantJSON {
  email: string;
}

export default class Client implements Interface {
  firstName: string;

  lastName: string;

  email: string;

  constructor(data: Interface) {
    this.firstName = getField(data.firstName, 'client.firstName');
    this.lastName = getField(data.lastName, 'client.lastName');
    this.email = getField(data.email, 'client.email');
  }

  static fromJSON(data: JSON): Client {
    return new Client({
      firstName: getField(data.first_name, 'client.first_name'),
      lastName: getField(data.last_name, 'client.last_name'),
      email: getField(data.email, 'client.email'),
    });
  }

  toJSON(): JSON {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
    };
  }
}
