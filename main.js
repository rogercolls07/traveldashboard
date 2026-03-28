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

// Funció per actualitzar el resum de la destinació
function updateSummaryCard(city) {
    summaryCity.textContent = city.name;
    summaryCountry.textContent = city.country;
    summaryCurrency.textContent = city.currency;
    // La temperatura s'actualitzarà quan es faci el fetch del temps
    summaryTemp.textContent = "Carregant..."; 
}

// Funció per obtenir dades meteorològiques (Open-Meteo API)
async function fetchWeatherData(city) {
    try {
        // Obtenim temperatura actual i probabilitat de precipitació
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,precipitation_probability`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en carregar les dades del temps.");
        
        const data = await response.json();
        const currentTemp = data.current.temperature_2m;
        const rainProb = data.current.precipitation_probability;

        // Actualitzem el DOM
        weatherTemp.textContent = `${currentTemp} °C`;
        summaryTemp.textContent = `${currentTemp} °C`; // També al resum
        weatherRainProb.textContent = `${rainProb}%`;

        // Calculem l'estat de la pluja segons les regles de l'enunciat
        const rainStatusText = calculateRainStatus(rainProb);
        weatherRainStatus.textContent = rainStatusText;

        // Generem el missatge de recomanació
        generateTravelMessage(city.name, currentTemp, rainStatusText);

    } catch (error) {
        console.error(error);
        weatherTemp.textContent = "Error";
        weatherRainProb.textContent = "Error";
        weatherRainStatus.textContent = "No s'ha pogut carregar el temps.";
        summaryTemp.textContent = "--";
    }
}

// Lògica per determinar l'estat de la pluja (0-20%, 20-50%, >50%)
function calculateRainStatus(prob) {
    if (prob <= 20) return "☀️ Sense pluja";
    if (prob <= 50) return "⛅ Possible pluja";
    return "🌧️ Probable pluja";
}