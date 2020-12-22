import preval from 'preval.macro';

// node script to read all translations which returns the following
/* 
{
  en: {
    "contact_details": "Contact Details",
    ...
  },
  es: {
    "contact_details": "Información de contacto",
    ...
  }
}
*/
const TRANSLATIONS = preval`
const fs = require('fs');
const translationFiles = fs.readdirSync('./src/translations');
let translations = {};

for(let translationFile of translationFiles) {
  // en.json => en
  const language = translationFile.split('.')[0];

  translations[language] = JSON.parse(fs.readFileSync('./src/translations/' + translationFile));
}

module.exports = translations;
`;

export { TRANSLATIONS };
