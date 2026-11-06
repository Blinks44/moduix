<script lang="ts">
  import {
    FloatingPanel,
    FloatingPanelContent,
    FloatingPanelPositioner,
    FloatingPanelResizeTriggerGroup,
  } from '@/components/floating-panel';
</script>

<FloatingPanel defaultOpen portalled={false} defaultSize={{ width: 360, height: 260 }}>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelResizeTriggerGroup axes={['e', 's', 'se']} />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>