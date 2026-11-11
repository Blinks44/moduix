<script lang="ts">
  import { SplitterResizeTrigger, type SplitterResizeTriggerProps } from '@ark-ui/svelte/splitter';
  import { cn } from '@/lib/moduix/cn';
  import SplitterResizeTriggerIndicator from './SplitterResizeTriggerIndicator.svelte';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: SplitterResizeTriggerProps = $props();

  const triggerClass =
    "group/trigger relative z-1 flex w-px appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 before:absolute before:h-full before:w-[0.5px] before:bg-border before:transition-[background-color] before:duration-normal before:ease-in-out before:content-[''] after:absolute after:h-full after:w-2.5 after:content-[''] hover:before:bg-muted-foreground/40 data-disabled:opacity-disabled data-dragging:before:bg-muted-foreground/40 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:before:h-[0.5px] data-[orientation=vertical]:before:w-full data-[orientation=vertical]:after:h-2.5 data-[orientation=vertical]:after:w-full [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-focus [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-offset-1 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-ring";
</script>

<SplitterResizeTrigger
  type={asChild ? undefined : 'button'}
  {...props}
  bind:ref
  {asChild}
  class={cn(triggerClass, className)}
  data-slot="splitter-resize-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <SplitterResizeTriggerIndicator />
  {/if}
</SplitterResizeTrigger>