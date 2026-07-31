import { Heading } from '@moduix/react/heading';
import { Stack } from '@moduix/react/stack';
import { Text } from '@moduix/react/text';

export default function StackSemanticDemo() {
  return (
    <Stack asChild gap={12}>
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