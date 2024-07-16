const priceElement = document.querySelector('.price'); // Modify selector based on the site
const price = priceElement ? parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, "")) : null;

if (price) {
  chrome.runtime.sendMessage({ type: 'PRICE_DATA', price, url: window.location.href });
}