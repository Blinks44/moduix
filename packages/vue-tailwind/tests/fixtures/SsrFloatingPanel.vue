<script setup lang="ts">
import {
  FloatingPanel,
  FloatingPanelPositioner,
  FloatingPanelContent,
  FloatingPanelTitle,
} from '../../src/components/floating-panel';
</script>
<template>
  <FloatingPanel default-open :portalled="false">
    <FloatingPanelPositioner>
      <FloatingPanelContent>
        <FloatingPanelTitle>Hydrated panel</FloatingPanelTitle>
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  </FloatingPanel>
</template>