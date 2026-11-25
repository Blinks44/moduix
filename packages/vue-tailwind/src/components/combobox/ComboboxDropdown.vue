<script setup lang="ts">
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import ComboboxContent from './ComboboxContent.vue';
import type { Props as ComboboxContentProps } from './ComboboxContent.vue';
import ComboboxPositioner from './ComboboxPositioner.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <ComboboxPositioner>
    <ComboboxContent :ref="forwardRef" v-bind="attrs" :class="className">
      <slot />
    </ComboboxContent>
  </ComboboxPositioner>
</template>