<script setup lang="ts">
import { ark, type HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    :class="
      cn('inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full', className)
    "
    data-slot="menu-item-text-icon"
  >
    <slot />
  </ark.span>
</template>