<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
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
      cn(
        `grid grid-cols-[minmax(0,1fr)_auto] items-start gap-1 [&>[data-slot='dialog-close-trigger']]:col-start-2 [&>[data-slot='dialog-close-trigger']]:justify-self-end [&>[data-slot='dialog-description']]:col-span-2 [&>[data-slot='dialog-title']]:col-start-1`,
        className,
      )
    "
    data-slot="dialog-header"
  >
    <slot />
  </ark.div>
</template>