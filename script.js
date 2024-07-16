document.addEventListener('DOMContentLoaded', () => {
  const trackPriceButton = document.getElementById('track-price');

  trackPriceButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        function: () => {
          const priceElement = document.querySelector('#priceblock_ourprice, #priceblock_dealprice, .priceblock_ourprice, .priceblock_dealprice, ._30jeq3._16Jk6d');
          return priceElement ? parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, "")) : null;
        }
      }, (results) => {
        const price = results[0].result;
        if (price) {
          chrome.runtime.sendMessage({ type: 'PRICE_DATA', price, url: currentTab.url });
          alert('Price added to tracking list.');
        } else {
          alert('Could not find the price on this page.');
        }
      });
    });
  });

  chrome.runtime.sendMessage({ type: 'GET_PRICE_HISTORY' }, (priceHistory) => {
    const priceHistoryDiv = document.getElementById('price-history');
    for (const url in priceHistory) {
      const history = priceHistory[url];
      const historyText = history.map(item => `Price: $${item.price} Date: ${new Date(item.date).toLocaleString()}`).join('<br>');
      const urlDiv = document.createElement('div');
      urlDiv.className = 'price-item';
      urlDiv.innerHTML = `<strong>${url}</strong><div class="history">${historyText}</div>`;
      priceHistoryDiv.appendChild(urlDiv);
    }
  });
});
