<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelContent,
  FloatingPanelControl,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelRootProvider,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  useFloatingPanel,
} from '@moduix/vue/floating-panel';

const panel = useFloatingPanel({
  defaultSize: { width: 360, height: 260 },
  persistRect: true,
});
</script>

<template>
  <FloatingPanelRootProvider :value="panel">
    <FloatingPanelPositioner
      ><FloatingPanelContent
        ><FloatingPanelDragTrigger
          ><FloatingPanelHeader
            ><FloatingPanelTitle><FloatingPanelDragIndicator />Root provider</FloatingPanelTitle
            ><FloatingPanelControl
              ><FloatingPanelStageTrigger stage="minimized" /><FloatingPanelStageTrigger
                stage="maximized" /><FloatingPanelStageTrigger
                stage="default" /><FloatingPanelCloseIcon /></FloatingPanelControl></FloatingPanelHeader></FloatingPanelDragTrigger
        ><FloatingPanelBody
          >Ark useFloatingPanel owns the panel state outside the rendered part
          tree.</FloatingPanelBody
        ><FloatingPanelResizeTriggerGroup /></FloatingPanelContent
    ></FloatingPanelPositioner>
  </FloatingPanelRootProvider>
  <div data-preview-meta>
    <Button @click="panel.setOpen(true)">Open via API</Button
    ><Button variant="outline" @click="panel.maximize">Maximize</Button
    ><Button variant="outline" @click="panel.minimize">Minimize</Button>
  </div>
</template>