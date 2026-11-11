import fs from 'node:fs';
import path from 'node:path';

const directory = path.resolve('blog');
const namingPattern = /^\d{4}-\d{2}-\d{2}-thoughtful-velocity-[a-z0-9-]+\.mdx?$/;
const problems = [];
const slugs = new Set();
let checked = 0;

function allFiles(root) {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, {withFileTypes: true}).flatMap(entry => {
    const full = path.join(root, entry.name);
    return entry.isDirectory() ? allFiles(full) : [full];
  });
}

for (const file of allFiles(directory)) {
  const name = path.basename(file);
  if (!name.includes('thoughtful-velocity') || !/\.mdx?$/.test(name)) continue;
  checked++;
  if (!namingPattern.test(name)) problems.push(`${file}: invalid filename`);

  const source = fs.readFileSync(file, 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!frontmatter) {
    problems.push(`${file}: missing YAML frontmatter`);
    continue;
  }
  const metadata = frontmatter[1];
  const value = field => metadata.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))?.[1]?.trim();
  for (const field of ['title', 'description', 'slug', 'tags']) {
    if (!value(field)) problems.push(`${file}: missing ${field}`);
  }
  const slug = value('slug');
  if (slug) {
    if (!/^thoughtful-velocity-[a-z0-9-]+$/.test(slug)) problems.push(`${file}: slug must start with thoughtful-velocity-`);
    if (slugs.has(slug)) problems.push(`${file}: duplicate slug ${slug}`);
    slugs.add(slug);
  }
  if (!/\bthoughtful-velocity\b/.test(value('tags') ?? '')) problems.push(`${file}: missing thoughtful-velocity tag`);
  if (/\b(TODO|TBD|lorem ipsum|insert source|placeholder)\b/i.test(source)) problems.push(`${file}: contains placeholder text`);
  if (source.slice(frontmatter[0].length).trim().length < 350) problems.push(`${file}: article is too short for review`);
}

if (!checked) problems.push('No Thoughtful Velocity Markdown posts found in blog/');
if (problems.length) {
  for (const problem of problems) console.error('ERROR:', problem);
  process.exitCode = 1;
} else {
  console.log(`Validated ${checked} Thoughtful Velocity article(s). Editorial and factual review remain manual.`);
}
