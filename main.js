// Define the function to add scrolling animations
let addScrolling = () => {
    let scrollClass = 'scroll';
    let scrollBlocks = document.querySelectorAll('.block');

    scrollBlocks.forEach((block) => {
        let sectionObserver = new IntersectionObserver((entries) => {
            let [entry] = entries;

            if (entry.isIntersecting) {
                block.classList.add(scrollClass);
            } else {
                block.classList.remove(scrollClass);
            }
        }, {
            root: null,
            rootMargin: '0% 0% -10% 0%',
        });

        sectionObserver.observe(block);
    });
};

// Fetch and display all items from data.json
function renderItems(data) {
    console.log(data);
}

const fetchAndRenderItems = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderItems(data);
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

// Retrieve the city name from the URL
function getCity() {
    const currentURL = window.location.pathname;
    const currentURLSplit = currentURL.split("/");
    const cityName = currentURLSplit[currentURLSplit.length - 1].toLowerCase();
    return cityName;
}

// Setup city-specific buttons and add event listeners
const setupButtons = (cityData) => {
    document.getElementById('costButton').addEventListener('click', () => {
        document.getElementById('infoContent').innerHTML =
            `<p>${cityData.costText}</p>
            <ul class="data-section">
                <li class="data-pill">
                    <p class="data">${cityData.costRent}</p>
                    <p>${cityData.costRentLabel}</p>
                </li>
                <li class="data-pill">
                    <p class="data">${cityData.costExpenses}</p>
                    <p>${cityData.costExpensesLabel}</p>
                </li>
                <li class="data-pill">
                    <p class="data">${cityData.costGroceries}</p>
                    <p>${cityData.costGroceriesLabel}</p>
                </li>
            </ul>`;
        setActiveButton('costButton');
    });

    document.getElementById('safetyButton').addEventListener('click', () => {
        document.getElementById('infoContent').innerHTML = 
            `<p>${cityData.securityText}</p>
            <ul class="data-section">
                <li class="data-pill">
                    <p class="data">${cityData.securityCrime}</p>
                    <p>${cityData.securityCrimeLabel}</p>
                </li>
                <li class="data-pill">
                    <p class="data">${cityData.safetyIndex}</p>
                    <p>${cityData.safetyIndexLabel}</p>
                </li>
                <li class="data-pill">
                    <p class="data">${cityData.securityMurder}</p>
                    <p>${cityData.securityMurderLabel}</p>
                </li>
            </ul>`;
        setActiveButton('safetyButton');
    });

    document.getElementById('weatherButton').addEventListener('click', () => {
        document.getElementById('infoContent').innerHTML = 
            `<p>${cityData.weatherText}</p>
            <ul class="data-section">
                <li class="data-pill">
                    <p class="data">${cityData.weatherSummer}</p>
                    <p>${cityData.weatherSummerLabel}</p>
                </li>
                <li class="data-pill">
                    <p class="data">${cityData.weatherWinter}</p>
                    <p>${cityData.weatherWinterLabel}</p>
                </li>
                <li class="data-pill">
                    <p class="data">${cityData.weatherRain}</p>
                    <p>${cityData.weatherRainLabel}</p>
                </li>
            </ul>`;
        setActiveButton('weatherButton');
    });

    document.getElementById('transportButton').addEventListener('click', () => {
        document.getElementById('infoContent').innerHTML = 
            `<p>${cityData.transportationText}</p>
            <ul class="data-section">
                <li class="datapill">
                    <p class="data">${cityData.transportationMetro}</p>
                    <p>${cityData.transportationMetroLabel}</p>
                </li>
                <li class="datapill">
                    <p class="data">${cityData.transportationAirport}</p>
                    <p>${cityData.transportationAirportLabel}</p>
                </li>
                <li class="datapill">
                    <p class="data">${cityData.transportationTrain}</p>
                    <p>${cityData.transportationTrainLabel}</p>
                </li>
            </ul>`;
        setActiveButton('transportButton');
    });
};

// Helper function to set active button styling
function setActiveButton(activeId) {
    const buttonIds = [
        'costButton', 'safetyButton', 'weatherButton', 'transportButton', 
        'coworkingsButton', 'restaurantsButton', 'hotelsButton', 'activitiesButton'
    ];

    buttonIds.forEach(id => {
        document.getElementById(id).classList.remove('button-active');
    });

    document.getElementById(activeId).classList.add('button-active');
}

// Fetch data and display items based on category
async function displayItems(category) {
    const data = await fetch('data.json').then(res => res.json());
    const items = data[category];
    const filteredItems = items.filter(item => item.city.toLowerCase() === getCity());
    let displayHtml = `<div class="card-container">`;
    filteredItems.forEach(item => {
        displayHtml += `
            <div>
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.address}</p>
                <a href="${item.link}" target="_blank">Website</a>
                <a href="${item.maps}" target="_blank">Maps</a>
            </div>
        `;
    });
    displayHtml += '</div>';
    document.getElementById('displayArea').innerHTML = displayHtml;
}

// Initial setup when the document is ready
document.addEventListener("DOMContentLoaded", async () => {
    const overlay = document.getElementsByClassName('loadingOverlay')[0];  // Asegúrate de acceder al primer elemento
    const content = document.getElementById('content');

    // Simulate a delay to load content
    setTimeout(() => {
        if (overlay) {
            overlay.style.display = 'none';
        }
        if (content) {
            content.style.display = 'block';
        }
    }, 2000);

    const data = await fetch('data.json').then(res => res.json());
    const cityName = getCity();
    const cityData = data.cities.find(c => c.city.toLowerCase() === cityName);

    if (cityData) {
        setupButtons(cityData);
        fetchAndRenderItems();  // Fetch and render items from data.json
    }
});