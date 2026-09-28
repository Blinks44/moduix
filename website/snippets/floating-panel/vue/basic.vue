<script setup lang="ts">
import { Button } from '@moduix/vue/button';
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
} from '@moduix/vue/floating-panel';
</script>

<template>
  <FloatingPanel :default-size="{ width: 360, height: 260 }">
    <FloatingPanelTrigger as-child><Button>Open panel</Button></FloatingPanelTrigger>
    <FloatingPanelPositioner>
      <FloatingPanelContent>
        <FloatingPanelDragTrigger
          ><FloatingPanelHeader
            ><FloatingPanelTitle><FloatingPanelDragIndicator />Inspector</FloatingPanelTitle
            ><FloatingPanelControl
              ><FloatingPanelStageTrigger stage="minimized" /><FloatingPanelStageTrigger
                stage="maximized" /><FloatingPanelStageTrigger
                stage="default" /><FloatingPanelCloseIcon /></FloatingPanelControl></FloatingPanelHeader
        ></FloatingPanelDragTrigger>
        <FloatingPanelBody
          >Drag the header to move this panel and resize it from any edge.</FloatingPanelBody
        >
        <FloatingPanelFooter
          >Esc closes the panel without hiding the resize handles.</FloatingPanelFooter
        >
        <FloatingPanelResizeTriggerGroup />
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  </FloatingPanel>
</template>