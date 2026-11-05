<script module lang="ts">
  import type { PinInputInputProps } from '@ark-ui/svelte/pin-input';

  export interface PinInputInputsProps {
    class?: PinInputInputProps['class'];
  }
</script>

<script lang="ts">
  import { usePinInputContext } from '@ark-ui/svelte/pin-input';
  import PinInputInput from './PinInputInput.svelte';

  let { class: className }: PinInputInputsProps = $props();
  const pinInput = usePinInputContext();
</script>

{#each pinInput().items as index (index)}
  <PinInputInput class={className} {index} />
{/each}