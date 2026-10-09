<script setup lang="ts">
import { ScrollAreaContent as ArkScrollAreaContent } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaContentProps } from '@ark-ui/vue/scroll-area';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaContent
    v-bind="attrs"
    :class="cn('block', className)"
    data-slot="scroll-area-content"
  >
    <slot />
  </ArkScrollAreaContent>
</template>