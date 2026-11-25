import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import { useI18n } from '@rspress/core/runtime';
import { CodeBlockRuntime, Link, PackageManagerTabs, Tab, Tabs } from '@rspress/core/theme';
import { ArrowRight, ArrowUpRight, Check, Rocket } from 'lucide-react';
import { useExampleSelection } from '@/components/mdx/example-panel';
import { useLocalizedPath } from '@/utils/localized-path';
import styles from './starters.module.css';

const starters = [
  { framework: 'react', title: 'React' },
  { framework: 'solid', title: 'Solid' },
  { framework: 'vue', title: 'Vue' },
  { framework: 'svelte', title: 'Svelte' },
] as const;

const stylingItems = [
  { value: 'css-modules', label: 'CSS Modules' },
  { value: 'tailwind', label: 'Tailwind CSS' },
];

function starterSlug(framework: string, isTailwind: boolean) {
  return isTailwind ? `${framework}-vite-tailwind` : `${framework}-vite`;
}

function StarterEntry() {
  const t = useI18n<typeof import('i18n')>();
  const href = useLocalizedPath('/docs/starters');

  return (
    <aside className={`rp-not-doc ${styles.entry}`}>
      <span className={styles.iconTile}>
        <Rocket aria-hidden="true" />
      </span>
      <div className={styles.entryText}>
        <strong>{t('starterEntryTitle')}</strong>
        <p>{t('starterEntryDescription')}</p>
      </div>
      <Link href={href} className={styles.button}>
        {t('starterBrowse')}
        <ArrowRight aria-hidden="true" />
      </Link>
    </aside>
  );
}

function StarterCards() {
  const t = useI18n<typeof import('i18n')>();
  const { styling, selectStyling } = useExampleSelection();
  const isTailwind = styling.value === 'tailwind';
  const meta = isTailwind
    ? 'TypeScript · Tailwind CSS v4 · Vite'
    : 'TypeScript · CSS Modules · Vite';

  return (
    <div className="rp-not-doc">
      <div className={styles.stylingBar}>
        <SegmentGroup
          aria-label="Starter styling"
          value={styling.value}
          onValueChange={(details) => {
            if (details.value === 'css-modules' || details.value === 'tailwind') {
              selectStyling(details.value);
            }
          }}
        >
          <SegmentGroupIndicator />
          <SegmentGroupItems items={stylingItems} />
        </SegmentGroup>
      </div>
      <div className={styles.cards}>
        {starters.map(({ framework, title }) => {
          const slug = starterSlug(framework, isTailwind);
          return (
            <article className={styles.card} key={framework}>
              <div className={styles.preview}>
                <img src={`/starters/${framework}.png`} alt="" width="1280" height="800" />
              </div>
              <div className={styles.cardBody}>
                <strong className={styles.title} data-framework={framework}>
                  {title}
                </strong>
                <p className={styles.meta}>{meta}</p>
                <div className={styles.actions}>
                  <a
                    className={styles.button}
                    href={`https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/${slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('starterOpen')}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                  <a
                    className={styles.button}
                    href={`https://github.com/Blinks44/moduix/tree/main/starters/${slug}`}
                    aria-label={`${title} · GitHub`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.github} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function StarterCopy() {
  const { styling } = useExampleSelection();
  const isTailwind = styling.value === 'tailwind';

  if (import.meta.env.SSG_MD) {
    return (
      <>
        {starters.map(
          ({ framework, title }) =>
            `\n<!-- moduix-fw:${framework} -->\n**${title}**\n\nCSS Modules:\n\`\`\`bash\npnpm dlx giget@latest gh:Blinks44/moduix/starters/${framework}-vite my-app\n\`\`\`\n\nTailwind CSS v4:\n\`\`\`bash\npnpm dlx giget@latest gh:Blinks44/moduix/starters/${framework}-vite-tailwind my-app\n\`\`\`\n<!-- /moduix-fw -->\n`,
        )}
      </>
    );
  }

  return (
    <Tabs groupId="framework">
      {starters.map(({ framework, title }) => (
        <Tab key={framework} label={title} value={framework}>
          <PackageManagerTabs
            command={`giget@latest gh:Blinks44/moduix/starters/${starterSlug(framework, isTailwind)} my-app`}
            dlx
          />
        </Tab>
      ))}
    </Tabs>
  );
}

function StarterInstall() {
  return (
    <PackageManagerTabs
      command={{
        npm: 'cd my-app\nnpm install\nnpm run dev',
        yarn: 'cd my-app\nyarn install\nyarn dev',
        pnpm: 'cd my-app\npnpm install\npnpm dev',
        bun: 'cd my-app\nbun install\nbun run dev',
        deno: 'cd my-app\ndeno install\ndeno task dev',
      }}
    />
  );
}

function StarterContents() {
  const t = useI18n<typeof import('i18n')>();
  const { framework, styling } = useExampleSelection();
  const sfc = framework.value === 'vue' || framework.value === 'svelte';
  const extension = sfc ? framework.value : 'tsx';
  const entry = sfc ? 'ts' : 'tsx';
  const isTailwind = styling.value === 'tailwind';
  const mainNote = isTailwind ? 'font and styles entry' : 'reset, foundation, Calm';
  const stylesNote = isTailwind ? 'foundation, Tailwind v4, @source' : 'layout and #app-root';
  const navFile = sfc ? `\n    AppNavigation.${extension}` : '';
  const mainFile = `main.${entry}`.padEnd(16);
  const appFile = `App.${extension}`.padEnd(16);
  const tree = `index.html\npackage.json\nvite.config.ts\nsrc/\n  ${mainFile}// ${mainNote}\n  ${appFile}// app state and pages\n  data.ts         // sample projects\n  styles.css      // ${stylesNote}\n  components/${navFile}\n    AppShell.${extension}\n    ProjectTable.${extension}\n    ProjectDialog.${extension}`;

  return (
    <div className={styles.contents}>
      <CodeBlockRuntime lang="text" title="my-app" code={tree} />
      <div>
        <strong>{t('starterIncluded')}</strong>
        <ul className={styles.features}>
          {(
            [
              'starterFeatureShell',
              'starterFeatureTable',
              'starterFeatureDialog',
              'starterFeatureUndo',
              'starterFeatureTheme',
              'starterFeatureIsolation',
            ] as const
          ).map((key) => (
            <li key={key}>
              <Check aria-hidden="true" />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { StarterCards, StarterContents, StarterCopy, StarterEntry, StarterInstall };