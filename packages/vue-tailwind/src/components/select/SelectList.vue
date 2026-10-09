<script setup lang="ts">
import { SelectList as ArkSelectList } from '@ark-ui/vue/select';
import type { SelectListProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectList
    v-bind="attrs"
    :class="
      cn(
        'flex min-h-0 scroll-py-1 flex-col overflow-y-auto overscroll-contain outline-0',
        className,
      )
    "
    data-slot="select-list"
  >
    <slot />
  </ArkSelectList>
</template>