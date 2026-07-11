const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const replacements = [
  ['#0A0908', '#161210'],
  ['#C9A96E', '#D6B57A'],
  ['#8A8279', '#8F857B'],
  ['rgba(201, 169, 110', 'rgba(214, 181, 122'],
];

files.forEach(file => {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');
  replacements.forEach(([from, to]) => {
    content = content.split(from).join(to);
  });
  fs.writeFileSync(fp, content, 'utf8');
  console.log('Updated:', file);
});
console.log('Done');
