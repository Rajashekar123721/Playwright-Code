const {test, expect} = require('@playwright/test');
// const console = require('node:console');

// Store event title and seats across tests
let eventTitle;
let seatsBeforeBooking;
let seatsAfterBooking;
let bookingRef;
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

// Helper function for login
async function login(page, email = 'shekar@gmail.com', password = 'Iamking@000') {
    await page.goto(BASE_URL);
    const userName = page.getByPlaceholder('you@email.com');
    await expect(userName).toBeVisible();
    await userName.fill(email);
    const passwordField = page.getByLabel('Password');
    await expect(passwordField).toBeVisible();
    await passwordField.fill(password);
    await page.locator('#login-btn').click();
    
    // Assert: login successful by checking for Admin button
    await expect(page.getByRole('button', { name: 'Admin' })).toBeVisible();
    }

// Helper function to get future date value
function futureDateValue() {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const day = String(futureDate.getDate()).padStart(2, '0');
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = futureDate.getFullYear();

    const hours="10";
    const minutes="30";
    // return `${day}-${month}-${year}`;
    return`${year}-${month}-${day}T${hours}:${minutes}`;
}


test('Create a new event', async ({ page }) => {
    await login(page);
    
    // Navigate to /admin/events
    await page.goto(`${BASE_URL}/admin/events`);
   
    // Generate unique event title
    eventTitle = `Test Event ${Date.now()}`;
    
    // Fill Title field
    const titleInput = page.locator('#event-title-input');
    await expect(titleInput).toBeVisible();
    await titleInput.fill(eventTitle);
    
    // Fill Description textarea
    const description = page.locator('#admin-event-form textarea');
    await expect(description).toBeVisible();
    await description.fill('This is a test event description');
    
    // Fill City field
    const cityField = page.getByLabel('City');
    await expect(cityField).toBeVisible();
    await cityField.fill('New York');
    
    // Fill Venue field
    const venueField = page.getByLabel('Venue');
    await expect(venueField).toBeVisible();
    await venueField.fill('Madison Square Garden');
    
    // Fill Event Date & Time field
    const dateTimeField = page.getByLabel('Event Date & Time');
    await expect(dateTimeField).toBeVisible();
    await dateTimeField.fill(futureDateValue());
    
    // Fill Price ($) field
    const priceField = page.getByLabel('Price ($)');
    await expect(priceField).toBeVisible();
    await priceField.fill('100');
    
    // Fill Total Seats field
    const seatsField = page.getByLabel('Total Seats');
    await expect(seatsField).toBeVisible();
    await seatsField.fill('50');
    
    // Click submit button
    await page.locator('#add-event-btn').click();
    
    // Assert: toast message is visible
    await expect(page.getByText('Event created!')).toBeVisible();
    console.log(`Created event: "${eventTitle}"`);
});

test('Find the event card and capture seats', async ({ page }) => {
    await login(page);
    
    // Navigate to /events
    await page.goto(`${BASE_URL}/events`);
    
    // Get all event cards
    const eventCards = page.locator('[data-testid="event-card"]');
    
    // Wait for at least one event card to be present
    await page.waitForSelector('[data-testid="event-card"]');
    
    // Assert the first card is visible
    await expect(eventCards.first()).toBeVisible();
    
    // Filter for the card containing the event title
    const filteredCard = page.locator(`[data-testid="event-card"]:has-text("${eventTitle}")`).first();
    
    // Assert the matched card is visible with 5 second timeout
    await expect(filteredCard).toBeVisible({ timeout: 5000 });

    // Scroll the card into view
    await filteredCard.scrollIntoViewIfNeeded();

    // Highlight the card so it stands out in the screenshot
    await filteredCard.evaluate(card => {
        card.style.outline = '4px solid red';
        card.style.transition = 'outline 0.2s ease-in-out';
    });

    // Capture the highlighted card screenshot
    await filteredCard.screenshot({ path: 'filtered-card.png' });
    
    // Read seat count from the card (locate element containing text "seat")
    const seatElement = filteredCard.locator('text=/seat/i').first();
    const seatCountText = await seatElement.innerText();
    seatsBeforeBooking = parseInt(seatCountText.match(/\d+/)[0]);
    
    console.log(`Seats before booking: ${seatsBeforeBooking}`);
});

test('Start booking the matched event', async ({ page }) => {
    await login(page);

    // Navigate to /events
    await page.goto(`${BASE_URL}/events`);

    // Locate the matched event card again
    const filteredCard = page.locator(`[data-testid="event-card"]:has-text("${eventTitle}")`).first();
    await expect(filteredCard).toBeVisible({ timeout: 5000 });
    await filteredCard.scrollIntoViewIfNeeded();

    // Click the Book Now button inside the matched card
    const bookNowButton = filteredCard.locator('[data-testid="book-now-btn"]');
    await expect(bookNowButton).toBeVisible();
    await bookNowButton.click();
});

test('Fill booking form', async ({ page }) => {
    await login(page);

    // Navigate to /events
    await page.goto(`${BASE_URL}/events`);

    // Locate the matched event card and open booking form
    const filteredCard = page.locator(`[data-testid="event-card"]:has-text("${eventTitle}")`).first();
    await expect(filteredCard).toBeVisible({ timeout: 5000 });
    await filteredCard.scrollIntoViewIfNeeded();
    const bookNowButton = filteredCard.locator('[data-testid="book-now-btn"]');
    await expect(bookNowButton).toBeVisible();
    await bookNowButton.click();

    // Assert default ticket count is 1
    await expect(page.locator('#ticket-count')).toHaveText('1');

    // Fill booking details
    await page.getByLabel('Full Name').fill('Test User');
    await page.locator('#customer-email').fill('testuser@example.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 98765 43210');

    // Confirm booking
    await page.locator('.confirm-booking-btn').click();

    // Verify booking confirmation
    const bookingRefElement = page.locator('.booking-ref').first();
    await expect(bookingRefElement).toBeVisible();
    bookingRef = (await bookingRefElement.innerText()).trim();
    console.log(`Booking reference: ${bookingRef}`);
});

test('Verify booking appears in My Bookings', async ({ page }) => {
    await login(page);

    // Click View My Bookings
    await page.goto(`${BASE_URL}/bookings`);

    // Assert URL is BASE_URL/bookings
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    // Get all booking cards and assert first card visibility
    const bookingCards = page.locator('#booking-card');
    await expect(bookingCards.first()).toBeVisible();

    // Filter booking cards for the one matching the booking reference
    const matchedBookingCard = page.locator(`#booking-card:has(.booking-ref:has-text("${bookingRef}"))`).first();
    await expect(matchedBookingCard).toBeVisible();
    await expect(matchedBookingCard).toContainText(eventTitle);

    // Highlight the matched booking card and capture a screenshot
    await matchedBookingCard.scrollIntoViewIfNeeded();
    await matchedBookingCard.evaluate(card => {
        card.style.outline = '4px solid blue';
        card.style.transition = 'outline 0.2s ease-in-out';
    });
    await matchedBookingCard.screenshot({ path: 'matched-booking-card.png' });
});

test('Verify seat reduction after booking', async ({ page }) => {
    await login(page);

    // Navigate back to /events
    await page.goto(`${BASE_URL}/events`);

    // Assert the first event card is visible
    const eventCards = page.locator('[data-testid="event-card"]');
    await expect(eventCards.first()).toBeVisible();

    // Filter cards again using the event title
    const matchedEventCard = page.locator(`[data-testid="event-card"]:has-text("${eventTitle}")`).first();
    await expect(matchedEventCard).toBeVisible({ timeout: 5000 });

    // Read the seat count text again
    const seatElement = matchedEventCard.locator('text=/seat/i').first();
    const seatCountText = await seatElement.innerText();
    seatsAfterBooking = parseInt(seatCountText.match(/\d+/)[0]);

    // Highlight the matched event card and capture a screenshot of the updated seat count
    await matchedEventCard.scrollIntoViewIfNeeded();
    await matchedEventCard.evaluate(card => {
        card.style.outline = '4px solid green';
        card.style.transition = 'outline 0.2s ease-in-out';
    });
    await matchedEventCard.screenshot({ path: 'seats-after-booking.png' });

    // Assert the seat count decreased by 1
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});


