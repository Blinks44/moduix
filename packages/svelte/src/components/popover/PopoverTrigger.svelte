<script lang="ts">
  import { PopoverTrigger, type PopoverTriggerProps } from '@ark-ui/svelte/popover';
  import { clsx } from 'clsx';
  import styles from './Popover.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: PopoverTriggerProps = $props();
</script>

<PopoverTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="popover-trigger"
/>