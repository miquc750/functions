// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

// Chart
var ctx = document.getElementById('myRadarChart').getContext('2d');
var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Cost of living', 'Safety', 'Weather', 'Transportation'],
        datasets: [{
            label: 'Ciudad A',
            data: [5, 8, 4, 7], // Aquí se debe ingresar los valores para cada parámetro de Ciudad A
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Ciudad B',
            data: [7, 6, 5, 9], // Aquí se debe ingresar los valores para cada parámetro de Ciudad B
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
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

// Access Airtable API
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'patyGtqiWtf3ypzpD.00631f93c77f8bb3f8c7b45f64a6a2b3d72575b51bac2e679507666590ac875a'}).base('appBL5bDGDsHFNRAh');

base('cities').find('recr9qxyXRNQD7QNa', function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.id);
});
