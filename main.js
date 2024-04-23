// RETRIEVE CITY NAME FROM URL
const getCity = () => {
    const currentURL = window.location.pathname;
    const currentURLSplit = currentURL.split("/");
    return currentURLSplit[currentURLSplit.length - 1].toLowerCase();
};

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
                <li class="datapill">
                    <p class="data">${cityData.costRent}</p>
                    <p>${cityData.costRentLabel}</p>
                </li>
                <li class="datapill">
                    <p class="data">${cityData.costExpenses}</p>
                    <p>${cityData.costExpensesLabel}</p>
                </li>
                <li class="datapill">
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
                <li class="datapill">
                    <p class="data">${cityData.securityCrime}</p>
                    <p>${cityData.securityCrimeLabel}</p>
                </li>
                <li class="datapill">
                    <p class="data">${cityData.safetyIndex}</p>
                    <p>${cityData.safetyIndexLabel}</p>
                </li>
                <li class="datapill">
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
                <li class="datapill">
                    <p class="data">${cityData.weatherSummer}</p>
                    <p>${cityData.weatherSummerLabel}</p>
                </li>
                <li class="datapill">
                    <p class="data">${cityData.weatherWinter}</p>
                    <p>${cityData.weatherWinterLabel}</p>
                </li>
                <li class="datapill">
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
document.addEventListener('DOMContentLoaded', function() {
    setupCategoryButtons();
});

function setupCategoryButtons() {
    const buttonIds = ['restaurantsButton', 'hotelsButton', 'activitiesButton', 'coworkingsButton'];
    buttonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', function() {
                displayItems(id.replace('Button', 's'));
            });
        } else {
            console.error(`Button with ID ${id} not found.`);
        }
    });
}

async function displayItems(category) {
    try {
        const cityName = getCity();
        const response = await fetch('data.json');
        const data = await response.json();
        const items = data[category];
        const filteredItems = items.filter(item => item.city.toLowerCas() === cityName);

        let displayHtml = items.map(item => `
            <div class="block">
                <img src="${item.image}" alt="${cityData.item.name}">
                <h3>${item.name}</h3>
                <p>${item.address}</p>
                <a href="${item.link}" target="_blank">Website</a>
                <a href="${item.maps}" target="_blank">Maps</a>
            </div>
        `).join('');
        document.getElementById('displayArea').innerHTML = displayHtml;
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

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
document.addEventListener("DOMContentLoaded", function() {
    setupChart();
});

const setupChart = async () => {
    const cityName = getCity();
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const cityData = data.cities.find(c => c.city.toLowerCase() === cityName);

        if (cityData) {
            const ctx = document.getElementById('myRadarChart').getContext('2d');
            const myRadarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Cost of Living', 'Safety', 'Weather', 'Transportation'],
                    datasets: [{
                        label: cityData.city,
                        data: [cityData.scoreCost, cityData.scoreSecurity, cityData.scoreWeather, cityData.scoreTransportation],
                        backgroundColor: 'rgba(35, 118, 228, 0.5)',
                        borderColor: '#2376E4',
                        borderWidth: 1
                    },
                    {
                        label: 'average',
                        data: [7.1, 7.6, 8, 6.4],
                        backgroundColor: 'rgba(241, 82, 17, 0.5)',
                        borderColor: '#F15211',
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
        } else {
            console.error("City data not found for the chart");
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
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