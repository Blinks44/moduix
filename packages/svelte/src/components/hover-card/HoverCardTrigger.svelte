<script lang="ts">
  import { HoverCardTrigger, type HoverCardTriggerProps } from '@ark-ui/svelte/hover-card';
  import { clsx } from 'clsx';
  import styles from './HoverCard.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: HoverCardTriggerProps = $props();
</script>

<HoverCardTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="hover-card-trigger"
/>