import { CodeBlockRuntime } from '@rspress/core/theme';
import type { ReactNode } from 'react';
import { useExampleSelection } from './example-panel';
import styles from './usage.module.css';

// Usage section of a component page: one short snippet for the selected framework, followed by
// the props a reader reaches for first. Solid falls back to the React snippet when they match.
function UsageCode({ react, solid = react, vue }: { react: string; solid?: string; vue: string }) {
  const { framework } = useExampleSelection();

  if (import.meta.env.SSG_MD) return `\n\`\`\`tsx\n${react}\n\`\`\`\n`;

  return (
    <div className={styles.code}>
      {framework.value === 'vue' ? (
        <CodeBlockRuntime lang="vue" code={vue} />
      ) : (
        <CodeBlockRuntime lang="tsx" code={framework.value === 'solid' ? solid : react} />
      )}
    </div>
  );
}

function PropChips({ items }: { items: [name: string, description: ReactNode][] }) {
  if (import.meta.env.SSG_MD) {
    return items.map(([name, description]) => `\n- \`${name}\`: ${description}`).join('') + '\n';
  }

  return (
    <dl className={`rp-not-doc ${styles.props}`}>
      {items.map(([name, description]) => (
        <div key={name}>
          <dt>
            <code>{name}</code>
          </dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  );
}

export { PropChips, UsageCode };