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
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from '@moduix/vue/floating-panel';
import { ref } from 'vue';
import styles from '@/components/examples/floating-panel/floating-panel-boundary.module.css';

const boundaryRef = ref<HTMLDivElement>();
const getBoundaryEl = () => boundaryRef.value ?? null;
const getAnchorPosition = ({ boundaryRect }: { boundaryRect: DOMRect | null }) => ({
  x: (boundaryRect?.x ?? 0) + 16,
  y: (boundaryRect?.y ?? 0) + 16,
});
</script>

<template>
  <div ref="boundaryRef" :class="styles.root">
    <FloatingPanel
      :allow-overflow="false"
      :default-size="{ width: 300, height: 220 }"
      :get-boundary-el="getBoundaryEl"
      :get-anchor-position="getAnchorPosition"
    >
      <FloatingPanelTrigger as-child><Button>Open constrained panel</Button></FloatingPanelTrigger>
      <FloatingPanelPositioner
        ><FloatingPanelContent
          ><FloatingPanelDragTrigger
            ><FloatingPanelHeader
              ><FloatingPanelTitle><FloatingPanelDragIndicator />Boundary</FloatingPanelTitle
              ><FloatingPanelControl
                ><FloatingPanelCloseIcon /></FloatingPanelControl></FloatingPanelHeader></FloatingPanelDragTrigger
          ><FloatingPanelBody
            >This panel stays inside the dashed boundary while you drag it.</FloatingPanelBody
          ><FloatingPanelResizeTriggerGroup /></FloatingPanelContent
      ></FloatingPanelPositioner>
    </FloatingPanel>
  </div>
</template>