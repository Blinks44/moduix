<script setup lang="ts">
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import SelectContent from './SelectContent.vue';
import type { Props as SelectContentProps } from './SelectContent.vue';
import SelectPositioner from './SelectPositioner.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <SelectPositioner>
    <SelectContent :ref="forwardRef" v-bind="attrs" :class="className">
      <slot />
    </SelectContent>
  </SelectPositioner>
</template>