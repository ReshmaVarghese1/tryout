import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;

  // Locators
  private readonly cartTable: Locator;
  private readonly productNameCell: Locator;
  private readonly quantityCell: Locator;
  private readonly totalCell: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.cartTable = page.locator('table.table.table-bordered');
    this.productNameCell = page.locator('td').filter({ hasText: 'MacBook' }).first();
    this.quantityCell = this.cartTable.locator('input[type="text"]').first();
    this.totalCell = page.locator('td.text-right strong');
  }

  async open(): Promise<void> {
    await this.page.goto(`${process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/'}index.php?route=checkout/cart`);
  }

  async expectProductInCart(productName: string): Promise<void> {
    const productLink = this.page.getByRole('link', { name: productName, exact: true }).first();
    await expect(productLink).toBeVisible({ timeout: 15000 });
  }

  async expectQuantity(expectedQuantity: number): Promise<void> {
    await this.quantityCell.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.quantityCell).toHaveValue(String(expectedQuantity));
  }

  async expectTotal(expectedTotal: string): Promise<void> {
    const totalCell = this.page.locator('td').filter({ hasText: expectedTotal }).last();
    await expect(totalCell).toBeVisible({ timeout: 15000 });
  }
}
