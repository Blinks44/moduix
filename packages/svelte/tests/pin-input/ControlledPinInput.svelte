<script lang="ts">
  import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@/components/pin-input';

  let { changes }: { changes: string[] } = $props();
  let value: string[] = $state([]);

  export const getValue = () => value;
</script>

<PinInput
  bind:value
  count={4}
  type="alphanumeric"
  onValueChange={(details) => changes.push(details.valueAsString)}
>
  <PinInputLabel>Verification code</PinInputLabel>
  <PinInputControl><PinInputInputs /></PinInputControl>
</PinInput>
<output>{value.join('')}</output>