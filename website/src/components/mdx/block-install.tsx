import { useI18n, useLang } from '@rspress/core/runtime';
import { PackageManagerTabs } from '@rspress/core/theme';
import styles from './component-install.module.css';
import { useExampleSelection } from './example-panel';

declare const __MODUIX_BLOCK_DEPS__: Record<string, string[]>;

function toComponentName(slug: string) {
  return slug.replace(/(^|-)(\w)/g, (_, __, letter: string) => letter.toUpperCase());
}

// Install section of a block page: one shadcn command for the framework and styling chosen in the
// preview panel, and the UI components it brings along, read from the block registry at build time.
function BlockInstall({ name }: { name: string }) {
  const t = useI18n<typeof import('i18n')>();
  const lang = useLang();
  const { framework, styling } = useExampleSelection();
  const namespace = `${framework.value}${styling.value === 'tailwind' ? '-tailwind' : ''}`;
  const deps = __MODUIX_BLOCK_DEPS__[`${namespace}-${name}`] ?? [];
  const components = new Intl.ListFormat(lang, { type: 'conjunction' }).format(
    deps.map(toComponentName),
  );
  const [before, after] = t('blockInstallNote').split('{components}');

  if (import.meta.env.SSG_MD) {
    const listFormat = new Intl.ListFormat('en', { type: 'conjunction' });
    return (
      <>
        {(['react', 'solid', 'vue', 'svelte'] as const).map((fw) => {
          const fwDeps = __MODUIX_BLOCK_DEPS__[`${fw}-${name}`] ?? [];
          const fwComponents =
            fwDeps.length > 0 ? listFormat.format(fwDeps.map(toComponentName)) : '';
          const note = fwComponents ? `\nInstalls ${fwComponents} alongside the block.` : '';
          return (
            `\n<!-- moduix-fw:${fw} -->\n` +
            `\`\`\`sh\npnpm dlx shadcn@latest add @moduix-${fw}/${name}\n\`\`\`\n` +
            `${note}\n` +
            `For Tailwind CSS, use \`@moduix-${fw}-tailwind/${name}\`.\n` +
            `<!-- /moduix-fw -->\n`
          );
        })}
      </>
    );
  }

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