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
    :class="cn('ms-auto ps-4 text-xs whitespace-nowrap text-muted-foreground', className)"
    data-slot="menu-item-shortcut"
  >
    <slot />
  </ark.span>
</template>