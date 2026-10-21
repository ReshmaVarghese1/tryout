import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly alertWarning: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Login"], button[type="submit"]').first();
    this.alertWarning = page.locator('.alert.alert-danger');
  }

  async isLoginPageVisible(): Promise<boolean> {
    try {
      return await this.emailInput.isVisible();
    } catch (error) {
      console.log(`Error checking login page: ${error}`);
      return false;
    }
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getWarningText(): Promise<string> {
    try {
      return (await this.alertWarning.textContent()) ?? '';
    } catch (error) {
      console.log(`Error reading login warning: ${error}`);
      return '';
    }
  }
}
