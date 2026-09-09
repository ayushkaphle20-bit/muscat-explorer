const fs = require('fs');
const path = require('path');
const filePath = path.join(process.cwd(), 'data', 'blog.json');
const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const imageMap = {
  '50-best-things-to-do-in-muscat': '/images/experiences/muscat-things-to-do.jpg',
  'best-wadi-shab-tours-from-muscat': '/images/experiences/wadi-shab-1.jpg',
  'best-daymaniyat-islands-snorkeling-tours': '/images/experiences/daymaniyat-1.jpg',
  'best-muscat-day-trips': '/images/experiences/wadi-shab-1.jpg',
  'best-desert-tours-from-muscat': '/images/experiences/wahiba-sands-1.jpg',
  'best-nizwa-tours-from-muscat': '/images/experiences/nizwa-1.jpg',
  'best-jebel-akhdar-tours': '/images/experiences/nizwa-1.jpg',
  'things-to-do-in-muscat-for-families': '/images/experiences/muscat-family.jpg',
  'free-things-to-do-in-muscat': '/images/experiences/mutrah-souk-1.jpg',
  'muscat-3-day-itinerary': '/images/experiences/muscat-city-1.jpg',
};

let updatedCount = 0;
const next = posts.map((post) => {
  const img = imageMap[post.slug];
  if (img) {
    updatedCount++;
    return { ...post, image: img };
  }
  return post;
});

fs.writeFileSync(filePath, JSON.stringify(next, null, 2) + '\n', 'utf-8');
console.log(`Updated ${updatedCount} blog posts.`);
