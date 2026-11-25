import { useI18n } from '@rspress/core/runtime';
import { CodeBlockRuntime, useStorageValue } from '@rspress/core/theme';
import sdk from '@stackblitz/sdk';
import { ArrowUpRight, Check, ChevronDown, Copy, RotateCw } from 'lucide-react';
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

function applyImportStyle(code: string, framework: Framework, importStyle: ImportStyle) {
  if (importStyle !== 'registry') return code;

  return code.replaceAll(
    new RegExp(`(['"])@moduix/${framework}(?:-tailwind)?/([^'"]+)\\1`, 'g'),
    (_, quote: string, subpath: string) => {
      if (subpath === 'style.css' || subpath === 'reset.css') {
        return `${quote}@/lib/moduix/styles/${subpath}${quote}`;
      }
      if (subpath === 'locale') {
        return `${quote}@/lib/moduix/locale${quote}`;
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
      ? normalized.replaceAll(`'@moduix/${framework}/`, `'@moduix/${framework}-tailwind/`)
      : normalized;
  return applyImportStyle(styled, framework, importStyle);
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
  const { framework, styling, importStyle, selectFramework, selectStyling, selectImportStyle } =
    useExampleSelection();
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [run, setRun] = useState(0);
  const [copied, setCopied] = useState(false);
  const isTailwind = styling.value === 'tailwind';
  const code =
    isTailwind && tailwindSources
      ? applyImportStyle(
          toDisplayCode(tailwindSources[framework.value]),
          framework.value,
          importStyle.value,
        )
      : toStyling(sources[framework.value], framework.value, styling.value, importStyle.value);
  const visibleFiles = isTailwind
    ? (tailwindFiles ??
      files.filter((file) => !file.name.endsWith('.module.css') || code.includes(file.name)))
    : files;
  const project =
    isTailwind && tailwindProjects
      ? tailwindProjects[framework.value]
      : projects?.[framework.value];

  if (import.meta.env.SSG_MD) {
    return (
      <>
        {frameworks.map(
          (item) =>
            `\n**${item.label}**\n\n\`\`\`${item.lang}\n${toDisplayCode(sources[item.value])}\n\`\`\`\n`,
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
    <div className={`rp-not-doc ${styles.panel}`}>
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
        <div className={styles.stage}>
          <ExampleFrame key={run} variant="component" {...frameProps}>
            {children}
          </ExampleFrame>
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
            `\n\`\`\`${item.lang} title="${name}.${item.lang}"\n${toDisplayCode(sources[item.value])}\n\`\`\`\n`,
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