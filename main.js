/* This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt) */

// Chart
var ctx = document.getElementById('myRadarChart').getContext('2d');
var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Cost of living', 'Safety', 'Weather', 'Transportation'],
        datasets: [{
            label: 'Valencia',
            data: [5, 8, 4, 7],
            backgroundColor: 'transparent',
            borderColor: '#2376E4',
            borderWidth: 1
        },
        {
            label: 'Madrid',
            data: [7, 6, 5, 9],
            backgroundColor: 'transparent',
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
                suggestedMin: 0,
                suggestedMax: 10
            }
        }
    }
});

/* Access Airtable API
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'patyGtqiWtf3ypzpD.00631f93c77f8bb3f8c7b45f64a6a2b3d72575b51bac2e679507666590ac875a'}).base('appBL5bDGDsHFNRAh');

base('cities').find('recr9qxyXRNQD7QNa', function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.id);
});
*/

// Fetch and display all items from data.json
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

// Define an event to set up buttons after data has loaded
const setupButtons = (cityData) => {
    document.getElementById('costButton').addEventListener('click', () => {
        document.getElementById('infoContent').innerHTML =
        `<p>${cityData.cost-text}</p>
        <ul class="data-section">
            <li class="data-pill">
                <p class="data">${cityData.cost-rent}</p>
                <p>${cityData.cost-rent-label}</p>
            </li>
            <li class="data-pill">
                <p class="data">${cityData.expenses}</p>
                <p>${cityData.cost-expenses-label}</p>
            </li>
            <li class="data-pill">
                <p class="data">${cityData.cost-groceries}</p>
                <p>${cityData.cost-groceries-label}</p>
            </li>
        </ul>
        `
        ;
        setActiveButton('costButton');
    });

    document.getElementById('safetyButton').addEventListener('click', () => {
        document.getElementById('infoContent').innerHTML = `<p>Crime rate is not available</p>`;
        setActiveButton('safetyButton');
    });

    document.getElementById('weatherButton').addEventListener('click', () => {
        document.getElementById('infoContent').innerHTML = '<p>Weather information is currently not available.</p>';
        setActiveButton('weatherButton');
    });

    document.getElementById('transportButton').addEventListener('click', () => {
        document.getElementById('infoContent').innerHTML = '<p>Transportation information is currently not available.</p>';
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

    fetchAndRenderItems();  // Optional, depends on what this function does
});

// Helper function to set active button styling
function setActiveButton(activeId) {
    ['costButton', 'safetyButton', 'weatherButton', 'transportButton'].forEach(id => {
        document.getElementById(id).classList.remove('button-active');
    });
    document.getElementById(activeId).classList.add('button-active');
}