<script lang="ts">
  import { Highlight } from '@moduix/svelte/highlight';
  import { Input } from '@moduix/svelte/input';
  import { Stack } from '@moduix/svelte/stack';
  import { Text } from '@moduix/svelte/text';

  let query = $state('component');
</script>

<Stack gap="4">
  <Input bind:value={query} aria-label="Search text" placeholder="Search text..." />
  <Text>
    <Highlight
      {query}
      text="Choose a component from the list. Open its documentation to see examples, props, and keyboard controls."
    />
  </Text>
</Stack>