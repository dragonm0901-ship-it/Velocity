import fs from 'fs';
let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

content = content.replace(
  "{['EN', 'FR', 'DE'].map(lang => (",
  "{['EN', 'FR', 'DE', 'ZH'].map(lang => ("
);

fs.writeFileSync('src/components/Navbar.jsx', content);
