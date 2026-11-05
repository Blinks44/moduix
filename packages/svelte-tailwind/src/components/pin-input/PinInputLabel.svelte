<script lang="ts">
  import { PinInputLabel, type PinInputLabelProps } from '@ark-ui/svelte/pin-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PinInputLabelProps = $props();
</script>

<PinInputLabel
  {...props}
  bind:ref
  class={cn('text-sm font-medium', className)}
  data-slot="pin-input-label"
/>