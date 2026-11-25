import { CodeBlockRuntime, PackageManagerTabs } from '@rspress/core/theme';
import { useEffect } from 'react';
import { useExampleSelection } from '@/components/mdx/example-panel';
import componentsCssModules from '../../../snippets/quick-start/components-css-modules.json?raw';
import componentsTailwind from '../../../snippets/quick-start/components-tailwind.json?raw';
import reactCssModules from '../../../snippets/quick-start/react-css-modules.tsx?raw';
import reactTailwind from '../../../snippets/quick-start/react-tailwind.tsx?raw';
import shadcnAccordionSvelte from '../../../snippets/quick-start/shadcn-accordion-svelte.svelte?raw';
import shadcnAccordionVue from '../../../snippets/quick-start/shadcn-accordion-vue.vue?raw';
import shadcnAccordion from '../../../snippets/quick-start/shadcn-accordion.tsx?raw';
import solidCssModules from '../../../snippets/quick-start/solid-css-modules.tsx?raw';
import solidTailwind from '../../../snippets/quick-start/solid-tailwind.tsx?raw';
import svelteCssModules from '../../../snippets/quick-start/svelte-css-modules.svelte?raw';
import svelteTailwind from '../../../snippets/quick-start/svelte-tailwind.svelte?raw';
import vueCssModules from '../../../snippets/quick-start/vue-css-modules.vue?raw';
import vueTailwind from '../../../snippets/quick-start/vue-tailwind.vue?raw';
import styles from './quick-start-flow.module.css';

type Framework = 'react' | 'solid' | 'vue' | 'svelte';
type Styling = 'css-modules' | 'tailwind';

const frameworkOptions = [
  {
    value: 'react',
    label: 'React',
    entry: 'main.tsx',
    entryLang: 'tsx',
    appFile: 'App.tsx',
    appLang: 'tsx',
  },
  {
    value: 'solid',
    label: 'Solid',
    entry: 'index.tsx',
    entryLang: 'tsx',
    appFile: 'App.tsx',
    appLang: 'tsx',
  },
  {
    value: 'vue',
    label: 'Vue',
    entry: 'main.ts',
    entryLang: 'ts',
    appFile: 'App.vue',
    appLang: 'vue',
  },
  {
    value: 'svelte',
    label: 'Svelte',
    entry: 'main.ts',
    entryLang: 'ts',
    appFile: 'App.svelte',
    appLang: 'svelte',
  },
] as const;

const stylingOptions = [
  { value: 'css-modules', label: 'CSS Modules' },
  { value: 'tailwind', label: 'Tailwind CSS' },
] as const;

const methodOptions = [
  { value: 'package', label: 'npm package' },
  { value: 'registry', label: 'shadcn CLI' },
] as const;

const packageSnippets: Record<Framework, Record<Styling, string>> = {
  react: { 'css-modules': reactCssModules, tailwind: reactTailwind },
  solid: { 'css-modules': solidCssModules, tailwind: solidTailwind },
  vue: { 'css-modules': vueCssModules, tailwind: vueTailwind },
  svelte: { 'css-modules': svelteCssModules, tailwind: svelteTailwind },
};

const registrySnippets: Record<Framework, string> = {
  react: shadcnAccordion,
  solid: shadcnAccordion,
  vue: shadcnAccordionVue,
  svelte: shadcnAccordionSvelte,
};

function getPackageStylesCode(framework: Framework, styling: Styling) {
  if (styling === 'tailwind') {
    return `@import '@moduix/${framework}-tailwind/style.css';\n@import 'tailwindcss';\n@source '../node_modules/@moduix/${framework}-tailwind/dist/components';`;
  }
  return `import '@moduix/${framework}/reset.css';\nimport '@moduix/${framework}/style.css';`;
}

function getRegistryStylesCode(styling: Styling) {
  if (styling === 'tailwind') {
    return `@import './lib/moduix/styles/style.css';\n@import 'tailwindcss';`;
  }
  return `import '@/lib/moduix/styles/reset.css';\nimport '@/lib/moduix/styles/style.css';`;
}

export function QuickStartFlow() {
  const { framework, styling, importStyle, selectFramework, selectStyling, selectImportStyle } =
    useExampleSelection();

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === '#install-with-the-shadcn-cli') {
        selectImportStyle('registry');
      } else if (window.location.hash === '#install-as-a-package') {
        selectImportStyle('package');
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  if (import.meta.env.SSG_MD) {
    return [
      '## Install as a package',
      '',
      '1. Install `@moduix/<framework>` (or `@moduix/<framework>-tailwind`) and `@ark-ui/<framework>` (`react`, `solid`, `vue`, or `svelte`).',
      '2. Import styles once in your entry point:',
      '   - CSS Modules: `import "@moduix/<framework>/reset.css"; import "@moduix/<framework>/style.css";`',
      '   - Tailwind CSS: `@import "@moduix/<framework>-tailwind/style.css"; @import "tailwindcss"; @source "../node_modules/@moduix/<framework>-tailwind/dist/components";`',
      '3. Render a component such as `Accordion` from `@moduix/<framework>/accordion`.',
      '',
      '```tsx',
      reactCssModules.trim(),
      '```',
      '',
      '## Install with the shadcn CLI',
      '',
      '1. Initialize: `pnpm dlx shadcn@latest init https://moduix.dev/r/<variant>/init.json` (where `<variant>` is `react`, `solid`, `vue`, `svelte`, or `<framework>-tailwind`).',
      '2. Add a component: `pnpm dlx shadcn@latest add @moduix-<variant>/accordion` and import `@/lib/moduix/styles/style.css` (plus `reset.css` for CSS Modules).',
      '3. Render the generated component from `@/components/ui/accordion`.',
      '',
      '```tsx',
      shadcnAccordion.trim(),
      '```',
    ].join('\n');
  }

  const fw = framework.value as Framework;
  const st = styling.value as Styling;
  const isRegistry = importStyle.value === 'registry';
  const fwMeta = frameworkOptions.find((item) => item.value === fw) ?? frameworkOptions[0];
  const pkgName = st === 'tailwind' ? `${fw}-tailwind` : fw;

  const packageStylesCode = getPackageStylesCode(fw, st);
  const registryStylesCode = getRegistryStylesCode(st);
  const componentCode = isRegistry ? registrySnippets[fw] : packageSnippets[fw][st];

  return (
    <div className={`rp-not-doc ${styles.flow}`}>
      <span id="install-as-a-package" className={styles.anchor} aria-hidden="true" />
      <span id="install-with-the-shadcn-cli" className={styles.anchor} aria-hidden="true" />

      <div className={styles.selector} aria-label="Stack selector">
        <div className={styles.group}>
          <p className={styles.groupLabel}>Framework</p>
          <div className={styles.pills} role="group" aria-label="Framework">
            {frameworkOptions.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={fw === item.value}
                onClick={() => selectFramework(item.value)}
              >
                <span className={styles.dot} data-framework={item.value} aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <p className={styles.groupLabel}>Styling</p>
          <div className={styles.pills} role="group" aria-label="Styling">
            {stylingOptions.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={st === item.value}
                onClick={() => selectStyling(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <p className={styles.groupLabel}>Install</p>
          <div className={styles.pills} role="group" aria-label="Install method">
            {methodOptions.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={importStyle.value === item.value}
                onClick={() => selectImportStyle(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isRegistry ? (
        <ol className={styles.steps}>
          <li className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <div className={styles.stepBody}>
              <h3 className={styles.stepTitle}>Initialize the registry</h3>
              <p className={styles.stepText}>
                Writes <code>components.json</code> with the right aliases and namespace, installs
                base dependencies, and copies foundation styles
                {st === 'css-modules' ? ' (including reset.css)' : ''}.
              </p>
              <PackageManagerTabs
                command={`shadcn@latest init https://moduix.dev/r/${pkgName}/init.json`}
                dlx
              />
              <p className={styles.stepText}>
                Map <code>@/*</code> to your source directory in TypeScript and your bundler. Set{' '}
                <code>"rsc": true</code> in <code>components.json</code> only in a React Server
                Components app.
              </p>
              <details className={styles.details}>
                <summary>
                  Already have a <code>components.json</code>? Configure registries manually
                </summary>
                <CodeBlockRuntime
                  lang="json"
                  title="components.json"
                  code={st === 'tailwind' ? componentsTailwind : componentsCssModules}
                />
              </details>
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <div className={styles.stepBody}>
              <h3 id="add-styles" className={styles.stepTitle}>
                Add a component and import styles
              </h3>
              <p className={styles.stepText}>
                Add components from the <code>@moduix-{pkgName}</code> namespace (do not mix
                namespaces in one tree):
              </p>
              <PackageManagerTabs command={`shadcn@latest add @moduix-${pkgName}/accordion`} dlx />
              <p className={styles.stepText}>
                {st === 'tailwind'
                  ? 'Load the generated foundation stylesheet before Tailwind; Tailwind Preflight supplies the reset.'
                  : 'Import the generated styles once in your entry point. Skip reset.css if your app already has an equivalent reset.'}
              </p>
              <CodeBlockRuntime
                lang={st === 'tailwind' ? 'css' : fwMeta.entryLang}
                title={st === 'tailwind' ? 'styles.css' : fwMeta.entry}
                code={registryStylesCode}
              />
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <div className={styles.stepBody}>
              <h3 className={styles.stepTitle}>Use the generated component</h3>
              <p className={styles.stepText}>
                Render the component from <code>@/components/ui/accordion</code>. The trigger should
                use moduix styles and open with both keyboard and pointer input.
              </p>
              <CodeBlockRuntime lang={fwMeta.appLang} title={fwMeta.appFile} code={componentCode} />
            </div>
          </li>
        </ol>
      ) : (
        <ol className={styles.steps}>
          <li className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <div className={styles.stepBody}>
              <h3 className={styles.stepTitle}>Install the package</h3>
              <p className={styles.stepText}>
                Components, CSS, and design tokens ship together. Install moduix and the matching
                Ark UI runtime.
              </p>
              <PackageManagerTabs command={`install @moduix/${pkgName} @ark-ui/${fw}`} />
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <div className={styles.stepBody}>
              <h3 id="add-styles" className={styles.stepTitle}>
                Add styles
              </h3>
              <p className={styles.stepText}>
                {st === 'tailwind'
                  ? 'Import the foundation before Tailwind and point @source at the package components. Tailwind Preflight supplies the reset.'
                  : 'Import the reset and the foundation once in your entry point. Skip reset.css if your app already has an equivalent reset.'}
              </p>
              <CodeBlockRuntime
                lang={st === 'tailwind' ? 'css' : fwMeta.entryLang}
                title={st === 'tailwind' ? 'styles.css' : fwMeta.entry}
                code={packageStylesCode}
              />
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <div className={styles.stepBody}>
              <h3 className={styles.stepTitle}>Use a component</h3>
              <p className={styles.stepText}>
                Accordion ships in every framework and styling track, so it is a good first check.
                The trigger should use moduix styles and open with keyboard and pointer input.
              </p>
              <CodeBlockRuntime lang={fwMeta.appLang} title={fwMeta.appFile} code={componentCode} />
            </div>
          </li>
        </ol>
      )}
    </div>
  );
}