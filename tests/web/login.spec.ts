/**
 * Test Case: Successful OpenCart login
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the login page
 * 2) Log in with the helper-defined customer credentials
 * 3) Verify the My Account page is displayed
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Successful Login @master @sanity @regression @web', async ({
  page,
  homePage,
  loginPage,
  myAccountPage,
}) => {
  const { email, password } = Helper.getLoginDetails();

  await test.step('1) Navigate to the login page', async () => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    expect(await loginPage.isLoginPageVisible()).toBeTruthy();
  });

  await test.step('2) Log in with the helper-defined customer credentials', async () => {
    await loginPage.login(email, password);
  });

  await test.step('3) Verify the My Account page is displayed', async () => {
    await expect(page).toHaveURL(/route=account\/account/);
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
  });

  console.log('✅ Successful OpenCart login completed successfully!');
});
