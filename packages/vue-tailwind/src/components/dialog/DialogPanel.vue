<script setup lang="ts">
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import DialogBackdrop from './DialogBackdrop.vue';
import DialogContent from './DialogContent.vue';
import type { Props as DialogContentProps } from './DialogContent.vue';
import DialogPositioner from './DialogPositioner.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent :ref="forwardRef" v-bind="attrs" :class="className">
      <slot />
    </DialogContent>
  </DialogPositioner>
</template>