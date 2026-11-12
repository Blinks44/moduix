import type { Project } from '@stackblitz/sdk';
import reactHtml from '../../../../starters/react-vite/index.html?raw';
import reactPackage from '../../../../starters/react-vite/package.json';
import reactTsconfig from '../../../../starters/react-vite/tsconfig.json?raw';
import reactVite from '../../../../starters/react-vite/vite.config.ts?raw';
import solidHtml from '../../../../starters/solid-vite/index.html?raw';
import solidPackage from '../../../../starters/solid-vite/package.json';
import solidTsconfig from '../../../../starters/solid-vite/tsconfig.json?raw';
import solidVite from '../../../../starters/solid-vite/vite.config.ts?raw';
import svelteHtml from '../../../../starters/svelte-vite/index.html?raw';
import sveltePackage from '../../../../starters/svelte-vite/package.json';
import svelteTsconfig from '../../../../starters/svelte-vite/tsconfig.json?raw';
import svelteVite from '../../../../starters/svelte-vite/vite.config.ts?raw';
import vueHtml from '../../../../starters/vue-vite/index.html?raw';
import vuePackage from '../../../../starters/vue-vite/package.json';
import vueTsconfig from '../../../../starters/vue-vite/tsconfig.json?raw';
import vueVite from '../../../../starters/vue-vite/vite.config.ts?raw';

export type ExampleProject = {
  files: Record<string, string>;
  dependencies: Record<string, string>;
  entry: string;
};

type Framework = 'react' | 'solid' | 'vue' | 'svelte';

// Each example runs in the matching Vite starter; `main` mounts the example as the whole app.
const starters = {
  react: {
    html: reactHtml,
    package: reactPackage,
    tsconfig: reactTsconfig,
    vite: reactVite,
    main: 'src/main.tsx',
    mount: (entry: string) =>
      `import { createRoot } from 'react-dom/client';\nimport Example from '${entry}';\ncreateRoot(document.getElementById('app-root')!).render(<main><Example /></main>);`,
  },
  solid: {
    html: solidHtml,
    package: solidPackage,
    tsconfig: solidTsconfig,
    vite: solidVite,
    main: 'src/main.tsx',
    mount: (entry: string) =>
      `import { render } from 'solid-js/web';\nimport Example from '${entry}';\nrender(() => <main><Example /></main>, document.getElementById('app-root')!);`,
  },
  vue: {
    html: vueHtml,
    package: vuePackage,
    tsconfig: vueTsconfig,
    vite: vueVite,
    main: 'src/main.ts',
    mount: (entry: string) =>
      `import { createApp } from 'vue';\nimport Example from '${entry}';\nconst main = document.createElement('main');\ndocument.getElementById('app-root')!.append(main);\ncreateApp(Example).mount(main);`,
  },
  svelte: {
    html: svelteHtml,
    package: sveltePackage,
    tsconfig: svelteTsconfig,
    vite: svelteVite,
    main: 'src/main.ts',
    mount: (entry: string) =>
      `import { mount } from 'svelte';\nimport Example from '${entry}';\nconst main = document.createElement('main');\ndocument.getElementById('app-root')!.append(main);\nmount(Example, { target: main });`,
  },
};

export function createExampleProject(
  project: ExampleProject,
  framework: Framework,
  styling: string,
): Project {
  const starter = starters[framework];
  const moduix = `@moduix/${framework}`;
  const tailwind = styling === 'tailwind';
  const files = Object.fromEntries(
    Object.entries(project.files).map(([name, code]) => [
      name,
      tailwind ? code.replaceAll(`${moduix}/`, `${moduix}-tailwind/`) : code,
    ]),
  );
  const { packageManager: _, ...basePackage } = starter.package;
  const dependencies: Record<string, string> = {
    ...basePackage.dependencies,
    ...project.dependencies,
  };
  if (tailwind) {
    dependencies[`${moduix}-tailwind`] = dependencies[moduix];
    delete dependencies[moduix];
    dependencies.tailwindcss = '^4.3.3';
    dependencies['@tailwindcss/vite'] = '^4.3.3';
  }
  files['package.json'] = JSON.stringify(
    {
      ...basePackage,
      name: 'moduix-example',
      scripts: { dev: 'vite --host 0.0.0.0', build: 'vite build' },
      dependencies,
      stackblitz: { startCommand: 'npm run dev' },
    },
    null,
    2,
  );
  files['index.html'] = starter.html;
  files['tsconfig.json'] = JSON.stringify(
    {
      ...JSON.parse(starter.tsconfig),
      compilerOptions: {
        ...JSON.parse(starter.tsconfig).compilerOptions,
        paths: { '@/*': ['./src/*'] },
      },
    },
    null,
    2,
  );
  files['vite.config.ts'] =
    `${tailwind ? "import tailwindcss from '@tailwindcss/vite';\n" : ''}import { fileURLToPath } from 'node:url';\n${starter.vite.replace(
      /plugins: \[(\w+\([^)]*\))\]/,
      `resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },\n  plugins: [$1${tailwind ? ', tailwindcss()' : ''}]`,
    )}`;
  files[starter.main] =
    `${tailwind ? '' : `import '${moduix}/reset.css';\nimport '${moduix}/style.css';\n`}import './styles.css';
import '@fontsource-variable/noto-sans';
${starter.mount(`../${project.entry}`.replace('../src/', './'))}`;
  files['src/styles.css'] =
    `${tailwind ? `@import '${moduix}-tailwind/style.css';\n@import 'tailwindcss';\n@source '../node_modules/${moduix}-tailwind/dist/components';\n` : ''}
:root { --moduix-font-sans: 'Noto Sans Variable', sans-serif; }
body { position: relative; margin: 0; background: var(--moduix-background); color: var(--moduix-foreground); font-family: var(--moduix-font-sans); }
#app-root { isolation: isolate; }
main { display: grid; justify-items: center; gap: 1rem; padding: 3rem 1rem; }
main > * { max-width: 100%; }
[data-preview-meta] { display: grid; gap: 1rem; padding: 1rem; border: 1px solid var(--moduix-border); border-radius: 0.5rem; }
@media (prefers-color-scheme: dark) { :root { color-scheme: dark; } }`;
  if (framework === 'react') {
    files['src/components/mdx/Components.tsx'] = `import type { ComponentProps } from 'react';
export function PreviewMeta(props: ComponentProps<'div'>) { return <div {...props} data-preview-meta />; }`;
  }
  return {
    title: `moduix · ${project.entry
      .split('/')
      .filter((part) => !['src', 'components', 'examples', 'snippets', framework].includes(part))
      .join('/')
      .replace(/\.\w+$/, '')}`,
    description: `Edit and run a moduix ${framework[0].toUpperCase()}${framework.slice(1)} example.`,
    template: 'node',
    files,
  };
}