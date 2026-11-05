<script lang="ts">
  import {
    NumberInput,
    NumberInputField,
    NumberInputLabel,
    NumberInputScrubber,
    NumberInputValueText,
  } from '@/components/number-input';

  let rootRef: Element | null = $state(null);
  let scrubberRef: Element | null = $state(null);
  let fieldRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, scrubberRef, fieldRef });
</script>

<NumberInput bind:ref={rootRef} defaultValue="2" data-probe="root">
  <NumberInputLabel>Amount</NumberInputLabel>
  <NumberInputScrubber bind:ref={scrubberRef}>Adjust value</NumberInputScrubber>
  <NumberInputField bind:ref={fieldRef} />
  <NumberInputValueText />
</NumberInput>