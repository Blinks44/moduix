import { CodeBlockRuntime } from '@rspress/core/theme';
import { toStyling, useExampleSelection } from './example-panel';
import styles from './usage.module.css';

// Usage section of a component page: `<Usage />` in MDX passes the page's Basic example sources,
// shown for the selected framework and styling.
function UsageCode({ sources }: { sources: Record<'react' | 'solid' | 'vue' | 'svelte', string> }) {
  const { framework, styling } = useExampleSelection();

  if (import.meta.env.SSG_MD) return `\n\`\`\`tsx\n${sources.react}\n\`\`\`\n`;

  return (
    <div className={styles.code}>
      <CodeBlockRuntime
        lang={framework.lang}
        code={toStyling(sources[framework.value], framework.value, styling.value)}
      />
    </div>
  );
}

export { UsageCode };