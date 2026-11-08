<script lang="ts">
  import { CollapsibleTrigger, type CollapsibleTriggerProps } from '@ark-ui/svelte/collapsible';
  import { clsx } from 'clsx';
  import styles from './Collapsible.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: CollapsibleTriggerProps = $props();
</script>

<CollapsibleTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="collapsible-trigger"
/>