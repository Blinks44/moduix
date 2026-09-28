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

const exits = ref(0);
</script>

<template>
  <FloatingPanel
    lazy-mount
    unmount-on-exit
    :default-size="{ width: 360, height: 260 }"
    @exit-complete="exits++"
  >
    <FloatingPanelTrigger as-child><Button>Open lazy panel</Button></FloatingPanelTrigger>
    <FloatingPanelPositioner
      ><FloatingPanelContent
        ><FloatingPanelDragTrigger
          ><FloatingPanelHeader
            ><FloatingPanelTitle><FloatingPanelDragIndicator />Lazy mounted</FloatingPanelTitle
            ><FloatingPanelControl
              ><FloatingPanelStageTrigger stage="minimized" /><FloatingPanelStageTrigger
                stage="maximized" /><FloatingPanelStageTrigger
                stage="default" /><FloatingPanelCloseIcon /></FloatingPanelControl></FloatingPanelHeader></FloatingPanelDragTrigger
        ><FloatingPanelBody
          >The panel content mounts on first open and unmounts after exit.</FloatingPanelBody
        ><FloatingPanelResizeTriggerGroup /></FloatingPanelContent
    ></FloatingPanelPositioner>
  </FloatingPanel>
  <div data-preview-meta>
    <output>Exit completions: {{ exits }}</output>
  </div>
</template>