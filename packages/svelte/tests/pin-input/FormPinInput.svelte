<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputHiddenInput,
    PinInputInputs,
    PinInputLabel,
    type PinInputRootProps,
  } from '@/components/pin-input';

  let { onsubmit, ...props }: PinInputRootProps & { onsubmit?: (event: SubmitEvent) => void } =
    $props();
</script>

<form {onsubmit}>
  <PinInput count={4} name="code" {...props}>
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</form>