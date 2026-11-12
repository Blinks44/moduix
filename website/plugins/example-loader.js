import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exampleProject } from './example-project.js';

// Expands `<Example name="button/basic" />` in MDX into an `ExamplePanel` with the live React
// preview, lazy Solid, Vue, and Svelte previews, and the raw React, Solid, Vue, Svelte, and CSS sources, and `<Usage />` into the raw sources of the
// Basic example named after the page file (`button.mdx` uses `button/basic`). It runs as a loader,
// not a remark plugin, because Rspress skips custom remark plugins when it renders the Markdown pages
// used by llms.txt.

const websiteRoot = fileURLToPath(new URL('../', import.meta.url));
const examplePattern = /^<Example name="([^"]+)"([^>]*?)\s*\/>$/gm;
const usagePattern = /^<Usage \/>$/gm;

function toIdentifier(name) {
  return name.replace(/(^|[/-])(\w)/g, (_, __, letter) => letter.toUpperCase());
}

function cssImports(reactFile) {
  const source = readFileSync(reactFile, 'utf8');
  return [...source.matchAll(/^import \w+ from '([^']+\.css)';$/gm)].map(([, specifier]) =>
    specifier.startsWith('@/')
      ? path.join(websiteRoot, 'src', specifier.slice(2))
      : path.join(path.dirname(reactFile), specifier),
  );
}

// A Vue or Svelte example that needs a parent, such as a provider, runs from its `<name>.preview` file.
function previewFile(file) {
  const wrapper = file.replace(/(\.\w+)$/, '.preview$1');
  return existsSync(wrapper) ? wrapper : file;
}

export default function exampleLoader(source) {
  if (!source.includes('<Example ') && !source.includes('<Usage ')) return source;

  const relative = (file) => path.relative(path.dirname(this.resourcePath), file);
  const imports = new Set();

  // Imports the raw framework sources of an example and returns the identifier they share.
  const addSources = (name) => {
    const dir = path.dirname(name);
    const base = path.basename(name);
    const reactFile = path.join(websiteRoot, 'src/components/examples', dir, `${base}.tsx`);
    const solidFile = path.join(websiteRoot, 'snippets', dir, 'solid', `${base}.tsx`);
    const vueFile = path.join(websiteRoot, 'snippets', dir, 'vue', `${base}.vue`);
    const svelteFile = path.join(websiteRoot, 'snippets', dir, 'svelte', `${base}.svelte`);
    for (const file of [reactFile, solidFile, vueFile, svelteFile]) {
      if (!existsSync(file)) throw new Error(`<Example name="${name}"> cannot find ${file}.`);
      this.addDependency(file);
    }

    const identifier = `Example${toIdentifier(name)}`;
    imports.add(`import ${identifier}React from '${relative(reactFile)}?raw';`);
    imports.add(`import ${identifier}Solid from '${relative(solidFile)}?raw';`);
    imports.add(`import ${identifier}Vue from '${relative(vueFile)}?raw';`);
    imports.add(`import ${identifier}Svelte from '${relative(svelteFile)}?raw';`);
    return { identifier, reactFile, solidFile, vueFile, svelteFile, dir, base };
  };
  const sources = (identifier) =>
    `{{ react: ${identifier}React, solid: ${identifier}Solid, vue: ${identifier}Vue, svelte: ${identifier}Svelte }}`;

  const page = path.basename(this.resourcePath, '.mdx');
  const content = source
    .replace(
      usagePattern,
      () => `<UsageCode sources=${sources(addSources(`${page}/basic`).identifier)} />`,
    )
    .replace(examplePattern, (_, name, attributes) => {
      const { identifier, reactFile, solidFile, vueFile, svelteFile, dir, base } = addSources(name);
      imports.add(`import ${identifier} from '@/components/examples/${dir}/${base}.tsx';`);
      // A module-level object keeps the loaders stable across renders of the panel.
      imports.add(
        `export const ${identifier}Live = { solid: () => import('${relative(solidFile)}'), vue: () => import('${relative(previewFile(vueFile))}'), svelte: () => import('${relative(previewFile(svelteFile))}') };`,
      );
      const files = cssImports(reactFile).map((file, index) => {
        imports.add(`import ${identifier}Css${index} from '${relative(file)}?raw';`);
        return `{ name: '${path.basename(file)}', code: ${identifier}Css${index} }`;
      });

      const addDependency = (file) => this.addDependency(file);
      const projects = {
        react: exampleProject(reactFile, addDependency),
        solid: exampleProject(solidFile, addDependency),
        vue: exampleProject(previewFile(vueFile), addDependency),
        svelte: exampleProject(previewFile(svelteFile), addDependency),
      };
      return `<ExamplePanel${attributes} projects={${JSON.stringify(projects)}} sources=${sources(identifier)} files={[${files.join(', ')}]}>
  <FrameworkPreview live={${identifier}Live}>
    <${identifier} />
  </FrameworkPreview>
</ExamplePanel>`;
    });

  const frontmatter = content.match(/^---\n[\s\S]*?\n---\n/)?.[0] ?? '';
  return `${frontmatter}\n${[...imports].join('\n')}\n${content.slice(frontmatter.length)}`;
}