<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputInput,
    PinInputLabel,
    PinInputSeparator,
  } from '@/components/pin-input';
</script>

<PinInput count={4} class="consumer-root">
  <PinInputLabel class="consumer-label">Verification code</PinInputLabel>
  <PinInputControl class="consumer-control">
    <PinInputInput class="consumer-input" index={0} />
    <PinInputSeparator class="consumer-separator" />
  </PinInputControl>
</PinInput>