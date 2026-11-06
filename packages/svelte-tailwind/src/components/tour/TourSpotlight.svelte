<script lang="ts">
  import { TourSpotlight, type TourSpotlightProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: TourSpotlightProps = $props();
</script>

<OverlayPortal>
  <TourSpotlight
    {...props}
    bind:ref
    class={cn('z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] ring-2 ring-ring', className)}
    data-slot="tour-spotlight"
  />
</OverlayPortal>