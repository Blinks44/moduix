<script setup lang="ts">
import { ScrollAreaContent as ArkScrollAreaContent } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaContentProps } from '@ark-ui/vue/scroll-area';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaContentProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaContent v-bind="attrs" data-slot="scroll-area-content">
    <slot />
  </ArkScrollAreaContent>
</template>