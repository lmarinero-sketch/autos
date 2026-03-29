import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf-8');
fs.writeFileSync('src/App.tsx', content.replace(/\.jpg/g, '.webp'));
console.log('App.tsx updated to use WebP');
