<script lang="ts">
  import { HoverCardPositioner, type HoverCardPositionerProps } from '@ark-ui/svelte/hover-card';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './HoverCard.module.css';

  let { class: className, ref = $bindable(null), ...props }: HoverCardPositionerProps = $props();
</script>

<OverlayPortal>
  <HoverCardPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="hover-card-positioner"
  />
</OverlayPortal>