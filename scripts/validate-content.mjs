import fs from 'node:fs';
import path from 'node:path';

const root = 'docs/content-operations';
const required = ['title', 'description', 'status', 'owner', 'reviewed'];
const statuses = new Set(['draft', 'in-review', 'approved']);
let failures = 0;
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : /\.mdx?$/.test(file) ? [file] : [];
  });
}
const files = walk(root);
if (!files.length) { console.error('No content operations documents found'); process.exit(1); }
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const meta = {};
  if (match) for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([\w-]+):\s*(.*?)\s*$/);
    if (pair) meta[pair[1]] = pair[2].replace(/^['"]|['"]$/g, '');
  }
  const errors = [];
  for (const field of required) if (!meta[field]) errors.push('missing '+field);
  if (meta.status && !statuses.has(meta.status)) errors.push('invalid status');
  if (meta.reviewed && !/^\d{4}-\d{2}-\d{2}$/.test(meta.reviewed)) errors.push('reviewed must be YYYY-MM-DD');
  if (!/^#\s+.+/m.test(source.replace(/^---[\s\S]*?---/, ''))) errors.push('missing H1');
  if (errors.length) { failures++; console.error(file+': '+errors.join(', ')); }
  else console.log('PASS '+file);
}
if (failures) process.exit(1);
console.log('Validated '+files.length+' documents.');
