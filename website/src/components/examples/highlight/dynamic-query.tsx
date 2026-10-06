import { Highlight } from '@moduix/react/highlight';
import { Input } from '@moduix/react/input';
import { Text } from '@moduix/react/text';
import { useState } from 'react';
import styles from '@/components/examples/highlight/highlight-dynamic-query.module.css';

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
          text="Choose a component from the list. Open its documentation to see examples, props, and keyboard controls."
        />
      </Text>
    </div>
  );
}