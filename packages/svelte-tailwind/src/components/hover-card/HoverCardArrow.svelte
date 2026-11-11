<script lang="ts">
  import { HoverCardArrow, type HoverCardArrowProps } from '@ark-ui/svelte/hover-card';
  import { cn } from '@/lib/moduix/cn';
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
  class={cn(
    '[--arrow-background:var(--color-popover)] [--arrow-shadow-color:var(--color-border)] [--arrow-size:0.625rem]',
    className,
  )}
  data-slot="hover-card-arrow"
>
  {#if children}
    {@render children()}
  {:else}
    <HoverCardArrowTip />
  {/if}
</HoverCardArrow>