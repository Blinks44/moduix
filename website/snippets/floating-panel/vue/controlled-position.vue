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
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from '@moduix/vue/floating-panel';
import { ref } from 'vue';

const position = ref({ x: 160, y: 140 });
</script>

<template>
  <FloatingPanel
    :default-size="{ width: 360, height: 260 }"
    :position="position"
    @position-change="position = $event.position"
  >
    <FloatingPanelTrigger as-child><Button>Open positioned panel</Button></FloatingPanelTrigger>
    <FloatingPanelPositioner
      ><FloatingPanelContent
        ><FloatingPanelDragTrigger
          ><FloatingPanelHeader
            ><FloatingPanelTitle
              ><FloatingPanelDragIndicator />Controlled position</FloatingPanelTitle
            ><FloatingPanelControl
              ><FloatingPanelStageTrigger stage="minimized" /><FloatingPanelStageTrigger
                stage="maximized" /><FloatingPanelStageTrigger
                stage="default" /><FloatingPanelCloseIcon /></FloatingPanelControl></FloatingPanelHeader></FloatingPanelDragTrigger
        ><FloatingPanelBody>Dragging updates the controlled position object.</FloatingPanelBody
        ><FloatingPanelResizeTriggerGroup /></FloatingPanelContent
    ></FloatingPanelPositioner>
  </FloatingPanel>
  <div data-preview-meta>
    <output>Position: {{ Math.round(position.x) }}, {{ Math.round(position.y) }}</output>
  </div>
</template>