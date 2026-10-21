import { Page, Locator } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;

  // Locators
  private readonly productHeading: Locator;
  private readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;
  public readonly successMessage: Locator;
  private readonly productLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.productHeading = page.getByRole('heading', { name: 'MacBook' });
    this.quantityInput = page.locator('input[name="quantity"]');
    this.addToCartButton = page.locator('button#button-cart');
    this.successMessage = page.locator('.alert-success');
    this.productLink = page.locator('a[href*="product_id=43"]').first();
  }

  async openByProductId(productId: number): Promise<void> {
    await this.page.goto(`${process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/'}index.php?route=product/product&product_id=${productId}`);
  }

  async openFromSearchResult(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).first().click();
  }

  async addToCart(): Promise<void> {
    await this.quantityInput.fill('1');
    await this.addToCartButton.click();
  }

  async isProductPageVisible(): Promise<boolean> {
    try {
      return await this.productHeading.isVisible();
    } catch (error) {
      console.log(`Error checking product page: ${error}`);
      return false;
    }
  }
}
