<script lang="ts">
  import {
    FloatingPanel,
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
    FloatingPanelTrigger,
  } from '@/components/floating-panel';

  const refs: Record<string, Element | null> = $state({
    trigger: null,
    positioner: null,
    content: null,
    header: null,
    title: null,
    footer: null,
    indicator: null,
    close: null,
  });

  export const getRefs = () => refs;
</script>

<FloatingPanel defaultOpen portalled={false}>
  <FloatingPanelTrigger bind:ref={refs.trigger} class="consumer-trigger">Open</FloatingPanelTrigger>
  <FloatingPanelPositioner bind:ref={refs.positioner}>
    <FloatingPanelContent bind:ref={refs.content} class="consumer-content">
      <FloatingPanelDragTrigger>
        <FloatingPanelHeader bind:ref={refs.header}>
          <FloatingPanelTitle bind:ref={refs.title}>
            <FloatingPanelDragIndicator />
          </FloatingPanelTitle>
          <FloatingPanelControl>
            <FloatingPanelStageTrigger stage="minimized" />
            <FloatingPanelCloseIcon bind:ref={refs.close} />
          </FloatingPanelControl>
        </FloatingPanelHeader>
      </FloatingPanelDragTrigger>
      <FloatingPanelBody>Body</FloatingPanelBody>
      <FloatingPanelFooter bind:ref={refs.footer}>Footer</FloatingPanelFooter>
      <FloatingPanelResizeTriggerGroup axes={['e']} />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>