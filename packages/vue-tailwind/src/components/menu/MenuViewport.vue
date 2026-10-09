<script setup lang="ts">
import { ark, type HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="
      cn('flex max-h-[min(24rem,var(--available-height,100dvh))] flex-col overflow-auto', className)
    "
    data-scope="menu"
    data-part="viewport"
    data-slot="menu-viewport"
  >
    <slot />
  </ark.div>
</template>