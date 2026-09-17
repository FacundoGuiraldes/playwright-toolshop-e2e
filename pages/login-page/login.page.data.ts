export class LoginPageData {
  static get validUser() {
    return {
      email: process.env.CUSTOMER_EMAIL!,
      password: process.env.CUSTOMER_PASSWORD!,
    };
  }

  static get invalidUser() {
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
