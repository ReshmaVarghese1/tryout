import { Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly myAccountLink: import('@playwright/test').Locator;
  private readonly loginLink: import('@playwright/test').Locator;
  private readonly registerLink: import('@playwright/test').Locator;
  private readonly searchBox: import('@playwright/test').Locator;
  private readonly searchButton: import('@playwright/test').Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.myAccountLink = page.locator('a[href*="route=account/account"]').first();
    this.loginLink = page.locator('a[href*="route=account/login"]').first();
    this.registerLink = page.locator('a[href*="route=account/register"]').first();
    this.searchBox = page.locator('input[name="search"]').first();
    this.searchButton = page.locator('button[type="submit"]').first();
  }

  async open(): Promise<void> {
    await this.page.goto(process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/');
  }

  async clickMyAccount(): Promise<void> {
    await this.myAccountLink.click();
  }

  async clickLogin(): Promise<void> {
    const loginLink = this.page.locator('a[href*="route=account/login"]').first();
    const visibleLogin = this.page.getByRole('link', { name: 'Login' }).first();

    if (await loginLink.count()) {
      await loginLink.click();
      return;
    }

    if (await visibleLogin.count()) {
      await visibleLogin.click();
      return;
    }

    await this.page.goto(`${process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/'}index.php?route=account/login`);
  }

  async clickRegister(): Promise<void> {
    await this.registerLink.click();
  }

  async search(productName: string): Promise<void> {
    const searchInput = this.page.locator('input[name="search"]').first();
    const searchButton = this.page.locator('button').filter({ has: this.page.locator('i.fa-search') }).first();

    await searchInput.fill(productName);
    await searchButton.click();
  }

  async isHomePageVisible(): Promise<boolean> {
    try {
      return await this.page.getByRole('heading', { name: /Featured/i }).isVisible();
    } catch (error) {
      console.log(`Error checking home page: ${error}`);
      return false;
    }
  }
}
