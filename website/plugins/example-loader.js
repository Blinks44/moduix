import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exampleProject } from './example-project.js';
import {
  transformProjectToTailwind,
  transformSourceToTailwind,
} from './tailwind-example-transform.js';

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
  const addDependency = (file) => this.addDependency(file);
  const imports = new Set();

  // Imports the raw framework sources of an example and builds their Tailwind counterparts.
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

    const frameworkFiles = {
      react: reactFile,
      solid: solidFile,
      vue: vueFile,
      svelte: svelteFile,
    };
    const tailwindSources = {};
    const tailwindResidualFiles = new Map();
    for (const [fw, file] of Object.entries(frameworkFiles)) {
      const transformed = transformSourceToTailwind(
        readFileSync(file, 'utf8'),
        file,
        fw,
        addDependency,
      );
      tailwindSources[fw] = transformed.code;
      for (const rf of transformed.residualFiles) {
        if (!tailwindResidualFiles.has(rf.name)) {
          tailwindResidualFiles.set(rf.name, { name: rf.name, code: rf.code });
        }
      }
    }

    return {
      identifier,
      reactFile,
      solidFile,
      vueFile,
      svelteFile,
      dir,
      base,
      tailwindSources,
      tailwindFiles: [...tailwindResidualFiles.values()],
    };
  };
  const sources = (identifier) =>
    `{{ react: ${identifier}React, solid: ${identifier}Solid, vue: ${identifier}Vue, svelte: ${identifier}Svelte }}`;

  const page = path.basename(this.resourcePath, '.mdx');
  const content = source
    .replace(usagePattern, () => {
      const { identifier, tailwindSources } = addSources(`${page}/basic`);
      return `<UsageCode sources=${sources(identifier)} tailwindSources={${JSON.stringify(tailwindSources)}} />`;
    })
    .replace(examplePattern, (_, name, attributes) => {
      const {
        identifier,
        reactFile,
        solidFile,
        vueFile,
        svelteFile,
        dir,
        base,
        tailwindSources,
        tailwindFiles,
      } = addSources(name);
      imports.add(`import ${identifier} from '@/components/examples/${dir}/${base}.tsx';`);
      // Module-level objects keep the loaders stable across renders of the panel.
      imports.add(
        `export const ${identifier}Live = { solid: () => import('${relative(solidFile)}'), vue: () => import('${relative(previewFile(vueFile))}'), svelte: () => import('${relative(previewFile(svelteFile))}') };`,
      );
      imports.add(
        `export const ${identifier}LiveTailwind = { react: () => import('@/components/examples/${dir}/${base}.tsx?tailwind'), solid: () => import('${relative(solidFile)}?tailwind'), vue: () => import('${relative(previewFile(vueFile))}?tailwind'), svelte: () => import('${relative(previewFile(svelteFile))}?tailwind') };`,
      );
      const files = cssImports(reactFile).map((file, index) => {
        imports.add(`import ${identifier}Css${index} from '${relative(file)}?raw';`);
        return `{ name: '${path.basename(file)}', code: ${identifier}Css${index} }`;
      });

      const projects = {
        react: exampleProject(reactFile, addDependency),
        solid: exampleProject(solidFile, addDependency),
        vue: exampleProject(previewFile(vueFile), addDependency),
        svelte: exampleProject(previewFile(svelteFile), addDependency),
      };
      const tailwindProjects = {
        react: transformProjectToTailwind(projects.react, 'react', addDependency),
        solid: transformProjectToTailwind(projects.solid, 'solid', addDependency),
        vue: transformProjectToTailwind(projects.vue, 'vue', addDependency),
        svelte: transformProjectToTailwind(projects.svelte, 'svelte', addDependency),
      };
      // Every framework shows the same docs-only meta blocks as the React example.
      const metaBlocks = ({ files }) =>
        Object.entries(files)
          .filter(([name]) => /\.(?:tsx|vue|svelte)$/.test(name))
          .reduce((count, [, code]) => count + code.split('data-preview-meta').length - 1, 0);
      for (const framework of ['solid', 'vue', 'svelte']) {
        if (metaBlocks(projects[framework]) !== metaBlocks(projects.react)) {
          this.emitWarning(
            new Error(
              `${projects[framework].entry} has a different number of data-preview-meta blocks than ${projects.react.entry}.`,
            ),
          );
        }
      }
      return `<ExamplePanel${attributes} projects={${JSON.stringify(projects)}} tailwindProjects={${JSON.stringify(tailwindProjects)}} sources=${sources(identifier)} tailwindSources={${JSON.stringify(tailwindSources)}} files={[${files.join(', ')}]} tailwindFiles={${JSON.stringify(tailwindFiles)}}>
  <FrameworkPreview live={${identifier}Live} liveTailwind={${identifier}LiveTailwind}>
    <${identifier} />
  </FrameworkPreview>
</ExamplePanel>`;
    });

  const frontmatter = content.match(/^---\n[\s\S]*?\n---\n/)?.[0] ?? '';
  return `${frontmatter}\n${[...imports].join('\n')}\n${content.slice(frontmatter.length)}`;
}