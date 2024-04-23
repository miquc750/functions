// RETRIEVE CITY NAME FROM URL
const getCity = () => {
    const currentURL = window.location.pathname;
    const currentURLSplit = currentURL.split("/");
    return currentURLSplit[currentURLSplit.length - 1].toLowerCase();
};

// LOADING STATE
document.addEventListener("DOMContentLoaded", async () => {
    const overlay = document.getElementsByClassName('loadingOverlay')[0];
    const content = document.getElementById('content');

    setTimeout(() => {
        if (overlay) {
            overlay.style.display = 'none';
        }
        if (content) {
            content.style.display = 'block';
        }
    }, 2000);

    const cityName = getCity();
    const response = await fetch('data.json');
    const data = await response.json();
    const cityData = data.cities.find(c => c.city.toLowerCase() === cityName);

    if (cityData) {
        setupButtons(cityData);
        fetchAndRenderItems(); 
        setupChart(cityData); 
        setupCategoryButtons();  
    }
});

//SCROLL ANIMATION
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
            rootMargin: '0% 0% -25% 0%',
        });
        sectionObserver.observe(block);
    });
};

document.addEventListener('DOMContentLoaded', function() {
    addScrolling();
});

// CITY BUTTONS
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

// WHERE TO BUTTONS
const displayItems = async (category) => {
    try {
        const data = await fetch('data.json').then(res => res.json());
        const items = data[category];
        const filteredItems = items.filter(item => item.city.toLowerCase() === getCity());
        let displayHtml = `<div class="card-container">`;
        filteredItems.forEach(item => {
            displayHtml += `
                <div class="block">
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
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
};

function setupCategoryButtons() {
    document.getElementById('restaurantsButton').addEventListener('click', () => {
        displayItems('restaurants');
        setActiveButton('restaurantsButton');
    });

    document.getElementById('hotelsButton').addEventListener('click', () => {
        displayItems('hotels');
        setActiveButton('hotelsButton');
    });

    document.getElementById('activitiesButton').addEventListener('click', () => {
        displayItems('activities');
        setActiveButton('activitiesButton');
    });

    document.getElementById('coworkingsButton').addEventListener('click', () => {
        displayItems('coworkings');
        setActiveButton('coworkingsButton');
    });
}

// ACTIVE STATE
const setActiveButton = (activeId) => {
    const buttonIds = [
        'costButton', 'safetyButton', 'weatherButton', 'transportButton',
        'coworkingsButton', 'restaurantsButton', 'hotelsButton', 'activitiesButton'
    ];

    buttonIds.forEach(id => {
        document.getElementById(id).classList.remove('button-active');
    });

    document.getElementById(activeId).classList.add('button-active');
};

// CHART
const setupChart = (cityData) => {
    const ctx = document.getElementById('myRadarChart').getContext('2d');
    const myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Cost of Living', 'Safety', 'Weather', 'Transportation'],
            datasets: [{
                label: cityName,
                data: [cityData.scoreCost, cityData.scoreSafety, cityData.scoreWeather, cityData.scoreTransportation],
                backgroundColor: 'rgba(35, 118, 228, 0.2)',
                borderColor: '#2376E4',
                borderWidth: 1
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    angleLines: {
                        display: false
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 10
                    }
                }
            }
        }
    });
};

// FETCH ITEMS FROM DATA.JSON
const renderItems = (data) => {
    console.log(data);
};

const fetchAndRenderItems = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderItems(data);
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    const overlay = document.getElementsByClassName('loadingOverlay')[0];
    const content = document.getElementById('content');

    setTimeout(() => {
        if (overlay) {
            overlay.style.display = 'none';
        }
        if (content) {
            content.style.display = 'block';
        }
    }, 2000);

    const cityName = getCity();
    const response = await fetch('data.json');
    const data = await response.json();
    const cityData = data.cities.find(c => c.city.toLowerCase() === cityName);

    if (cityData) {
        setupButtons(cityData);
        fetchAndRenderItems();  // Fetch and render items from data.json
    }
});