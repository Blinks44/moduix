import { Heading, Stack, Text } from '@moduix/react';

export default function StackDemo() {
  return (
    <Stack gap={12}>
      <Heading as="h3" size="md">
        Project updates
      </Heading>
      <Text tone="muted">
        Use Stack when the layout intent is just flex direction, spacing, and alignment.
      </Text>
      <Text tone="muted">Keep custom layout rules in local CSS.</Text>
    </Stack>
  );
}