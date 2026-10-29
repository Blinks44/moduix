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

export const playgrounds = readdirSync('playgrounds').filter((name) =>
  existsSync(join('playgrounds', name, 'storybook-static/index.json')),
);

// Story ids of a playground, optionally limited to the given component names.
export function storyIds(playground, components = []) {
  const index = JSON.parse(
    readFileSync(`playgrounds/${playground}/storybook-static/index.json`, 'utf8'),
  );
  return Object.values(index.entries)
    .filter((entry) => entry.type === 'story')
    .map((entry) => entry.id)
    .filter(
      (id) =>
        !components.length || components.some((name) => id.startsWith(`components-${name}--`)),
    );
}

export async function servePlaygrounds() {
  const server = createServer((request, response) => {
    const path = normalize(decodeURIComponent(new URL(request.url, 'http://x').pathname)).replace(
      /^(\.\.[/\\])+/,
      '',
    );
    const file = join('playgrounds', path);
    if (!existsSync(file)) return response.writeHead(404).end();
    response.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    response.end(readFileSync(file));
  });
  await new Promise((resolve) => server.listen(0, resolve));
  return {
    storyUrl: (playground, id) =>
      `http://localhost:${server.address().port}/${playground}/storybook-static/iframe.html?id=${id}&viewMode=story`,
    close: () => server.close(),
  };
}