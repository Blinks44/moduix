<script setup lang="ts">
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import DrawerBackdrop from './DrawerBackdrop.vue';
import DrawerContent from './DrawerContent.vue';
import type { Props as DrawerContentProps } from './DrawerContent.vue';
import DrawerPositioner from './DrawerPositioner.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent :ref="forwardRef" v-bind="attrs" :class="className">
      <slot />
    </DrawerContent>
  </DrawerPositioner>
</template>