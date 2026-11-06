<script lang="ts">
  import { TourPositioner, type TourPositionerProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Tour.module.css';

  let { class: className, ref = $bindable(null), ...props }: TourPositionerProps = $props();
</script>

<OverlayPortal>
  <TourPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="tour-positioner"
  />
</OverlayPortal>