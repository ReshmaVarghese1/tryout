import { faker } from '@faker-js/faker';

export type CustomerData = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
};

export class RandomDataUtil {
  static generateCustomer(): CustomerData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const uniqueId = Date.now();

    return {
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}+${uniqueId}@example.com`,
      telephone: faker.phone.number({ style: 'national' }).replace(/\D/g, '').slice(0, 10) || '9876543210',
      password: 'Test@1234',
    };
  }
}
