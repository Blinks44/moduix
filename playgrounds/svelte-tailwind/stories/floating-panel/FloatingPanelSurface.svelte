<script lang="ts">
  const titleTextClass = 'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap';

  import type { Snippet } from 'svelte';
  import {
    FloatingPanelBody,
    FloatingPanelCloseIcon,
    FloatingPanelContent,
    FloatingPanelControl,
    FloatingPanelDragIndicator,
    FloatingPanelDragTrigger,
    FloatingPanelFooter,
    FloatingPanelHeader,
    FloatingPanelPositioner,
    FloatingPanelResizeTriggerGroup,
    FloatingPanelStageTrigger,
    FloatingPanelTitle,
  } from '@/components/floating-panel';

  let {
    autofocus = false,
    children,
    footer,
    surfaceClass,
    title,
  }: {
    autofocus?: boolean;
    children?: Snippet;
    footer?: string;
    surfaceClass?: string;
    title: string;
  } = $props();
</script>

<FloatingPanelPositioner>
  <FloatingPanelContent {autofocus} class={surfaceClass}>
    <FloatingPanelDragTrigger>
      <FloatingPanelHeader class={surfaceClass ? 'border-b-primary/80 bg-primary/90' : undefined}>
        <FloatingPanelTitle class={surfaceClass ? 'text-primary-foreground' : undefined}>
          <FloatingPanelDragIndicator
            class={surfaceClass ? 'text-primary-foreground' : undefined}
          /><span class={titleTextClass}>{title}</span>
        </FloatingPanelTitle>
        <FloatingPanelControl>
          <FloatingPanelStageTrigger
            class={surfaceClass
              ? 'border-primary/70 bg-primary/80 text-primary-foreground'
              : undefined}
            stage="minimized"
          />
          <FloatingPanelStageTrigger
            class={surfaceClass
              ? 'border-primary/70 bg-primary/80 text-primary-foreground'
              : undefined}
            stage="maximized"
          />
          <FloatingPanelStageTrigger
            class={surfaceClass
              ? 'border-primary/70 bg-primary/80 text-primary-foreground'
              : undefined}
            stage="default"
          />
          <FloatingPanelCloseIcon
            class={surfaceClass
              ? 'border-primary/70 bg-primary/80 text-primary-foreground'
              : undefined}
          />
        </FloatingPanelControl>
      </FloatingPanelHeader>
    </FloatingPanelDragTrigger>
    <FloatingPanelBody>{@render children?.()}</FloatingPanelBody>
    {#if footer}<FloatingPanelFooter
        class={surfaceClass ? 'border-t-primary/80 text-primary-foreground' : undefined}
        >{footer}</FloatingPanelFooter
      >{/if}
    <FloatingPanelResizeTriggerGroup />
  </FloatingPanelContent>
</FloatingPanelPositioner>