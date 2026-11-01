import type { Project } from '@stackblitz/sdk';
import html from '../../../../starters/react-vite/index.html?raw';
import starterPackage from '../../../../starters/react-vite/package.json';
import tsconfig from '../../../../starters/react-vite/tsconfig.json?raw';
import vite from '../../../../starters/react-vite/vite.config.ts?raw';

export type ExampleProject = {
  files: Record<string, string>;
  dependencies: Record<string, string>;
  entry: string;
};

export function createExampleProject(project: ExampleProject, styling: string): Project {
  const tailwind = styling === 'tailwind';
  const files = Object.fromEntries(
    Object.entries(project.files).map(([name, code]) => [
      name,
      tailwind ? code.replaceAll('@moduix/react/', '@moduix/react-tailwind/') : code,
    ]),
  );
  const { packageManager: _, ...basePackage } = starterPackage;
  const dependencies: Record<string, string> = {
    ...basePackage.dependencies,
    ...project.dependencies,
  };
  if (tailwind) {
    dependencies['@moduix/react-tailwind'] = dependencies['@moduix/react'];
    delete dependencies['@moduix/react'];
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
  files['index.html'] = html;
  files['tsconfig.json'] = JSON.stringify(
    {
      ...JSON.parse(tsconfig),
      compilerOptions: { ...JSON.parse(tsconfig).compilerOptions, paths: { '@/*': ['./src/*'] } },
    },
    null,
    2,
  );
  files['vite.config.ts'] = vite
    .replace(
      'import react',
      `${tailwind ? "import tailwindcss from '@tailwindcss/vite';\n" : ''}import { fileURLToPath } from 'node:url';\nimport react`,
    )
    .replace(
      'plugins: [react()]',
      `resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },\n  plugins: [react()${tailwind ? ', tailwindcss()' : ''}]`,
    );
  files['src/main.tsx'] =
    `${tailwind ? '' : "import '@moduix/react/reset.css';\nimport '@moduix/react/style.css';\n"}import './styles.css';
import '@fontsource-variable/noto-sans';
import { createRoot } from 'react-dom/client';
import Example from './${project.entry.replace(/^src\//, '')}';
createRoot(document.getElementById('app-root')!).render(<main><Example /></main>);`;
  files['src/styles.css'] =
    `${tailwind ? "@import '@moduix/react-tailwind/style.css';\n@import 'tailwindcss';\n@source '../node_modules/@moduix/react-tailwind/dist/components';\n" : ''}
:root { --moduix-font-sans: 'Noto Sans Variable', sans-serif; }
body { position: relative; margin: 0; background: var(--moduix-background); color: var(--moduix-foreground); font-family: var(--moduix-font-sans); }
#app-root { isolation: isolate; }
main { display: grid; justify-items: center; gap: 1rem; padding: 3rem 1rem; }
main > * { max-width: 100%; }
[data-preview-meta] { display: grid; gap: 1rem; padding: 1rem; border: 1px solid var(--moduix-border); border-radius: 0.5rem; }
@media (prefers-color-scheme: dark) { :root { color-scheme: dark; } }`;
  files['src/components/mdx/Components.tsx'] = `import type { ComponentProps } from 'react';
export function PreviewMeta(props: ComponentProps<'div'>) { return <div {...props} data-preview-meta />; }`;
  return {
    title: `moduix · ${project.entry.split('/').slice(-2).join('/').replace('.tsx', '')}`,
    description: 'Edit and run a moduix React example.',
    template: 'node',
    files,
  };
}