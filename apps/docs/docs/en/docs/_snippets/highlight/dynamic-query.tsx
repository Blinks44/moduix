import { Highlight, Input, Text } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';
import styles from '@/components/examples/highlight.module.css';

export default function HighlightDynamicQueryDemo() {
  const [query, setQuery] = useState('component');

  return (
    <PreviewLayout width="24rem">
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
    </PreviewLayout>
  );
}