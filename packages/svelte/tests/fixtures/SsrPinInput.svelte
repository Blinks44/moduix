<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputHiddenInput,
    PinInputInputs,
    PinInputLabel,
  } from '@/components/pin-input';
</script>

<PinInput count={4} name="code">
  <PinInputLabel>Verification code</PinInputLabel>
  <PinInputControl><PinInputInputs /></PinInputControl>
  <PinInputHiddenInput />
</PinInput>