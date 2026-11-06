<script lang="ts">
  import { TourBackdrop, type TourBackdropProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Tour.module.css';

  let { class: className, ref = $bindable(null), ...props }: TourBackdropProps = $props();
</script>

<OverlayPortal>
  <TourBackdrop
    {...props}
    bind:ref
    class={clsx(styles.backdrop, className)}
    data-slot="tour-backdrop"
  />
</OverlayPortal>