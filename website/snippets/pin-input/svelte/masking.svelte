<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputInputs,
    PinInputLabel,
  } from '@moduix/svelte/pin-input';
</script>

<PinInput count={4} mask>
  <PinInputLabel>PIN</PinInputLabel>
  <PinInputControl>
    <PinInputInputs />
  </PinInputControl>
</PinInput>