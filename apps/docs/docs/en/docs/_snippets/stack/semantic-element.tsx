import { Heading, Stack, Text } from '@moduix/react';
import styles from '@/components/examples/stack.module.css';

export default function StackSemanticDemo() {
  return (
    <Stack asChild gap={12} className={styles.panel}>
      <section>
        <Heading as="h3" size="md">
          Rendered as section
        </Heading>
        <Text tone="muted">
          Use asChild when the layout wrapper should also carry document semantics.
        </Text>
      </section>
    </Stack>
  );
}