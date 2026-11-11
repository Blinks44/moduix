<script lang="ts">
  import { PopoverCloseTrigger, type PopoverCloseTriggerProps } from '@ark-ui/svelte/popover';
  import { clsx } from 'clsx';
  import styles from './Popover.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: PopoverCloseTriggerProps = $props();
</script>

<PopoverCloseTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.closeTrigger, className)}
  data-slot="popover-close-trigger"
/>