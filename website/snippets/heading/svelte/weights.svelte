<script lang="ts">
  import { Heading } from '@moduix/svelte/heading';
  import { Stack } from '@moduix/svelte/stack';

  const headingWeights = [
    { weight: 'regular', label: 'Regular weight' },
    { weight: 'medium', label: 'Medium weight' },
    { weight: 'semibold', label: 'Semibold weight' },
    { weight: 'bold', label: 'Bold weight' },
  ] as const;
</script>

<Stack gap={3}>
  {#each headingWeights as item (item.weight)}
    <Heading as="h2" weight={item.weight}>
      {item.label}
    </Heading>
  {/each}
</Stack>