import { step } from 'allure-js-commons';

export class AllureLogger {
  static async logStep<T>(description: string, action: () => Promise<T> | T): Promise<T> {
    return step(`Step: ${description}`, action);
  }

  static async logVerification<T>(description: string, action: () => Promise<T> | T): Promise<T> {
    return step(`Verification: ${description}`, action);
  }

  static async logPreCondition<T>(description: string, action: () => Promise<T> | T): Promise<T> {
    return step(`Precondition: ${description}`, action);
  }

  static async logPostCondition<T>(description: string, action: () => Promise<T> | T): Promise<T> {
    return step(`Postcondition: ${description}`, action);
  }
}
