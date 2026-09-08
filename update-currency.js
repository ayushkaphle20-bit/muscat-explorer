const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data', 'experiences.json');
const experiences = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const updates = {
  'wadi-shab-bimmah-sinkhole': { price: 40, currency: 'USD' },
  'daymaniyat-islands-snorkeling-cruise': { price: 62, currency: 'USD' },
  'nizwa-and-jebel-akhdar-day-trip': { price: 100, currency: 'USD' },
  'wahiba-sands-overnight-desert-camp': { price: 535, currency: 'USD' },
  'muscat-city-highlights-tour': { price: 66, currency: 'USD' },
};

let updatedCount = 0;
const next = experiences.map((exp) => {
  const u = updates[exp.slug];
  if (u) {
    updatedCount++;
    return { ...exp, ...u };
  }
  return exp;
});

fs.writeFileSync(filePath, JSON.stringify(next, null, 2) + '\n', 'utf-8');
console.log(`Updated ${updatedCount} experiences to USD.`);
