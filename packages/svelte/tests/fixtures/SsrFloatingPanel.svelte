<script lang="ts">
  import {
    FloatingPanel,
    FloatingPanelContent,
    FloatingPanelPositioner,
    FloatingPanelTitle,
  } from '@/components/floating-panel';
</script>

<FloatingPanel defaultOpen portalled={false}>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelTitle>Hydrated panel</FloatingPanelTitle>
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>