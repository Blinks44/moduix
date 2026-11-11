<script lang="ts">
  import { CollapsibleIndicator, type CollapsibleIndicatorProps } from '@ark-ui/svelte/collapsible';
  import { clsx } from 'clsx';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import styles from './Collapsible.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: CollapsibleIndicatorProps = $props();
</script>

<CollapsibleIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="collapsible-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronDownIcon />
  {/if}
</CollapsibleIndicator>