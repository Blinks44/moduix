import { useFrontmatter, useI18n } from '@rspress/core/runtime';
import { CodeBlockRuntime, Link, PackageManagerTabs, Tab, Tabs } from '@rspress/core/theme';
import type { ReactNode } from 'react';
import { useLocalizedPath } from '@/utils/localized-path';
import styles from './component-install.module.css';
import { useExampleSelection } from './example-panel';

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

function toExportName(slug: string) {
  return slug.replace(/(^|-)(\w)/g, (_, __, letter: string) => letter.toUpperCase());
}

// Installation section of a component page: the package path with its subpath import, and the
// shadcn registry path, both for the framework and styling chosen in the example panels.
function ComponentInstall() {
  const t = useI18n<typeof import('i18n')>();
  const { frontmatter } = useFrontmatter();
  const { framework, styling } = useExampleSelection();
  const quickStartPath = useLocalizedPath('/docs/quick-start');
  const component = String(frontmatter.component);
  const packageName = `${framework.value}${styling.value === 'tailwind' ? '-tailwind' : ''}`;
  const subpath = `@moduix/${packageName}/${component}`;
  const quickStart = fill(
    t('installQuickStartNote'),
    'link',
    <Link href={quickStartPath}>{t('installQuickStartLabel')}</Link>,
  );

  return (
    <Tabs className={styles.tabs}>
      <Tab label={t('installPackage')}>
        <div className={styles.package}>
          <PackageManagerTabs
            command={`install @moduix/${packageName} @ark-ui/${framework.value}`}
          />
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
    </Tabs>
  );
}

export { ComponentInstall };