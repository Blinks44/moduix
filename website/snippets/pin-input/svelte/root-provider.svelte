<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    PinInputControl,
    PinInputInput,
    PinInputLabel,
    PinInputRootProvider,
    usePinInput,
  } from '@moduix/svelte/pin-input';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();
  const pinInput = usePinInput({ id, count: 6 });
  const indexes = [0, 1, 2, 3, 4, 5];
</script>

<Stack align="center" gap="4">
  <PinInputRootProvider value={pinInput}>
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      {#each indexes as index (index)}
        <PinInputInput {index} />
      {/each}
    </PinInputControl>
  </PinInputRootProvider>

  <div>
    <Button type="button" size="sm" variant="outline" onclick={() => pinInput().focus()}>
      Focus
    </Button>
    <Button type="button" size="sm" variant="outline" onclick={() => pinInput().clearValue()}>
      Clear
    </Button>
  </div>
</Stack>