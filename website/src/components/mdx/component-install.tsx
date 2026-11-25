import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/react/accordion';
import { useFrontmatter, useI18n, withBase } from '@rspress/core/runtime';
import { CodeBlockRuntime, Link, PackageManagerTabs, Tab, Tabs } from '@rspress/core/theme';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { useLocalizedPath } from '@/utils/localized-path';
import styles from './component-install.module.css';
import { useExampleSelection } from './example-panel';

interface RegistryFile {
  path: string;
  target?: string;
  content?: string;
}

interface RegistryItem {
  name: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
}

const registryCache = new Map<string, Promise<RegistryItem>>();

function fetchRegistryItem(url: string): Promise<RegistryItem> {
  const cached = registryCache.get(url);
  if (cached) return cached;

  const request = fetch(url).then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json() as Promise<RegistryItem>;
  });

  registryCache.set(url, request);
  request.catch(() => registryCache.delete(url));
  return request;
}

// Puts a node in place of `{slot}` in a translated sentence.
function fill(template: string, slot: string, node: ReactNode) {
  const [before, after] = template.split(`{${slot}}`);
  return (
    <>
      {before}
      {node}
      {after}
    </>
  );
}

const extraInstallPeers: Partial<Record<string, (framework: string) => string[]>> = {
  chart: () => ['@tanstack/charts'],
  image: (framework) =>
    framework === 'react' ? ['@unpic/core', '@unpic/react', 'unpic'] : ['@unpic/core', 'unpic'],
};

const defaultImportNames: Partial<Record<string, string>> = {
  toast: 'toast, ToastToaster',
};

function toExportName(slug: string) {
  return (
    defaultImportNames[slug] ??
    slug.replace(/(^|-)(\w)/g, (_, __, letter: string) => letter.toUpperCase())
  );
}

function stripVersion(specifier: string) {
  return specifier.replace(/^(@[^/@]+\/[^/@]+|[^/@]+)(?:@.+)?$/, '$1');
}

function formatTargetPath(file: RegistryFile) {
  return (file.target ?? file.path)
    .replace(/^@components\//, 'src/components/')
    .replace(/^@lib\//, 'src/lib/')
    .replace(/^@hooks\//, 'src/hooks/');
}

function fileBasename(filePath: string) {
  return filePath.split('/').at(-1) ?? filePath;
}

function fileLang(filePath: string) {
  if (filePath.endsWith('.tsx')) return 'tsx';
  if (filePath.endsWith('.ts')) return 'ts';
  if (filePath.endsWith('.vue')) return 'vue';
  if (filePath.endsWith('.svelte')) return 'svelte';
  if (filePath.endsWith('.css')) return 'css';
  if (filePath.endsWith('.json')) return 'json';
  return 'text';
}

function formatRegistryDep(dep: string) {
  if (dep.startsWith('http://') || dep.startsWith('https://')) {
    return (
      dep
        .split('/')
        .at(-1)
        ?.replace(/\.json$/, '') ?? dep
    );
  }
  return dep;
}

function ManualInstallPanel({
  active,
  component,
  packageName,
  quickStart,
}: {
  active: boolean;
  component: string;
  packageName: string;
  quickStart: ReactNode;
}) {
  const t = useI18n<typeof import('i18n')>();
  const url = withBase(`/r/${packageName}/${component}.json`);
  const [state, setState] = useState<{
    url: string;
    item?: RegistryItem;
    error?: boolean;
  } | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!active || import.meta.env.SSG_MD) return;
    let cancelled = false;

    setSelectedIndex(0);
    fetchRegistryItem(url)
      .then((item) => {
        if (!cancelled) setState({ url, item });
      })
      .catch(() => {
        if (!cancelled) setState({ url, error: true });
      });

    return () => {
      cancelled = true;
    };
  }, [active, url]);

  if (import.meta.env.SSG_MD) return null;

  if (!active || !state || state.url !== url) {
    return <p className={styles.status}>{t('installManualLoading')}</p>;
  }

  if (state.error || !state.item) {
    return <p className={styles.status}>{t('installManualError')}</p>;
  }

  const item = state.item;
  const deps = (item.dependencies ?? []).map(stripVersion);
  const registryDeps = item.registryDependencies ?? [];
  const files = item.files ?? [];
  const safeIndex = selectedIndex < files.length ? selectedIndex : 0;
  const activeFile = files[safeIndex];
  const activeTarget = activeFile ? formatTargetPath(activeFile) : '';

  return (
    <div className={styles.manual}>
      {deps.length > 0 ? (
        <div className={styles.manualSection}>
          <p className={styles.manualLabel}>{t('installManualDependencies')}</p>
          <PackageManagerTabs command={`install ${deps.join(' ')}`} />
        </div>
      ) : null}

      {registryDeps.length > 0 ? (
        <div className={styles.depRow}>
          <span className={styles.depLabel}>{t('installManualRegistryDependencies')}</span>
          <span className={styles.depList}>
            {registryDeps.map((dep) => (
              <code key={dep} className={styles.depChip}>
                {formatRegistryDep(dep)}
              </code>
            ))}
          </span>
        </div>
      ) : null}

      {files.length > 0 && activeFile ? (
        <div className={styles.manualSection}>
          <div className={styles.filesHeader}>
            <span className={styles.manualLabel}>
              {t('installManualFiles')} ({files.length})
            </span>
            {files.length <= 5 ? (
              <div className={styles.filePills} role="tablist" aria-label={t('installManualFiles')}>
                {files.map((file, index) => {
                  const target = formatTargetPath(file);
                  return (
                    <button
                      key={target}
                      type="button"
                      role="tab"
                      aria-selected={index === safeIndex}
                      className={styles.filePill}
                      onClick={() => setSelectedIndex(index)}
                    >
                      {fileBasename(target)}
                    </button>
                  );
                })}
              </div>
            ) : (
              <span className={styles.fileSelect}>
                <select
                  aria-label={t('installManualFiles')}
                  value={String(safeIndex)}
                  onChange={(event) => setSelectedIndex(Number(event.target.value))}
                >
                  {files.map((file, index) => {
                    const target = formatTargetPath(file);
                    return (
                      <option key={target} value={String(index)}>
                        {fileBasename(target)}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown aria-hidden="true" />
              </span>
            )}
          </div>

          {files.length > 5 ? (
            <Accordion collapsible className={styles.fileListAccordion}>
              <AccordionItem value="files" className={styles.fileListItem}>
                <AccordionItemTrigger className={styles.fileListTrigger}>
                  <span>{t('installManualFileList').replace('{count}', String(files.length))}</span>
                  <AccordionItemIndicator />
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <AccordionItemBody className={styles.fileListBody}>
                    <ul className={styles.fileList}>
                      {files.map((file, index) => {
                        const target = formatTargetPath(file);
                        return (
                          <li key={target}>
                            <button
                              type="button"
                              className={styles.fileListButton}
                              data-active={index === safeIndex ? '' : undefined}
                              onClick={() => setSelectedIndex(index)}
                            >
                              <code>{target}</code>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionItemBody>
                </AccordionItemContent>
              </AccordionItem>
            </Accordion>
          ) : null}

          <div className={styles.manualCode}>
            <CodeBlockRuntime
              lang={fileLang(activeTarget)}
              title={activeTarget}
              code={activeFile.content ?? ''}
            />
          </div>
        </div>
      ) : null}

      <p className={styles.note}>{quickStart}</p>
    </div>
  );
}

// Installation section of a component page: package install, shadcn CLI, and manual source copy,
// all synced with the framework and styling chosen in the example panels.
function ComponentInstall() {
  const t = useI18n<typeof import('i18n')>();
  const { frontmatter } = useFrontmatter();
  const { framework, styling, selectImportStyle } = useExampleSelection();
  const quickStartPath = useLocalizedPath('/docs/quick-start');
  const [manualActive, setManualActive] = useState(false);
  const component = String(frontmatter.component);
  const packageName = `${framework.value}${styling.value === 'tailwind' ? '-tailwind' : ''}`;
  const subpath = `@moduix/${packageName}/${component}`;
  const peers = [
    `@ark-ui/${framework.value}`,
    ...(extraInstallPeers[component]?.(framework.value) ?? []),
  ];
  const quickStart = fill(
    t('installQuickStartNote'),
    'link',
    <Link href={quickStartPath}>{t('installQuickStartLabel')}</Link>,
  );

  if (import.meta.env.SSG_MD) {
    const exportName = toExportName(component);
    return (
      <>
        {(['react', 'solid', 'vue', 'svelte'] as const).map((fw) => {
          const fwPeers = [`@ark-ui/${fw}`, ...(extraInstallPeers[component]?.(fw) ?? [])];
          return (
            `\n<!-- moduix-fw:${fw} -->\n` +
            `\`\`\`sh\npnpm add @moduix/${fw} ${fwPeers.join(' ')}\n\`\`\`\n\n` +
            `\`\`\`ts\nimport { ${exportName} } from '@moduix/${fw}/${component}';\n\`\`\`\n\n` +
            `Or copy the source with the shadcn CLI:\n\n` +
            `\`\`\`sh\npnpm dlx shadcn@latest add @moduix-${fw}/${component}\n\`\`\`\n\n` +
            `For Tailwind CSS, use \`@moduix/${fw}-tailwind/${component}\` or \`@moduix-${fw}-tailwind/${component}\`.\n` +
            `<!-- /moduix-fw -->\n`
          );
        })}
      </>
    );
  }

  return (
    <Tabs
      className={styles.tabs}
      onChange={(index) => {
        setManualActive(index === 2);
        selectImportStyle(index === 0 ? 'package' : 'registry');
      }}
    >
      <Tab label={t('installPackage')}>
        <div className={styles.package}>
          <PackageManagerTabs command={`install @moduix/${packageName} ${peers.join(' ')}`} />
          <CodeBlockRuntime
            lang="tsx"
            code={`import { ${toExportName(component)} } from '${subpath}';`}
          />
        </div>
        <p className={styles.note}>
          {fill(t('installSubpathNote'), 'subpath', <code>{subpath}</code>)} {quickStart}
        </p>
      </Tab>
      <Tab label="shadcn CLI">
        <PackageManagerTabs command={`shadcn@latest add @moduix-${packageName}/${component}`} dlx />
        <p className={styles.note}>
          {t('installRegistryNote')} {quickStart}
        </p>
      </Tab>
      <Tab label={t('installManual')}>
        <ManualInstallPanel
          active={manualActive}
          component={component}
          packageName={packageName}
          quickStart={quickStart}
        />
      </Tab>
    </Tabs>
  );
}

export { ComponentInstall };