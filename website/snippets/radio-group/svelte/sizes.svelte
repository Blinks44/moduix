<script lang="ts">
  import { RadioGroup, RadioGroupOption } from '@moduix/svelte/radio-group';
  import { Stack } from '@moduix/svelte/stack';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<Stack direction="row" align="center" wrap="wrap" gap="4">
  {#each sizes as size (size)}
    <RadioGroup {size} defaultValue={size} aria-label={`Size ${size}`}>
      <RadioGroupOption value={size}>{size.toUpperCase()}</RadioGroupOption>
    </RadioGroup>
  {/each}
</Stack>