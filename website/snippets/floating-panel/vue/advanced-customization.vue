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
  FloatingPanelResizeTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from '@moduix/vue/floating-panel';
</script>

<template>
  <FloatingPanel :default-size="{ width: 360, height: 260 }">
    <FloatingPanelTrigger as-child><Button>Open custom resize panel</Button></FloatingPanelTrigger>
    <FloatingPanelPositioner
      ><FloatingPanelContent
        ><FloatingPanelDragTrigger
          ><FloatingPanelHeader
            ><FloatingPanelTitle
              ><FloatingPanelDragIndicator />Custom resize handles</FloatingPanelTitle
            ><FloatingPanelControl
              ><FloatingPanelCloseIcon /></FloatingPanelControl></FloatingPanelHeader></FloatingPanelDragTrigger
        ><FloatingPanelBody
          >Only the right, bottom, and bottom-right handles are rendered in this
          composition.</FloatingPanelBody
        ><FloatingPanelResizeTrigger axis="e" /><FloatingPanelResizeTrigger
          axis="s" /><FloatingPanelResizeTrigger axis="se" /></FloatingPanelContent
    ></FloatingPanelPositioner>
  </FloatingPanel>
</template>