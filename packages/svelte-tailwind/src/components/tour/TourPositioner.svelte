<script lang="ts">
  import { TourPositioner, type TourPositionerProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: TourPositionerProps = $props();
</script>

<OverlayPortal>
  <TourPositioner
    {...props}
    bind:ref
    class={cn(
      'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] max-h-(--available-height) max-w-(--available-width) outline-0 [--tour-z-index:var(--moduix-z-tour)] data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=dialog]:grid data-[type=dialog]:place-items-center-safe data-[type=dialog]:overflow-y-auto data-[type=dialog]:overscroll-contain data-[type=dialog]:p-4 data-[type=floating]:fixed data-[type=floating]:max-h-[calc(100dvh-2*var(--moduix-spacing-6))] data-[type=floating]:max-w-[calc(100vw-2*var(--moduix-spacing-6))] data-[type=floating]:data-[placement=bottom]:left-1/2 data-[type=floating]:data-[placement=bottom]:-translate-x-1/2 data-[type=floating]:data-[placement=bottom-end]:end-6 data-[type=floating]:data-[placement=bottom-start]:start-6 data-[type=floating]:data-[placement=center]:top-1/2 data-[type=floating]:data-[placement=center]:left-1/2 data-[type=floating]:data-[placement=center]:-translate-x-1/2 data-[type=floating]:data-[placement=center]:-translate-y-1/2 data-[type=floating]:data-[placement=left]:top-1/2 data-[type=floating]:data-[placement=left]:-translate-y-1/2 data-[type=floating]:data-[placement=left-end]:bottom-6 data-[type=floating]:data-[placement=left-start]:top-6 data-[type=floating]:data-[placement=right]:top-1/2 data-[type=floating]:data-[placement=right]:-translate-y-1/2 data-[type=floating]:data-[placement=right-end]:bottom-6 data-[type=floating]:data-[placement=right-start]:top-6 data-[type=floating]:data-[placement=top]:left-1/2 data-[type=floating]:data-[placement=top]:-translate-x-1/2 data-[type=floating]:data-[placement=top-end]:end-6 data-[type=floating]:data-[placement=top-start]:start-6 data-[type=floating]:data-[placement^=bottom]:bottom-6 data-[type=floating]:data-[placement^=left]:left-6 data-[type=floating]:data-[placement^=right]:right-6 data-[type=floating]:data-[placement^=top]:top-6',
      className,
    )}
    data-slot="tour-positioner"
  />
</OverlayPortal>