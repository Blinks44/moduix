<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputInputs,
    PinInputLabel,
  } from '@moduix/svelte/pin-input';
  import { Stack } from '@moduix/svelte/stack';

  let value = $state<string[]>([]);
</script>

<Stack align="center" gap="4">
  <PinInput count={6} type="alphanumeric" bind:value>
    <PinInputLabel>Invite code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
  </PinInput>
  <div data-preview-meta>
    <output>Current value: {value.join('') || 'empty'}</output>
  </div>
</Stack>