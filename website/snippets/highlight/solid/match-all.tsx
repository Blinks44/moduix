import { Highlight } from '@moduix/solid/highlight';
import { Stack } from '@moduix/solid/stack';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/highlight/highlight-match-all.module.css';

export default function HighlightMatchAllDemo() {
  return (
    <Stack gap="4">
      <div>
        <div class={styles.label}>Match all</div>
        <Text>
          <Highlight
            matchAll
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
      <div>
        <div class={styles.label}>First match only</div>
        <Text>
          <Highlight
            matchAll={false}
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
    </Stack>
  );
}