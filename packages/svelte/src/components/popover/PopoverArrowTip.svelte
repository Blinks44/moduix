<script lang="ts">
  import { PopoverArrowTip, type PopoverArrowTipProps } from '@ark-ui/svelte/popover';
  import { clsx } from 'clsx';
  import styles from './Popover.module.css';

  let { class: className, ref = $bindable(null), ...props }: PopoverArrowTipProps = $props();
</script>

<PopoverArrowTip
  {...props}
  bind:ref
  class={clsx(styles.arrowTip, className)}
  data-slot="popover-arrow-tip"
/>