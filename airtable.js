// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

// Access Airtable API
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'patyGtqiWtf3ypzpD.00631f93c77f8bb3f8c7b45f64a6a2b3d72575b51bac2e679507666590ac875a'}).base('appBL5bDGDsHFNRAh');

base('cities').find('recr9qxyXRNQD7QNa', function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.id);
});
