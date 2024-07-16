// Content script for scraping price data
const scrapeAmazon = () => {
  const priceElement = document.querySelector('#priceblock_ourprice, #priceblock_dealprice');
  return priceElement ? parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, "")) : null;
};

const scrapeFlipkart = () => {
  const priceElement = document.querySelector('._30jeq3._16Jk6d'); // Flipkart price selector
  return priceElement ? parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, "")) : null;
};

const getPrice = () => {
  if (window.location.href.includes('amazon.com')) {
    return scrapeAmazon();
  } else if (window.location.href.includes('flipkart.com')) {
    return scrapeFlipkart();
  }
  // Add more platforms as needed
  return null;
};

const price = getPrice();
if (price) {
  chrome.runtime.sendMessage({ type: 'PRICE_DATA', price, url: window.location.href });
}
