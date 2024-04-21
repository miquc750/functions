/* This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt) */

// Fetch and display all items from data.json
function renderItems(data) {
    console.log(data); 
}

const fetchAndRenderItems = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderItems(data);  // Consider what to do with this renderItems
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Correctly identify the city from the URL
function getCity() {
    const currentURL = window.location.pathname;
    const currentURLSplit = currentURL.split("/");
    const cityName = currentURLSplit[currentURLSplit.length - 1].toLowerCase();  // Ensure consistency in comparison
    return cityName;
}

const cityName = getCity();  // Retrieve the city name when the script loads

// CITY buttons
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
            </ul>
            `
            ;
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
            </ul>
            `
            ;
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
            </ul>
            `
            ;
        setActiveButton('weatherButton');
    });

    document.getElementById('transportButton').addEventListener('click', () => {
        document.getElementById('infoContent').innerHTML = 
            `<p>${cityData.transportationText}</p>
                <ul class="data-section">
                    <li class="data-pill">
                        <p class="data">${cityData.transportationMetro}</p>
                        <p>${cityData.transportationMetroLabel}</p>
                    </li>
                    <li class="data-pill">
                        <p class="data">${cityData.transportationAirport}</p>
                        <p>${cityData.transportationAirportLabel}</p>
                    </li>
                    <li class="data-pill">
                        <p class="data">${cityData.transportationTrain}</p>
                        <p>${cityData.transportationTrainLabel}</p>
                    </li>
                </ul>
            `
            ;
        setActiveButton('transportButton');
    });
}

// Change initialization of data and buttons
document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetch('data.json').then(res => res.json());
    const cityData = data.cities.find(c => c.city.toLowerCase() === cityName);  // Find the specific city data

    if (cityData && cityName === "madrid") {
        setupButtons(cityData);
    }

    fetchAndRenderItems();
});


// 'where to' buttons

document.getElementById('coworkingsButton').addEventListener('click', function() {
    displayItems('coworkings');
});

document.getElementById('restaurantsButton').addEventListener('click', function() {
    displayItems('restaurants');
});

document.getElementById('hotelsButton').addEventListener('click', function() {
    displayItems('hotels');
});

document.getElementById('activitiesButton').addEventListener('click', function() {
    displayItems('activities');
});

async function fetchData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}


async function displayItems(category) {
    const data = await fetchData();
    const items = data[category];
    const filteredItems = items.filter(item => item.city.toLowerCase() === cityName);  // Filtrar por ciudad
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
    document.getElementById('displayArea').innerHTML = displayHtml;  // Asegúrate de que 'displayArea' es el ID correcto donde se debe mostrar el contenido
}


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

// Chart

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetch('data.json').then(res => res.json());
    const cityData = data.cities.find(c => c.city.toLowerCase() === cityName);

    if (cityData) {
        setupButtons(cityData);

        var ctx = document.getElementById('myRadarChart').getContext('2d');
                var myRadarChart = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['Cost of living', 'Safety', 'Weather', 'Transportation'],
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
                            backgroundColor: 'rgba(160, 183, 77, 0.5)',
                            borderColor: '#A0B74D',
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
                                suggestedMin: 0,
                                suggestedMax: 10
                            }
                        }
                    }
                });
            }

            fetchAndRenderItems();
        });

// Scroll animations

let addScrolling = () => {
    let scrollClass = 'scroll';
    let scrollBlocks = document.querySelectorAll('.block');
    console.log(scrollBlocks); 

    scrollBlocks.forEach((block) => {
        let sectionObserver = new IntersectionObserver((entries) => {
            let [entry] = entries;
            console.log(entry);

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

document.addEventListener('DOMContentLoaded', function() {
    addScrolling();
});