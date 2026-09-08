const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data', 'experiences.json');
const experiences = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const updates = {
  'wadi-shab-small-group-hiking': {
    price: 30, currency: 'USD', rating: 4.9, reviewCount: 91, provider: 'GetYourGuide',
    affiliateUrl: 'https://gyg.me/wsElzHlo',
    image: '/images/experiences/wadi-shab-1.jpg'
  },
  'mutrah-old-town-walking-tour': {
    price: 20, currency: 'USD', rating: 5.0, reviewCount: 14, provider: 'GetYourGuide',
    affiliateUrl: 'https://www.getyourguide.com/muscat-l233/muscat-guided-walking-tour-of-corniche-souq-mutrah-fort-t999084/?partner_id=GGZJMYW&utm_medium=online_publisher'
  },
  'omani-cuisine-cooking-class': {
    price: 70, currency: 'USD', rating: 5.0, reviewCount: 73, provider: 'GetYourGuide',
    affiliateUrl: 'https://www.getyourguide.com/muscat-l233/muscat-omani-food-tour-with-shuwa-halwa-t997641/?partner_id=GGZJMYW&utm_medium=online_publisher'
  },
  'sunset-dhow-cruise-muscat': {
    price: 40, currency: 'USD', rating: 4.6, reviewCount: 212, provider: 'GetYourGuide',
    affiliateUrl: 'https://www.getyourguide.com/muscat-l233/muscat-omani-dhow-coastal-and-sunset-cruise-2-hours-t544609/?partner_id=GGZJMYW&utm_medium=online_publisher'
  },
  'dolphin-watching-cruise-muscat': {
    price: 90, currency: 'USD', rating: 4.5, reviewCount: 227, provider: 'GetYourGuide',
    affiliateUrl: 'https://www.getyourguide.com/muscat-l233/muscat-dolphin-watching-and-snorkeling-tour-t177027/?partner_id=GGZJMYW&utm_medium=online_publisher'
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
