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

/* Functions to render your items
const renderItems = (data) => {
    // The'ul' where the items will be inserted
    const dataList = document.getElementById('data-list')

    // Loop through each item in the data array
    data.forEach((item) => {
        let conditionalClass = '' // Set an empty class variable

        if(!item.alsoWasWriter) { // Conditional if this is 'false' ("not true")
            conditionalClass = 'faded' // Update the variable
        }

        // Make a "template literal" as we have before, inserting your data
        let listItem =

            <li class="${conditionalClass}">
                <h2>${item.city}</h2>
                <p>Released in ${item.population}</p>
            </li>

        dataList.insertAdjacentHTML('beforeend', listItem) //Add it to the 'ul'
    }
    );    
} */

const fetchAndRenderItems = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderItems(data);
    } catch (error) {
        console.error('Error loading data', error);
    }
}

const renderItems = (data) => {
    const dataList = document.getElementById('data-list');
    data.forEach((item) => {
        let conditionalClass = ''; // Aquí puedes añadir lógica para cambiar la clase basada en alguna condición
        let listItem = `
            <li class="${conditionalClass}">
                <h2>${item.City}</h2>
                <p>Population: ${item.Population}</p>
            </li>
        `;
        dataList.insertAdjacentHTML('beforeend', listItem);
    });
}

fetchAndRenderItems();