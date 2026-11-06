<script lang="ts">
  import {
    FloatingPanel,
    FloatingPanelContent,
    FloatingPanelControl,
    FloatingPanelPositioner,
    FloatingPanelStageTrigger,
  } from '@/components/floating-panel';
</script>

<FloatingPanel
  defaultOpen
  portalled={false}
  defaultSize={{ width: 360, height: 260 }}
  translations={{ minimize: 'Minimieren', maximize: 'Maximieren', restore: 'Wiederherstellen' }}
>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelControl>
        <FloatingPanelStageTrigger stage="minimized" />
        <FloatingPanelStageTrigger stage="maximized" />
      </FloatingPanelControl>
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>