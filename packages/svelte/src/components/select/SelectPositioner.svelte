<script lang="ts">
  import { SelectPositioner, type SelectPositionerProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectPositionerProps = $props();
</script>

<OverlayPortal>
  <SelectPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="select-positioner"
  />
</OverlayPortal>