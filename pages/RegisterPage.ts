import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  private readonly page: Page;

  // Locators
  private readonly title: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly telephoneInput: Locator;
  private readonly passwordInput: Locator;
  private readonly passwordConfirmInput: Locator;
  private readonly privacyPolicyCheckbox: Locator;
  private readonly continueButton: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.title = page.getByRole('heading', { name: 'Register Account' });
    this.firstNameInput = page.locator('input[name="firstname"]');
    this.lastNameInput = page.locator('input[name="lastname"]');
    this.emailInput = page.locator('input[name="email"]');
    this.telephoneInput = page.locator('input[name="telephone"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.passwordConfirmInput = page.locator('input[name="confirm"]');
    this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
    this.continueButton = page.locator('input[value="Continue"], button[type="submit"]').first();
    this.successMessage = page.getByText('Your Account Has Been Created!');
  }

  async isRegisterPageVisible(): Promise<boolean> {
    try {
      return await this.title.isVisible();
    } catch (error) {
      console.log(`Error checking register page: ${error}`);
      return false;
    }
  }

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    newsletter?: boolean;
  }): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.telephoneInput.fill(data.telephone);
    await this.passwordInput.fill(data.password);
    await this.passwordConfirmInput.fill(data.password);

    if (data.newsletter !== undefined) {
      const newsletterRadio = data.newsletter ? this.page.getByLabel('Yes') : this.page.getByLabel('No');
      await newsletterRadio.check();
    }

    await this.privacyPolicyCheckbox.check();
    await this.continueButton.click();
  }

  async isRegistrationSuccess(): Promise<boolean> {
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 15000 });
      return true;
    } catch (error) {
      console.log(`Error checking registration success: ${error}`);
      return false;
    }
  }
}
