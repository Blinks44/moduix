<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputInput,
    PinInputLabel,
    PinInputSeparator,
  } from '@moduix/svelte/pin-input';

  const firstIndexes = [0, 1, 2];
  const lastIndexes = [3, 4, 5];
</script>

<PinInput count={6}>
  <PinInputLabel>Auth code</PinInputLabel>
  <PinInputControl>
    {#each firstIndexes as index (index)}
      <PinInputInput {index} />
    {/each}
    <PinInputSeparator />
    {#each lastIndexes as index (index)}
      <PinInputInput {index} />
    {/each}
  </PinInputControl>
</PinInput>