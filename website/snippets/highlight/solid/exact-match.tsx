import { Highlight } from '@moduix/solid/highlight';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/highlight/highlight-exact-match.module.css';

export default function HighlightExactMatchDemo() {
  return (
    <div class={styles.comparison}>
      <div>
        <div class={styles.label}>Partial match</div>
        <Text>
          <Highlight
            matchAll
            query="box"
            text="The checkbox component renders a box element. Use combobox for autocomplete."
          />
        </Text>
      </div>
      <div>
        <div class={styles.label}>Exact match</div>
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