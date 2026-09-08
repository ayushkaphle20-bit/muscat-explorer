const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data', 'experiences.json');
const experiences = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const updates = {
  'wadi-shab-bimmah-sinkhole': { rating: 4.8, reviewCount: 2039, price: 56, currency: 'AUD', provider: 'GetYourGuide', affiliateUrl: 'https://gyg.me/HWgXJzvt' },
  'daymaniyat-islands-snorkeling-cruise': { rating: 4.7, reviewCount: 333, price: 86, currency: 'AUD', provider: 'GetYourGuide', affiliateUrl: 'https://gyg.me/OSWxcvKe' },
  'nizwa-and-jebel-akhdar-day-trip': { rating: 4.8, reviewCount: 575, price: 139, currency: 'AUD', provider: 'GetYourGuide', affiliateUrl: 'https://gyg.me/qs7lXXAv' },
  'wahiba-sands-overnight-desert-camp': { rating: 5, reviewCount: 4, price: 743, currency: 'AUD', provider: 'GetYourGuide', affiliateUrl: 'https://gyg.me/M9hGWUHp' },
  'muscat-city-highlights-tour': { rating: 4.7, reviewCount: 28, price: 91, currency: 'AUD', provider: 'GetYourGuide', affiliateUrl: 'https://gyg.me/6USyv1MI' },
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
console.log(`Updated ${updatedCount} experiences.`);
