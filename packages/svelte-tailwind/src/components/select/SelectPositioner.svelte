<script lang="ts">
  import { SelectPositioner, type SelectPositionerProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: SelectPositionerProps = $props();
</script>

<OverlayPortal>
  <SelectPositioner
    {...props}
    bind:ref
    class={cn('z-(--z-index)', className)}
    data-slot="select-positioner"
  />
</OverlayPortal>