import { Heading } from '@moduix/solid/heading';
import { Stack } from '@moduix/solid/stack';
import { Text } from '@moduix/solid/text';

export default function StackSemanticDemo() {
  return (
    <Stack asChild={(props) => <section {...props()} />} gap={12}>
      <Heading as="h3" size="md">
        Rendered as section
      </Heading>
      <Text tone="muted">
        Use asChild when the layout wrapper should also carry document semantics.
      </Text>
    </Stack>
  );
}