<script lang="ts">
  import { Heading } from '@moduix/svelte/heading';
  import { Stack } from '@moduix/svelte/stack';
  import { Text } from '@moduix/svelte/text';
</script>

<Stack gap="3">
  {#snippet asChild(props)}
    <section {...props()}>
      <Heading as="h3" size="md">Rendered as section</Heading>
      <Text tone="muted">
        Use asChild when the layout wrapper should also carry document semantics.
      </Text>
    </section>
  {/snippet}
</Stack>