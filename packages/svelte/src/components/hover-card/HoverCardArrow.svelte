<script lang="ts">
  import { HoverCardArrow, type HoverCardArrowProps } from '@ark-ui/svelte/hover-card';
  import { clsx } from 'clsx';
  import styles from './HoverCard.module.css';
  import HoverCardArrowTip from './HoverCardArrowTip.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: HoverCardArrowProps = $props();
</script>

<HoverCardArrow
  {...props}
  bind:ref
  class={clsx(styles.arrow, className)}
  data-slot="hover-card-arrow"
>
  {#if children}
    {@render children()}
  {:else}
    <HoverCardArrowTip />
  {/if}
</HoverCardArrow>