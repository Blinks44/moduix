<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputHiddenInput,
    PinInputInputs,
    PinInputLabel,
  } from '@moduix/svelte/pin-input';
</script>

<PinInput count={6}>
  <PinInputLabel>Verification code</PinInputLabel>
  <PinInputControl>
    <PinInputInputs />
  </PinInputControl>
  <PinInputHiddenInput />
</PinInput>