<script lang="ts">
  import { TourBackdrop, type TourBackdropProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: TourBackdropProps = $props();
</script>

<OverlayPortal>
  <TourBackdrop
    {...props}
    bind:ref
    class={cn(
      'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:animate-none',
      className,
    )}
    data-slot="tour-backdrop"
  />
</OverlayPortal>