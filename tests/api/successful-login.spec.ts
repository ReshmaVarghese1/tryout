import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';

dotenv.config();

test.describe('FakeStore Authentication API Tests', () => {
  const baseUrl = process.env.API_BASE_URL || Routes.BASE_URL;

  test('POST - Successful login @master @sanity @api', async ({ request }) => {
    const username = process.env.API_USERNAME || 'mor_2314';
    const password = process.env.API_PASSWORD || '83r5^_';

    const response = await request.post(`${baseUrl}${Routes.AUTH_LOGIN}`, {
      data: { username, password },
    });

    expect(response.status(), 'Successful login should return HTTP 201').toBe(201);

    const responseBody = await response.json();
    expect(responseBody, 'Login response should include a token property').toHaveProperty('token');
    expect(typeof responseBody.token, 'Authentication token should be a string').toBe('string');
    expect(responseBody.token.trim().length, 'Authentication token should not be empty').toBeGreaterThan(0);
  });
});
