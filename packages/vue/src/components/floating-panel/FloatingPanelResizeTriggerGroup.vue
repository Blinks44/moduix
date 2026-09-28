<script setup lang="ts">
import type { FloatingPanelResizeTriggerAxis } from '@ark-ui/vue/floating-panel';
import { resizeTriggerAxes } from './floating-panel.types';
import FloatingPanelResizeTrigger from './FloatingPanelResizeTrigger.vue';

export interface Props {
  axes?: readonly FloatingPanelResizeTriggerAxis[];
}

const { axes = resizeTriggerAxes } = defineProps<Props>();
</script>

<template>
  <FloatingPanelResizeTrigger v-for="axis in axes" :key="axis" :axis="axis" />
</template>