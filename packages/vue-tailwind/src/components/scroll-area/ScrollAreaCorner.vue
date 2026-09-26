<script setup lang="ts">
import { ScrollAreaCorner as ArkScrollAreaCorner } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaCornerProps } from '@ark-ui/vue/scroll-area';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaCornerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaCorner
    v-bind="attrs"
    :class="cn('bg-transparent', className)"
    data-slot="scroll-area-corner"
  >
    <slot />
  </ArkScrollAreaCorner>
</template>