import { Highlight } from '@moduix/solid/highlight';
import { Input } from '@moduix/solid/input';
import { Text } from '@moduix/solid/text';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/highlight/highlight-dynamic-query.module.css';

export default function HighlightDynamicQueryDemo() {
  const [query, setQuery] = createSignal('component');

  return (
    <div class={styles.stack}>
      <Input
        aria-label="Search text"
        value={query()}
        onInput={(event) => setQuery(event.currentTarget.value)}
        placeholder="Search text..."
      />
      <Text>
        <Highlight
          query={query()}
          text="Choose a component from the list. Open its documentation to see examples, props, and keyboard controls."
        />
      </Text>
    </div>
  );
}