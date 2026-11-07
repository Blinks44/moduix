<script lang="ts">
  import { ComboboxPositioner, type ComboboxPositionerProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Combobox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ComboboxPositionerProps = $props();
</script>

<OverlayPortal>
  <ComboboxPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="combobox-positioner"
  />
</OverlayPortal>