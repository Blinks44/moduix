import { useI18n, useLang } from '@rspress/core/runtime';
import { PackageManagerTabs } from '@rspress/core/theme';
import registry from '../../../registry.json';
import styles from './component-install.module.css';
import { useExampleSelection } from './example-panel';

function toComponentName(url: string) {
  return (url.split('/').pop() ?? '')
    .replace(/\.json$/, '')
    .replace(/(^|-)(\w)/g, (_, __, letter: string) => letter.toUpperCase());
}

// Install section of a block page: one shadcn command for the framework and styling chosen in the
// preview panel, and the UI components it brings along, read from the block registry.
function BlockInstall({ name }: { name: string }) {
  const t = useI18n<typeof import('i18n')>();
  const lang = useLang();
  const { framework, styling } = useExampleSelection();
  const namespace = `${framework.value}${styling.value === 'tailwind' ? '-tailwind' : ''}`;
  const item = registry.items.find((entry) => entry.name === `${namespace}-${name}`);
  const components = new Intl.ListFormat(lang, { type: 'conjunction' }).format(
    (item?.registryDependencies ?? []).map(toComponentName),
  );
  const [before, after] = t('blockInstallNote').split('{components}');

  return (
    <>
      <PackageManagerTabs command={`shadcn@latest add @moduix-${namespace}/${name}`} dlx />
      <p className={styles.note}>
        {before}
        {components}
        {after}
      </p>
    </>
  );
}

export { BlockInstall };