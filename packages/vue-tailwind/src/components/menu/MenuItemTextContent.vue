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
    :class="cn('inline-flex max-w-full min-w-0 items-center gap-2 align-top', className)"
    data-slot="menu-item-text-content"
  >
    <slot />
  </ark.span>
</template>