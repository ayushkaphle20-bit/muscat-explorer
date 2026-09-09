const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data', 'experiences.json');
const experiences = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const updates = {
  'budget-wadi-shab-group-tour': {
    price: 70, currency: 'USD', rating: 5.0, reviewCount: 257, provider: 'Viator',
    affiliateUrl: 'https://www.viator.com/tours/Muscat/Wadi-Shab-and-Bimmah-Sinkhole-Full-Day-Tour/d4389-129578P1?pid=P00318974&mcid=42383&medium=link',
    image: '/images/experiences/wadi-shab-1.jpg'
  },
  'daymaniyat-islands-private-charter': {
    price: 1911.20, currency: 'USD', rating: 5.0, reviewCount: 13, provider: 'Viator',
    affiliateUrl: 'https://www.viator.com/tours/Muscat/Arabic/d4389-101865P17?pid=P00318974&mcid=42383&medium=link',
    image: '/images/experiences/daymaniyat-1.jpg'
  },
  'luxury-desert-camp-wahiba-sands': {
    price: 545, currency: 'USD', rating: 5.0, reviewCount: 63, provider: 'Viator',
    affiliateUrl: 'https://www.viator.com/tours/Muscat/Overnight-Wahiba-Sands-Desert/d4389-324718P3?pid=P00318974&mcid=42383&medium=link',
    image: '/images/experiences/wahiba-sands-1.jpg'
  },
  'muscat-family-fun-pass': {
    name: 'Omani Family Dinner Experience',
    slug: 'omani-family-dinner-experience',
    shortDescription: 'Share a home-style Omani dinner with a local family, including private transfer — a warm, authentic evening for all ages.',
    price: 60, currency: 'USD', rating: 5.0, reviewCount: 7, provider: 'GetYourGuide',
    affiliateUrl: 'https://www.getyourguide.com/muscat-l233/muscat-dinner-with-omani-family-with-private-transfer-t1293358/?partner_id=GGZJMYW&utm_medium=online_publisher',
    image: '/images/experiences/omani-family-dinner-1.jpg'
  },
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
