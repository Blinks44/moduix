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

const size = ref({ width: 360, height: 260 });
</script>

<template>
  <FloatingPanel :size="size" @size-change="size = $event.size">
    <FloatingPanelTrigger as-child><Button>Open resizable panel</Button></FloatingPanelTrigger>
    <FloatingPanelPositioner
      ><FloatingPanelContent
        ><FloatingPanelDragTrigger
          ><FloatingPanelHeader
            ><FloatingPanelTitle><FloatingPanelDragIndicator />Controlled size</FloatingPanelTitle
            ><FloatingPanelControl
              ><FloatingPanelStageTrigger stage="minimized" /><FloatingPanelStageTrigger
                stage="maximized" /><FloatingPanelStageTrigger
                stage="default" /><FloatingPanelCloseIcon /></FloatingPanelControl></FloatingPanelHeader></FloatingPanelDragTrigger
        ><FloatingPanelBody>Resize handles update controlled width and height.</FloatingPanelBody
        ><FloatingPanelResizeTriggerGroup /></FloatingPanelContent
    ></FloatingPanelPositioner>
  </FloatingPanel>
  <div data-preview-meta>
    <output>Size: {{ Math.round(size.width) }} × {{ Math.round(size.height) }}</output>
  </div>
</template>