<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelContent,
  FloatingPanelContext,
  FloatingPanelControl,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
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
    <FloatingPanelTrigger as-child><Button>Open context panel</Button></FloatingPanelTrigger>
    <FloatingPanelPositioner
      ><FloatingPanelContent
        ><FloatingPanelDragTrigger
          ><FloatingPanelHeader
            ><FloatingPanelTitle><FloatingPanelDragIndicator />Context state</FloatingPanelTitle
            ><FloatingPanelControl
              ><FloatingPanelStageTrigger stage="minimized" /><FloatingPanelStageTrigger
                stage="maximized" /><FloatingPanelStageTrigger
                stage="default" /><FloatingPanelCloseIcon /></FloatingPanelControl></FloatingPanelHeader></FloatingPanelDragTrigger
        ><FloatingPanelBody
          >FloatingPanelContext exposes the panel API to descendants.</FloatingPanelBody
        ><FloatingPanelResizeTriggerGroup /></FloatingPanelContent
    ></FloatingPanelPositioner>
    <FloatingPanelContext v-slot="panel"
      ><div data-preview-meta>
        <output>Open: {{ String(panel.open) }}, dragging: {{ String(panel.dragging) }}</output>
      </div></FloatingPanelContext
    >
  </FloatingPanel>
</template>