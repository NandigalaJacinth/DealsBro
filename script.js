document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('priceHistory', (data) => {
    const priceHistory = data.priceHistory || {};
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
