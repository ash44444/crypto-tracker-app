document.addEventListener("DOMContentLoaded", () => {
  const cryptoList = document.getElementById("crypto-list");

  // Function to fetch crypto prices
  async function fetchCryptoPrices() {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching the crypto data:", error);
      return [];
    }
  }

  // Function to update the UI with crypto prices
  function updateUI(cryptos) {
    cryptoList.innerHTML = ""; // Clear the list first
    cryptos.forEach((crypto) => {
      const cryptoItem = document.createElement("div");
      cryptoItem.className = "crypto-item";

      const cryptoName = document.createElement("div");
      cryptoName.className = "crypto-name";
      cryptoName.textContent = ` ${
        crypto.name
      } (${crypto.symbol.toUpperCase()})`;

      const cryptoPrice = document.createElement("div");
      cryptoPrice.className = "crypto-price";
      cryptoPrice.textContent = `$${crypto.current_price.toFixed(2)}`;

      cryptoItem.appendChild(cryptoName);
      cryptoItem.appendChild(cryptoPrice);
      cryptoList.appendChild(cryptoItem);
    });
  }

  // Fetch and display the crypto prices on page load
  fetchCryptoPrices().then(updateUI);

  // Optionally, refresh the data every minute
  setInterval(() => {
    fetchCryptoPrices().then(updateUI);
  }, 60000);
});
