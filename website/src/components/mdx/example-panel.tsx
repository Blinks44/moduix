import { useI18n, usePage } from '@rspress/core/runtime';
import { CodeBlockRuntime, useStorageValue } from '@rspress/core/theme';
import sdk from '@stackblitz/sdk';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Maximize2,
  Minimize2,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import styles from './example-panel.module.css';
import { createExampleProject, type ExampleProject } from './example-project';
import { ExampleFrame } from './reference';

// Index order matches the `groupId="framework"` and `groupId="styling"` tabs, so the panel
// selects and every Rspress tab group on the site share one stored choice.
const frameworks = [
  { value: 'react', label: 'React', lang: 'tsx' },
  { value: 'solid', label: 'Solid', lang: 'tsx' },
  { value: 'vue', label: 'Vue', lang: 'vue' },
  { value: 'svelte', label: 'Svelte', lang: 'svelte' },
] as const;
const stylings = [
  { value: 'css-modules', label: 'CSS Modules' },
  { value: 'tailwind', label: 'Tailwind CSS' },
] as const;
const importStyles = [
  { value: 'package', label: 'npm' },
  { value: 'registry', label: 'shadcn CLI' },
] as const;

type Framework = (typeof frameworks)[number]['value'];
type ImportStyle = (typeof importStyles)[number]['value'];

function useStoredIndex(groupId: string, length: number) {
  const [stored, setStored] = useStorageValue(`rspress.tabs.${groupId}`, '0');
  const index = Number(stored);

  return [Number.isInteger(index) && index >= 0 && index < length ? index : 0, setStored] as const;
}

function useExampleSelection() {
  const [frameworkIndex, setFramework] = useStoredIndex('framework', frameworks.length);
  const [stylingIndex, setStyling] = useStoredIndex('styling', stylings.length);
  const [importStyleIndex, setImportStyle] = useStoredIndex('importStyle', importStyles.length);

  // Shared links can open the examples on a framework, e.g. `?framework=solid`.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('framework');
    const index = frameworks.findIndex((item) => item.value === value);
    if (index >= 0) setFramework(String(index));
    // Apply the link once; later selections belong to the reader.
  }, []);

  return {
    framework: frameworks[frameworkIndex],
    styling: stylings[stylingIndex],
    importStyle: importStyles[importStyleIndex],
    selectFramework: (value: string) =>
      setFramework(String(frameworks.findIndex((item) => item.value === value))),
    selectStyling: (value: string) =>
      setStyling(String(stylings.findIndex((item) => item.value === value))),
    selectImportStyle: (value: string) =>
      setImportStyle(String(importStyles.findIndex((item) => item.value === value))),
  };
}

function toDisplayCode(code: string) {
  return code
    .replaceAll(/@\/registry\/[\w-]+\/ui\//g, '@/components/ui/')
    .replaceAll(/@\/components\/examples\/(?:[^/'"]+\/)*([^/'"]+\.module\.css)/g, './$1');
}

function applyImportStyle(
  code: string,
  framework: Framework,
  importStyle: ImportStyle,
  styling = 'css-modules',
) {
  const pkg = styling === 'tailwind' ? `${framework}-tailwind` : framework;

  if (importStyle === 'package') {
    return code.replaceAll(
      /(['"])@\/components\/ui\/([^'"]+)\1/g,
      (_, quote: string, subpath: string) => `${quote}@moduix/${pkg}/${subpath}${quote}`,
    );
  }

  return code.replaceAll(
    new RegExp(`(['"])@moduix/${framework}(?:-tailwind)?/([^'"]+)\\1`, 'g'),
    (_, quote: string, subpath: string) => {
      if (subpath === 'style.css' || subpath === 'reset.css') {
        return `${quote}@/lib/moduix/styles/${subpath}${quote}`;
      }
      if (subpath === 'locale' || subpath === 'collection') {
        return `${quote}@ark-ui/${framework}/${subpath}${quote}`;
      }
      return `${quote}@/components/ui/${subpath}${quote}`;
    },
  );
}

function toStyling(
  code: string,
  framework: Framework,
  styling: string,
  importStyle: ImportStyle = 'package',
) {
  const normalized = toDisplayCode(code);
  const styled =
    styling === 'tailwind'
      ? normalized.replaceAll(
          new RegExp(`(['"])@moduix/${framework}/`, 'g'),
          `$1@moduix/${framework}-tailwind/`,
        )
      : normalized;
  return applyImportStyle(styled, framework, importStyle, styling);
}

function PanelSelect({
  dot,
  label,
  options,
  value,
  onChange,
}: {
  dot?: string;
  label: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <span className={styles.select} data-dot={dot}>
      <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" />
    </span>
  );
}

const viewports = [
  { value: 'desktop', label: 'Desktop preview', Icon: Monitor },
  { value: 'tablet', label: 'Tablet preview (768px)', Icon: Tablet },
  { value: 'mobile', label: 'Mobile preview (390px)', Icon: Smartphone },
] as const;

type Viewport = (typeof viewports)[number]['value'];

const optionalBlockDeps: Record<string, string> = {
  'lucide-react': '^1.77.0',
  'lucide-solid': '^1.77.0',
  '@lucide/vue': '^1.77.0',
  '@lucide/svelte': '^1.77.0',
  '@tanstack/charts': '^1.5.0',
  '@tanstack/react-table': '^9.3.1',
  '@tanstack/solid-table': '^9.3.1',
  '@tanstack/vue-table': '^9.3.1',
  '@tanstack/svelte-table': '^9.3.1',
};

function buildBlockProject(
  rawCode: string,
  framework: Framework,
  extraFiles: { name: string; code: string }[],
  blockSlug: string,
): ExampleProject {
  const ext = framework === 'vue' ? 'vue' : framework === 'svelte' ? 'svelte' : 'tsx';
  const entry = `src/${blockSlug}.${ext}`;
  let entryCode = toDisplayCode(rawCode).replaceAll(
    /(['"])@\/components\/ui\/([^'"]+)\1/g,
    (_, quote: string, subpath: string) => `${quote}@moduix/${framework}/${subpath}${quote}`,
  );
  if ((framework === 'react' || framework === 'solid') && !/\bexport\s+default\b/.test(entryCode)) {
    const match =
      entryCode.match(/export\s+function\s+(\w+)/) ?? entryCode.match(/export\s*\{\s*([A-Z]\w*)\b/);
    if (match) {
      entryCode = `${entryCode.trimEnd()}\n\nexport default ${match[1]};\n`;
    }
  }
  const files: Record<string, string> = { [entry]: entryCode };
  for (const file of extraFiles) {
    files[`src/${file.name}`] = file.code;
  }
  const dependencies: Record<string, string> = {};
  for (const [pkg, version] of Object.entries(optionalBlockDeps)) {
    if (entryCode.includes(`'${pkg}`) || entryCode.includes(`"${pkg}`)) {
      dependencies[pkg] = version;
    }
  }
  return { entry, files, dependencies };
}

function ExamplePanel({
  children,
  sources,
  tailwindSources,
  files = [],
  tailwindFiles,
  projects,
  tailwindProjects,
  ...frameProps
}: {
  children: ReactNode;
  sources: Record<Framework, string>;
  tailwindSources?: Record<Framework, string>;
  files?: { name: string; code: string }[];
  tailwindFiles?: { name: string; code: string }[];
  projects?: Record<Framework, ExampleProject>;
  tailwindProjects?: Record<Framework, ExampleProject>;
} & Omit<ComponentProps<typeof ExampleFrame>, 'children' | 'variant'>) {
  const t = useI18n<typeof import('i18n')>();
  const { page } = usePage();
  const blockSlug = typeof page?.frontmatter?.block === 'string' ? page.frontmatter.block : '';
  const isBlock = Boolean(blockSlug);
  const { framework, styling, importStyle, selectFramework, selectStyling, selectImportStyle } =
    useExampleSelection();
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [run, setRun] = useState(0);
  const [copied, setCopied] = useState(false);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [fullscreen, setFullscreen] = useState(false);
  const isTailwind = styling.value === 'tailwind';
  const rawSource =
    isTailwind && tailwindSources ? tailwindSources[framework.value] : sources[framework.value];
  const code =
    isTailwind && tailwindSources
      ? applyImportStyle(toDisplayCode(rawSource), framework.value, importStyle.value, 'tailwind')
      : toStyling(rawSource, framework.value, styling.value, importStyle.value);
  const visibleFiles = isTailwind
    ? (tailwindFiles ??
      files.filter((file) => !file.name.endsWith('.module.css') || code.includes(file.name)))
    : files;
  const explicitProject =
    isTailwind && tailwindProjects
      ? tailwindProjects[framework.value]
      : projects?.[framework.value];
  const project =
    explicitProject ??
    (isBlock ? buildBlockProject(rawSource, framework.value, visibleFiles, blockSlug) : undefined);

  useEffect(() => {
    if (!fullscreen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [fullscreen]);

  if (import.meta.env.SSG_MD) {
    return (
      <>
        {frameworks.map(
          (item) =>
            `\n<!-- moduix-fw:${item.value} -->\n**${item.label}**\n\n\`\`\`${item.lang}\n${toDisplayCode(sources[item.value])}\n\`\`\`\n<!-- /moduix-fw -->\n`,
        )}
        {files.map((file) => `\n\`\`\`css title="${file.name}"\n${file.code}\n\`\`\`\n`)}
      </>
    );
  }

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`rp-not-doc ${styles.panel}`} data-fullscreen={fullscreen ? 'true' : undefined}>
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist">
          {(['preview', 'code'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              className={styles.tab}
              onClick={() => setTab(value)}
            >
              {t(value === 'preview' ? 'examplePreview' : 'exampleCode')}
            </button>
          ))}
        </div>
        <div className={styles.controls}>
          {isBlock && tab === 'preview' ? (
            <div className={styles.viewportGroup} role="group" aria-label="Preview viewport">
              {viewports.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  className={styles.viewportButton}
                  aria-label={label}
                  aria-pressed={viewport === value}
                  title={label}
                  onClick={() => setViewport(value)}
                >
                  <Icon aria-hidden="true" />
                </button>
              ))}
            </div>
          ) : null}
          <PanelSelect
            dot={framework.value}
            label={t('exampleFramework')}
            options={frameworks}
            value={framework.value}
            onChange={selectFramework}
          />
          <PanelSelect
            label={t('exampleStyling')}
            options={stylings}
            value={styling.value}
            onChange={selectStyling}
          />
          {tab === 'code' ? (
            <PanelSelect
              label={t('exampleImports')}
              options={importStyles}
              value={importStyle.value}
              onChange={selectImportStyle}
            />
          ) : null}
          {project ? (
            <button
              type="button"
              className={styles.iconButton}
              aria-label={t('exampleOpenStackBlitz')}
              title={t('exampleOpenStackBlitz')}
              onClick={() =>
                sdk.openProject(createExampleProject(project, framework.value, styling.value), {
                  openFile: project.entry,
                  newWindow: true,
                })
              }
            >
              <ArrowUpRight aria-hidden="true" />
            </button>
          ) : null}
          {isBlock ? (
            <button
              type="button"
              className={styles.iconButton}
              aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen preview'}
              aria-pressed={fullscreen}
              title={fullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen preview'}
              onClick={() => setFullscreen((value) => !value)}
            >
              {fullscreen ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
            </button>
          ) : null}
          {tab === 'preview' ? (
            <button
              type="button"
              className={styles.iconButton}
              aria-label={t('exampleReload')}
              title={t('exampleReload')}
              onClick={() => setRun((value) => value + 1)}
            >
              <RotateCw aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              className={styles.iconButton}
              aria-label={t(copied ? 'exampleCopied' : 'exampleCopy')}
              title={t(copied ? 'exampleCopied' : 'exampleCopy')}
              onClick={copy}
            >
              {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
      {tab === 'preview' ? (
        <div className={styles.stage} data-viewport={isBlock ? viewport : undefined}>
          {isBlock ? (
            <div className={styles.viewportFrame} data-viewport={viewport}>
              <ExampleFrame key={run} variant="component" {...frameProps}>
                {children}
              </ExampleFrame>
            </div>
          ) : (
            <ExampleFrame key={run} variant="component" {...frameProps}>
              {children}
            </ExampleFrame>
          )}
        </div>
      ) : (
        <div className={styles.code}>
          <CodeBlockRuntime lang={framework.lang} code={code} />
          {visibleFiles.map((file) => (
            <CodeBlockRuntime key={file.name} lang="css" title={file.name} code={file.code} />
          ))}
        </div>
      )}
    </div>
  );
}

// A source file shown for the framework chosen in the example panels, titled with its file name.
function FrameworkCode({ sources, name }: { sources: Record<Framework, string>; name: string }) {
  const { framework, importStyle } = useExampleSelection();

  if (import.meta.env.SSG_MD) {
    return (
      <>
        {frameworks.map(
          (item) =>
            `\n<!-- moduix-fw:${item.value} -->\n\`\`\`${item.lang} title="${name}.${item.lang}"\n${toDisplayCode(sources[item.value])}\n\`\`\`\n<!-- /moduix-fw -->\n`,
        )}
      </>
    );
  }

  return (
    <CodeBlockRuntime
      lang={framework.lang}
      title={`${name}.${framework.lang}`}
      code={applyImportStyle(
        toDisplayCode(sources[framework.value]),
        framework.value,
        importStyle.value,
      )}
    />
  );
}

export {
  applyImportStyle,
  ExamplePanel,
  FrameworkCode,
  toDisplayCode,
  toStyling,
  useExampleSelection,
};