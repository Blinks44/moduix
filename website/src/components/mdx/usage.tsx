import { CodeBlockRuntime } from '@rspress/core/theme';
import { toDisplayCode, toStyling, useExampleSelection } from './example-panel';
import styles from './usage.module.css';

// Usage section of a component page: `<Usage />` in MDX passes the page's Basic example sources,
// shown for the selected framework and styling.
function UsageCode({
  sources,
  tailwindSources,
}: {
  sources: Record<'react' | 'solid' | 'vue' | 'svelte', string>;
  tailwindSources?: Record<'react' | 'solid' | 'vue' | 'svelte', string>;
}) {
  const { framework, styling } = useExampleSelection();

  if (import.meta.env.SSG_MD) return null;

  const code =
    styling.value === 'tailwind' && tailwindSources
      ? toDisplayCode(tailwindSources[framework.value])
      : toStyling(sources[framework.value], framework.value, styling.value);

  return (
    <div className={styles.code}>
      <CodeBlockRuntime lang={framework.lang} code={code} />
    </div>
  );
}

export { UsageCode };