// Serves the built playground storybooks for the story checks in this directory.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
};

export const playgrounds = readdirSync('playgrounds').filter((name) => {
  const manifest = join('playgrounds', name, 'package.json');
  return (
    existsSync(manifest) && JSON.parse(readFileSync(manifest, 'utf8')).scripts?.['build:storybook']
  );
});

const missing = playgrounds.filter(
  (name) => !existsSync(join('playgrounds', name, 'storybook-static/index.json')),
);
if (!playgrounds.length || missing.length) {
  throw new Error(
    `Build all playground storybooks before checking stories. Missing: ${missing.join(', ') || 'all playgrounds'}.`,
  );
}

// Story ids of a playground, optionally limited to the given component names.
export function storyIds(playground, components = []) {
  const index = JSON.parse(
    readFileSync(`playgrounds/${playground}/storybook-static/index.json`, 'utf8'),
  );
  const entries = Object.values(index.entries).filter((entry) => entry.type === 'story');
  const normalizeName = (name) => name.toLowerCase().replace(/[-\s]/g, '');
  const matches = (entry, name) =>
    normalizeName(entry.title.split('/').at(-1)) === normalizeName(name);
  for (const name of components) {
    if (!entries.some((entry) => matches(entry, name))) {
      throw new Error(`${playground}: no stories found for ${name}.`);
    }
  }
  const ids = entries
    .filter((entry) => !components.length || components.some((name) => matches(entry, name)))
    .map((entry) => entry.id);
  if (!ids.length) throw new Error(`${playground}: no stories found.`);
  return ids;
}

export async function servePlaygrounds() {
  const server = createServer((request, response) => {
    let path;
    try {
      path = normalize(decodeURIComponent(new URL(request.url, 'http://x').pathname));
    } catch {
      return response.writeHead(400).end();
    }
    const file = join('playgrounds', path);
    try {
      const content = readFileSync(file);
      response.writeHead(200, {
        'content-type': types[extname(file)] ?? 'application/octet-stream',
      });
      response.end(content);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(0, resolve));
  return {
    storyUrl: (playground, id) =>
      `http://localhost:${server.address().port}/${playground}/storybook-static/iframe.html?id=${id}&viewMode=story`,
    close: () => server.close(),
  };
}