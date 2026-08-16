import { Highlight } from '@moduix/react/highlight';
import { Input } from '@moduix/react/input';
import { Text } from '@moduix/react/text';
import { useState } from 'react';
import styles from '@/components/examples/highlight.module.css';

export default function HighlightDynamicQueryDemo() {
  const [query, setQuery] = useState('component');

  return (
    <div className={styles.stack}>
      <Input
        aria-label="Search text"
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