<script lang="ts">
  import { Heading } from '@moduix/svelte/heading';
  import { Stack } from '@moduix/svelte/stack';

  const headingSizes = [
    { size: '2xl', label: 'Extra-large heading' },
    { size: 'xl', label: 'Large heading' },
    { size: 'lg', label: 'Medium-large heading' },
    { size: 'md', label: 'Medium heading' },
    { size: 'sm', label: 'Small heading' },
    { size: 'xs', label: 'Extra-small heading' },
  ] as const;
</script>

<Stack gap={3}>
  {#each headingSizes as item (item.size)}
    <Heading as="h2" size={item.size}>
      {item.label}
    </Heading>
  {/each}
</Stack>