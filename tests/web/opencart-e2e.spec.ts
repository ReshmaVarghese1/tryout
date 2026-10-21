/**
 * Test Case: OpenCart customer end-to-end flow
 *
 * Tags: @master @sanity @regression @e2e
 *
 * Steps:
 * 1) Register a new customer
 * 2) Log in again using the newly created account
 * 3) Search for the helper-defined product and add it to the cart
 * 4) Validate the cart items and total
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('OpenCart end-to-end customer journey @master @sanity @regression @e2e', async ({
  page,
  homePage,
  registerPage,
  loginPage,
  myAccountPage,
  productPage,
  cartPage,
}) => {
  const customer = RandomDataUtil.generateCustomer();
  const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

  await test.step('1) Register a new customer', async () => {
    await homePage.open();
    await homePage.clickMyAccount();
    await homePage.clickRegister();
    await registerPage.isRegisterPageVisible();

    await registerPage.register({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      telephone: customer.telephone,
      password: customer.password,
      newsletter: false,
    });

    await expect(page.url()).toContain('route=account/success');
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  await test.step('2) Log out and log in again using the new account', async () => {
    await homePage.clickMyAccount();
    await myAccountPage.logout();
    await page.goto(`${process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/'}index.php?route=account/login`);
    await loginPage.login(customer.email, customer.password);
    await expect(page).toHaveURL(/route=account\/account/);
  });

  await test.step('3) Search and add product to cart', async () => {
    await homePage.search(productName);
    await productPage.openFromSearchResult(productName);
    await productPage.addToCart();
    await expect(productPage.successMessage).toContainText(/Success/i);

    await cartPage.open();
    await cartPage.expectProductInCart(productName);
    await cartPage.expectQuantity(productQuantity);
    await cartPage.expectTotal(totalPrice);
  });

  console.log('✅ OpenCart end-to-end customer journey completed successfully!');
});
