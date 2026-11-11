<script module lang="ts">
  import type { SplitterResizeTriggerProps } from '@ark-ui/svelte/splitter';

  export interface SidebarResizeTriggerProps extends Omit<SplitterResizeTriggerProps, 'id'> {}
</script>

<script lang="ts">
  import { SplitterResizeTrigger } from '@ark-ui/svelte/splitter';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import SplitterResizeTriggerIndicator from '../splitter/SplitterResizeTriggerIndicator.svelte';
  import { useSidebarConfig } from './context';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: SidebarResizeTriggerProps = $props();

  const { panelId, side } = useSidebarConfig();
  const resizeTriggerId = $derived<`${string}:${string}`>(
    side() === 'left' ? `${panelId()}:content` : `content:${panelId()}`,
  );

  const resizeTriggerClass = [
    "group/trigger relative z-2 flex w-px min-w-px cursor-col-resize appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 transition-opacity duration-normal ease-in-out before:absolute before:h-full before:w-[0.5px] before:rounded-full before:bg-sidebar-border before:transition-[background-color] before:duration-normal before:ease-in-out before:content-[''] after:absolute after:z-1 after:h-full after:w-3 after:content-['']",
    'data-disabled:cursor-default data-disabled:opacity-disabled data-dragging:before:bg-muted-foreground/40 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-focus [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-offset-1 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-ring [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40',
  ];
</script>

<SplitterResizeTrigger
  type={asChild ? undefined : 'button'}
  {...props}
  bind:ref
  {asChild}
  id={resizeTriggerId}
  aria-label={typeof ariaLabel === 'string' ? ariaLabel : a11yLabels.resizeSidebar}
  class={cn(resizeTriggerClass, className)}
  data-side={side()}
  data-slot="sidebar-resize-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <SplitterResizeTriggerIndicator />
  {/if}
</SplitterResizeTrigger>