import { useI18n } from '@rspress/core/runtime';
import { CodeBlockRuntime, PackageManagerTabs, Link } from '@rspress/core/theme';
import { ArrowRight, ArrowUpRight, Check, Rocket } from 'lucide-react';
import { useExampleSelection } from '@/components/mdx/example-panel';
import { useLocalizedPath } from '@/utils/localized-path';
import styles from './starters.module.css';

const starters = [
  { framework: 'react', title: 'React' },
  { framework: 'solid', title: 'Solid' },
  { framework: 'vue', title: 'Vue' },
];

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

  return (
    <div className={`rp-not-doc ${styles.cards}`}>
      {starters.map(({ framework, title }) => (
        <article className={styles.card} key={framework}>
          <div className={styles.preview}>
            <img src={`/starters/${framework}.png`} alt="" width="1280" height="800" />
          </div>
          <div className={styles.cardBody}>
            <strong className={styles.title} data-framework={framework}>
              {title}
            </strong>
            <p className={styles.meta}>TypeScript · CSS Modules · Vite</p>
            <div className={styles.actions}>
              <a
                className={styles.button}
                href={`https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/${framework}-vite`}
                target="_blank"
                rel="noreferrer"
              >
                {t('starterOpen')}
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a
                className={styles.button}
                href={`https://github.com/Blinks44/moduix/tree/main/starters/${framework}-vite`}
                aria-label={`${title} · GitHub`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.github} aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export { StarterCards, StarterEntry };

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
  const { framework } = useExampleSelection();
  const extension = framework.value === 'vue' ? 'vue' : 'tsx';
  const entry = framework.value === 'vue' ? 'ts' : 'tsx';
  const tree = `index.html\npackage.json\nsrc/\n  main.${entry}        // reset, foundation, Calm\n  App.${extension}         // app state and pages\n  data.ts          // sample projects\n  portal.ts        // application portal root\n  styles.css       // layout and #app-root\n  components/\n    AppShell.${extension}\n    ProjectTable.${extension}\n    ProjectDialog.${extension}`;

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

export { StarterContents, StarterInstall };