<script setup lang="ts">
import { ScrollAreaCorner as ArkScrollAreaCorner } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaCornerProps } from '@ark-ui/vue/scroll-area';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaCornerProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaCorner v-bind="attrs" data-slot="scroll-area-corner">
    <slot />
  </ArkScrollAreaCorner>
</template>