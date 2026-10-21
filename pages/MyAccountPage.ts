import { Page, Locator } from '@playwright/test';

export class MyAccountPage {
  private readonly page: Page;

  // Locators
  private readonly heading: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.heading = page.getByRole('heading', { name: 'My Account' });
    this.logoutLink = page.locator('a[href*="route=account/logout"]').first();
  }

  async isMyAccountPageExists(): Promise<boolean> {
    try {
      return await this.heading.isVisible();
    } catch (error) {
      console.log(`Error checking my account page: ${error}`);
      return false;
    }
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
