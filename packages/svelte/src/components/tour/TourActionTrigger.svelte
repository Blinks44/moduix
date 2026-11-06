<script lang="ts">
  import { TourActionTrigger, type TourActionTriggerProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import styles from './Tour.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: TourActionTriggerProps = $props();
</script>

<TourActionTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.actionTrigger, className)}
  data-slot="tour-action-trigger"
/>