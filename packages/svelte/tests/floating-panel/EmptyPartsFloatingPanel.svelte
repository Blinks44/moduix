<script lang="ts">
  import {
    FloatingPanel,
    FloatingPanelBody,
    FloatingPanelContent,
    FloatingPanelControl,
    FloatingPanelDragIndicator,
    FloatingPanelFooter,
    FloatingPanelHeader,
    FloatingPanelPositioner,
    FloatingPanelStageTrigger,
    FloatingPanelTitle,
  } from '@/components/floating-panel';
</script>

<FloatingPanel defaultOpen portalled={false}>
  <FloatingPanelPositioner>
    <FloatingPanelContent class="rounded-none bg-muted">
      <FloatingPanelHeader data-testid="header">
        <FloatingPanelTitle
          ><FloatingPanelDragIndicator data-testid="drag-indicator" /></FloatingPanelTitle
        >
        <FloatingPanelControl data-testid="control">
          <FloatingPanelStageTrigger stage="minimized" />
        </FloatingPanelControl>
      </FloatingPanelHeader>
      <FloatingPanelBody data-testid="body" />
      <FloatingPanelFooter data-testid="footer" />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>