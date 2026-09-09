const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data', 'siteConfig.json');
const config = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

config.integrations.adSenseClientId = 'ca-pub-4514705238275766';

fs.writeFileSync(filePath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
console.log('AdSense client ID set to:', config.integrations.adSenseClientId);
