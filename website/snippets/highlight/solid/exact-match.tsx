import { Highlight } from '@moduix/solid/highlight';
import { Stack } from '@moduix/solid/stack';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/highlight/highlight-exact-match.module.css';

export default function HighlightExactMatchDemo() {
  return (
    <Stack gap="4">
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
    </Stack>
  );
}