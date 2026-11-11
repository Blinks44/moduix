<script lang="ts">
  import { TourSpotlight, type TourSpotlightProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Tour.module.css';

  let { class: className, ref = $bindable(null), ...props }: TourSpotlightProps = $props();
</script>

<OverlayPortal>
  <TourSpotlight
    {...props}
    bind:ref
    class={clsx(styles.spotlight, className)}
    data-slot="tour-spotlight"
  />
</OverlayPortal>