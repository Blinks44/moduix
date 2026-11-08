<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputInputs,
    PinInputLabel,
  } from '@moduix/svelte/pin-input';
</script>

<PinInput count={6} placeholder="*">
  <PinInputLabel>Verification code</PinInputLabel>
  <PinInputControl>
    <PinInputInputs />
  </PinInputControl>
</PinInput>