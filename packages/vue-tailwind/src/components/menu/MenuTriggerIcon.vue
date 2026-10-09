<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <span
    v-bind="attrs"
    :class="
      cn('inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full', className)
    "
    data-slot="menu-trigger-icon"
  >
    <slot><ChevronDownIcon /></slot>
  </span>
</template>