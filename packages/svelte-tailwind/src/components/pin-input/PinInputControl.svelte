<script lang="ts">
  import { PinInputControl, type PinInputControlProps } from '@ark-ui/svelte/pin-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PinInputControlProps = $props();
</script>

<PinInputControl
  {...props}
  bind:ref
  class={cn('inline-flex items-center gap-2', className)}
  data-slot="pin-input-control"
/>