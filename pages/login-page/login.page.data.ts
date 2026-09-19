import { User } from './login.page.interfaces';

export class LoginPageData {
  static get validUser(): User {
    return {
      email: process.env.CUSTOMER_EMAIL!,
      password: process.env.CUSTOMER_PASSWORD!,
    };
  }

  static get secondaryUser(): User {
    return {
      email: process.env.CUSTOMER2_EMAIL!,
      password: process.env.CUSTOMER2_PASSWORD!,
    };
  }

  static get adminUser(): User {
    return {
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
    };
  }

  static get invalidUser(): User {
    return {
      email: 'invalid.user@practicesoftwaretesting.com',
      password: 'wrongPassword123',
    };
  }

  static get errorMessages() {
    return {
      invalidCredentials: 'Invalid email or password',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      emailFormatInvalid: 'Email format is invalid',
      passwordLengthInvalid: 'Password length is invalid',
    };
  }
}
