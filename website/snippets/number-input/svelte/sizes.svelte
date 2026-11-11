<script lang="ts">
  import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/svelte/number-input';
  import { Stack } from '@moduix/svelte/stack';

  const sizes = [
    ['xs', 'Extra small'],
    ['sm', 'Small'],
    ['md', 'Medium'],
    ['lg', 'Large'],
    ['xl', 'Extra large'],
  ] as const;
</script>

<Stack align="flex-start" gap="3">
  {#each sizes as [size, label] (size)}
    <NumberInput {size} defaultValue="8">
      <NumberInputLabel>{label}</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  {/each}
</Stack>