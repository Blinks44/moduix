<script setup lang="ts">
import { FloatingPanelResizeTrigger as ArkFloatingPanelResizeTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelResizeTriggerProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelResizeTriggerProps {
  axis: FloatingPanelResizeTriggerProps['axis'];
  class?: HTMLAttributes['class'];
}

const { axis, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resizeTriggerClass =
  'data-disabled:pointer-events-none data-[axis=e]:w-2 data-[axis=n]:h-2 data-[axis=ne]:size-3 data-[axis=nw]:size-3 data-[axis=s]:h-2 data-[axis=se]:size-3 data-[axis=sw]:size-3 data-[axis=w]:w-2';
</script>

<template>
  <ArkFloatingPanelResizeTrigger
    v-bind="attrs"
    :axis="axis"
    :class="cn(resizeTriggerClass, className)"
    data-slot="floating-panel-resize-trigger"
  >
    <slot />
  </ArkFloatingPanelResizeTrigger>
</template>