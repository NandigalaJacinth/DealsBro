// Background script for handling price data and notifications
let priceHistory = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PRICE_DATA') {
    const { price, url } = message;
    if (!priceHistory[url]) {
      priceHistory[url] = [];
    }
    priceHistory[url].push({ price, date: new Date() });

    // Store data in local storage
    chrome.storage.local.set({ priceHistory });

    // Check if it's the lowest price
    const prices = priceHistory[url].map(item => item.price);
    const lowestPrice = Math.min(...prices);
    if (price === lowestPrice) {
      // Notify the user
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Lowest Price Alert!',
        message: `The price for the item at ${url} is at its lowest: $${price}`
      });
    }
  } else if (message.type === 'GET_PRICE_HISTORY') {
    chrome.storage.local.get('priceHistory', (data) => {
      sendResponse(data.priceHistory || {});
    });
    return true;
  }
});
