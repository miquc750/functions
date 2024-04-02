// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

// Access Airtable API
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'patyGtqiWtf3ypzpD.1b2d79f7d1611c97f50628a1aa4b05546bda8e1c09885ddfd203d6f81fc168ba'
});
var base = Airtable.base('appBL5bDGDsHFNRAh');