// Cada ciutat inclou nom, país, latitud, longitud i moneda local com demana l'enunciat
const citiesData = {
    "barcelona": { name: "Barcelona", country: "Espanya", lat: 41.3874, lon: 2.1686, currency: "EUR" },
    "london": { name: "London", country: "Regne Unit", lat: 51.5085, lon: -0.1257, currency: "GBP" },
    "paris": { name: "Paris", country: "França", lat: 48.8534, lon: 2.3488, currency: "EUR" },
    "new-york": { name: "New York", country: "Estats Units", lat: 40.7143, lon: -74.006, currency: "USD" },
    "tokyo": { name: "Tokyo", country: "Japó", lat: 35.6895, lon: 139.6917, currency: "JPY" }
};

const citySelect = document.getElementById('city-select');
const dashboardContent = document.getElementById('dashboard-content');

// Elements del resum
const summaryCity = document.getElementById('summary-city');
const summaryCountry = document.getElementById('summary-country');
const summaryTemp = document.getElementById('summary-temp');
const summaryCurrency = document.getElementById('summary-currency');

// Elements del temps
const weatherTemp = document.getElementById('weather-temp');
const weatherRainProb = document.getElementById('weather-rain-prob');
const weatherRainStatus = document.getElementById('weather-rain-status');

// Elements de moneda
const eurInput = document.getElementById('eur-input');
const convertBtn = document.getElementById('convert-btn');
const conversionResultBox = document.getElementById('conversion-result-box');
const amountInputSpan = document.getElementById('amount-input');
const convertedResultSpan = document.getElementById('converted-result');
const targetCurrencySpan = document.getElementById('target-currency');

// Element de recomanació
const travelMessage = document.getElementById('travel-message');

// Variable global per guardar la ciutat actual seleccionada
let currentCity = null;

// Esdeveniment per quan es canvia la ciutat al selector
citySelect.addEventListener('change', async (event) => {
    const cityKey = event.target.value;
    currentCity = citiesData[cityKey];

    if (currentCity) {
        // Mostrem el dashboard que estava ocult per defecte
        dashboardContent.style.display = 'flex';

        // 1. Actualitzem la Card Resum Bàsica
        updateSummaryCard(currentCity);

        // 2. Obtenim les dades del temps
        await fetchWeatherData(currentCity);

        // 3. Reiniciem la calculadora de moneda
        resetCurrencyWidget(currentCity);
    }
});

// Esdeveniment per al botó de conversió de moneda
convertBtn.addEventListener('click', async () => {
    const amount = eurInput.value;
    if (!amount || amount <= 0) {
        alert("Si us plau, introdueix una quantitat vàlida en EUR.");
        return;
    }
    await convertCurrency(amount, currentCity.currency);
});
