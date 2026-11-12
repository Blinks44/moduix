<script lang="ts">
  import { Heading } from '@moduix/svelte/heading';
  import { Stack } from '@moduix/svelte/stack';
  import { Text } from '@moduix/svelte/text';
</script>

<Stack gap="3">
  <Heading as="h3" size="md">Project updates</Heading>
  <Text tone="muted">
    Use Stack when the layout intent is just flex direction, spacing, and alignment.
  </Text>
  <Text tone="muted">Keep custom layout rules in local CSS.</Text>
</Stack>