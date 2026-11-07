<script lang="ts">
  import { ComboboxPositioner, type ComboboxPositionerProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: ComboboxPositionerProps = $props();
</script>

<OverlayPortal>
  <ComboboxPositioner
    {...props}
    bind:ref
    class={cn('z-(--z-index)', className)}
    data-slot="combobox-positioner"
  />
</OverlayPortal>