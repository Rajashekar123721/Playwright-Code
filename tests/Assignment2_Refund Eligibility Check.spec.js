const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const USER_EMAIL = 'shekar@gmail.com';
const USER_PASSWORD = 'Iamking@000';
const CUSTOMER_NAME = 'Test User';
const CUSTOMER_EMAIL = 'testuser@example.com';
const CUSTOMER_PHONE = '+91 98765 43210';

async function loginAndGoToBooking(page) {
  await page.goto(BASE_URL);
  await expect(page.getByPlaceholder('you@email.com')).toBeVisible();
  await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
  await expect(page.getByLabel('Password')).toBeVisible();
  await page.getByLabel('Password').fill(USER_PASSWORD);
  await page.locator('#login-btn').click();
  const browseEventsLink = page.getByRole('link', { name: 'Browse Events' });
  await expect(browseEventsLink).toBeVisible();
  return browseEventsLink;
}

async function bookFirstEvent(page, ticketCount = 1) {
  await page.goto(`${BASE_URL}/events`);

  const firstEventCard = page.locator('[data-testid="event-card"]').first();
  await expect(firstEventCard).toBeVisible();

  const bookNowButton = firstEventCard.locator('[data-testid="book-now-btn"]');
  await expect(bookNowButton).toBeVisible();
  await bookNowButton.click();

  if (ticketCount > 1) {
    const incrementButton = page.locator('button:has-text("+")').first();
    await expect(incrementButton).toBeVisible();
    for (let i = 0; i < ticketCount - 1; i++) {
      await incrementButton.click();
    }
  }

  await expect(page.getByLabel('Full Name')).toBeVisible();
  await page.getByLabel('Full Name').fill(CUSTOMER_NAME);
  await expect(page.locator('#customer-email')).toBeVisible();
  await page.locator('#customer-email').fill(CUSTOMER_EMAIL);
  await expect(page.getByPlaceholder('+91 98765 43210')).toBeVisible();
  await page.getByPlaceholder('+91 98765 43210').fill(CUSTOMER_PHONE);
  await expect(page.locator('.confirm-booking-btn')).toBeVisible();
  await page.locator('.confirm-booking-btn').click();
}

test('Single ticket booking is eligible for refund', async ({ page }) => {
  await loginAndGoToBooking(page);

  await bookFirstEvent(page, 1);

//   await page.getByRole('link', { name: 'View My Bookings' }).click();
  await page.goto(`${BASE_URL}/bookings`);
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  const firstViewDetails = page.getByRole('link', { name: 'View Details' }).first();
  await expect(firstViewDetails).toBeVisible();
  await firstViewDetails.click();

  await expect(page.getByText('Booking Information')).toBeVisible();

  const bookingRef = (await page.locator('.booking-ref').innerText()).trim();
  const eventTitle = (await page.locator('h1').innerText()).trim();
  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  const refundButton = page.locator('button:has-text("Check Refund Eligibility")');
  await expect(refundButton).toBeVisible();
  await refundButton.click();

  const spinner = page.locator('#refund-spinner');
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });

  const refundResult = page.locator('#refund-result');
  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText('Eligible for refund');
  await expect(refundResult).toContainText('Single-ticket bookings qualify for a full refund');
});

test('Group ticket booking is NOT eligible for refund', async ({ page }) => {
  await loginAndGoToBooking(page);

  await bookFirstEvent(page, 3);

  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  const firstViewDetails = page.getByRole('link', { name: 'View Details' }).first();
  await expect(firstViewDetails).toBeVisible();
  await firstViewDetails.click();

  await expect(page.getByText('Booking Information')).toBeVisible();

  const bookingRef = (await page.locator('.booking-ref').innerText()).trim();
  const eventTitle = (await page.locator('h1').innerText()).trim();
  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  const refundButton = page.locator('button:has-text("Check Refund Eligibility")');
  await expect(refundButton).toBeVisible();
  await refundButton.click();

  const spinner = page.locator('#refund-spinner');
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });

  const refundResult = page.locator('#refund-result');
  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText('Not eligible for refund');
  await expect(refundResult).toContainText('Group bookings (3 tickets) are non-refundable');
});
