<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputHiddenInput,
    PinInputInputs,
    PinInputLabel,
  } from '@moduix/svelte/pin-input';
</script>

<PinInput count={6} otp name="verificationCode">
  <PinInputLabel>One-time code</PinInputLabel>
  <PinInputControl>
    <PinInputInputs />
  </PinInputControl>
  <PinInputHiddenInput />
</PinInput>