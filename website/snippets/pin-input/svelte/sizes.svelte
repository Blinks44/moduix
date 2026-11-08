<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputInputs,
    PinInputLabel,
  } from '@moduix/svelte/pin-input';
  import { Stack } from '@moduix/svelte/stack';

  const sizes = [
    ['xs', 'Extra small'],
    ['sm', 'Small'],
    ['md', 'Medium'],
    ['lg', 'Large'],
    ['xl', 'Extra large'],
  ] as const;
</script>

<Stack gap="3">
  {#each sizes as [size, label] (size)}
    <PinInput count={4} {size}>
      <PinInputLabel>{label}</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  {/each}
</Stack>