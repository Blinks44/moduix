<script lang="ts">
  import { DatePickerPositioner, type DatePickerPositionerProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './DatePicker.module.css';

  let { class: className, ref = $bindable(null), ...props }: DatePickerPositionerProps = $props();
</script>

<OverlayPortal>
  <DatePickerPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="date-picker-positioner"
  />
</OverlayPortal>