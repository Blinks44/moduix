<script lang="ts">
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
  import storyStyles from './FloatingPanel.stories.module.css';

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
      <FloatingPanelHeader>
        <FloatingPanelTitle>
          <FloatingPanelDragIndicator /><span class={storyStyles.titleText}>{title}</span>
        </FloatingPanelTitle>
        <FloatingPanelControl>
          <FloatingPanelStageTrigger stage="minimized" />
          <FloatingPanelStageTrigger stage="maximized" />
          <FloatingPanelStageTrigger stage="default" />
          <FloatingPanelCloseIcon />
        </FloatingPanelControl>
      </FloatingPanelHeader>
    </FloatingPanelDragTrigger>
    <FloatingPanelBody>{@render children?.()}</FloatingPanelBody>
    {#if footer}<FloatingPanelFooter>{footer}</FloatingPanelFooter>{/if}
    <FloatingPanelResizeTriggerGroup />
  </FloatingPanelContent>
</FloatingPanelPositioner>