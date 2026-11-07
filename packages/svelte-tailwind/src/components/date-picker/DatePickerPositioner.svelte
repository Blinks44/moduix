<script lang="ts">
  import { DatePickerPositioner, type DatePickerPositionerProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: DatePickerPositionerProps = $props();
</script>

<OverlayPortal>
  <DatePickerPositioner
    {...props}
    bind:ref
    class={cn('z-(--z-index)', className)}
    data-slot="date-picker-positioner"
  />
</OverlayPortal>