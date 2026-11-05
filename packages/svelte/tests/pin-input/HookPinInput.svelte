<script lang="ts">
  import {
    PinInputControl,
    PinInputInputs,
    PinInputLabel,
    PinInputRootProvider,
    usePinInput,
    type UsePinInputProps,
  } from '@/components/pin-input';

  let props: UsePinInputProps = $props();
  const pinInput = usePinInput(() => ({ count: 4, ...props }));
</script>

<PinInputRootProvider value={pinInput}>
  <PinInputLabel>Verification code</PinInputLabel>
  <PinInputControl><PinInputInputs /></PinInputControl>
</PinInputRootProvider>