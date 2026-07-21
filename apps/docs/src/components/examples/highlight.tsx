import { Highlight, Input, Text } from '@moduix/react';
import { useState } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import styles from './highlight.module.css';

export const highlightCssProperties: CssPropertyInput[] = [
  [
    '--highlight-bg',
    'color-mix(in oklab, var(--color-warning) 40%, var(--color-accent))',
    'Controls the highlight background color for each matched mark.',
  ],
  [
    '--highlight-color',
    'var(--color-foreground)',
    'Controls the text color inside each matched mark.',
  ],
  [
    '--highlight-font-weight',
    'var(--weight-medium)',
    'Controls the font weight of each matched mark.',
  ],
  [
    '--highlight-padding-x',
    'var(--spacing-1)',
    'Controls the inline padding of each matched mark.',
  ],
  ['--highlight-padding-y', '0.0625rem', 'Controls the block padding of each matched mark.'],
  ['--highlight-radius', 'var(--radius-xs)', 'Controls the corner radius of each matched mark.'],
  ['--highlight-shadow', 'none', 'Controls the box shadow of each matched mark.'],
];

export function HighlightExample() {
  return (
    <Text>
      <Highlight
        query="component"
        text="Ark UI is a headless component library for building accessible web applications."
      />
    </Text>
  );
}

export function HighlightDynamicQueryExample() {
  const [query, setQuery] = useState('component');

  return (
    <div className={styles.stack}>
      <Input
        aria-label="Search text"
        className={styles.field}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Search text..."
      />
      <Text>
        <Highlight
          query={query}
          text="With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue."
        />
      </Text>
    </div>
  );
}

export function HighlightMultipleQueriesExample() {
  return (
    <Text>
      <Highlight
        query={['React', 'Vue']}
        text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
      />
    </Text>
  );
}

export function HighlightIgnoreCaseExample() {
  return (
    <Text>
      <Highlight
        ignoreCase
        query="typescript"
        text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
      />
    </Text>
  );
}

export function HighlightMatchAllExample() {
  return (
    <div className={styles.comparison}>
      <div>
        <div className={styles.label}>Match all</div>
        <Text>
          <Highlight
            matchAll
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
      <div>
        <div className={styles.label}>First match only</div>
        <Text>
          <Highlight
            matchAll={false}
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
    </div>
  );
}

export function HighlightExactMatchExample() {
  return (
    <div className={styles.comparison}>
      <div>
        <div className={styles.label}>Partial match</div>
        <Text>
          <Highlight
            matchAll
            query="box"
            text="The checkbox component renders a box element. Use combobox for autocomplete."
          />
        </Text>
      </div>
      <div>
        <div className={styles.label}>Exact match</div>
        <Text>
          <Highlight
            exactMatch
            matchAll
            query="box"
            text="The checkbox component renders a box element. Use combobox for autocomplete."
          />
        </Text>
      </div>
    </div>
  );
}