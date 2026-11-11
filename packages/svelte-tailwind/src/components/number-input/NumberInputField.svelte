<script lang="ts">
  import type { NumberInputControlProps } from '@ark-ui/svelte/number-input';
  import NumberInputControl from './NumberInputControl.svelte';
  import NumberInputDecrementTrigger from './NumberInputDecrementTrigger.svelte';
  import NumberInputIncrementTrigger from './NumberInputIncrementTrigger.svelte';
  import NumberInputInput from './NumberInputInput.svelte';

  let { ref = $bindable(null), ...props }: Omit<NumberInputControlProps, 'asChild' | 'children'> =
    $props();
</script>

<NumberInputControl {...props} bind:ref>
  <NumberInputDecrementTrigger />
  <NumberInputInput />
  <NumberInputIncrementTrigger />
</NumberInputControl>