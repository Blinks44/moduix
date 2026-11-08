<script module lang="ts">
  import type { PropsFn } from '@ark-ui/svelte';
  import type { TooltipRootProps as ArkTooltipRootProps } from '@ark-ui/svelte/tooltip';
  import type { Snippet } from 'svelte';
  import type { TooltipRootProps } from '../tooltip/Tooltip.svelte';

  export interface SidebarTooltipProps extends Omit<
    TooltipRootProps,
    'children' | 'disabled' | 'positioning'
  > {
    children?: Snippet<[PropsFn<'button'>]>;
    closeDelay?: ArkTooltipRootProps['closeDelay'];
    content?: string | number | Snippet;
    openDelay?: ArkTooltipRootProps['openDelay'];
    positioning?: ArkTooltipRootProps['positioning'];
  }
</script>

<script lang="ts">
  import Tooltip from '../tooltip/Tooltip.svelte';
  import TooltipContent from '../tooltip/TooltipContent.svelte';
  import TooltipPositioner from '../tooltip/TooltipPositioner.svelte';
  import TooltipTrigger from '../tooltip/TooltipTrigger.svelte';
  import { useSidebar } from './context';

  let {
    children,
    closeDelay = 0,
    content,
    open = $bindable(),
    openDelay = 200,
    positioning: positioningProp,
    triggerValue = $bindable(),
    ...props
  }: SidebarTooltipProps = $props();

  const sidebar = useSidebar();

  const positioning = $derived<ArkTooltipRootProps['positioning']>({
    placement: sidebar.side === 'left' ? 'right' : 'left',
    gutter: 8,
    ...positioningProp,
  });
</script>

<Tooltip
  {...props}
  bind:open
  bind:triggerValue
  {closeDelay}
  {openDelay}
  disabled={!sidebar.collapsed}
  {positioning}
>
  <TooltipTrigger>
    {#snippet asChild(triggerProps)}
      {@render children?.(triggerProps)}
    {/snippet}
  </TooltipTrigger>
  <TooltipPositioner>
    <TooltipContent>
      {#if typeof content === 'function'}
        {@render content()}
      {:else}
        {content}
      {/if}
    </TooltipContent>
  </TooltipPositioner>
</Tooltip>