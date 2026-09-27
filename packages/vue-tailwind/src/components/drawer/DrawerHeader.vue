<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const headerClass =
  "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-1 [&>[data-slot='drawer-close-icon']]:col-start-2 [&>[data-slot='drawer-close-icon']]:justify-self-end [&>[data-slot='drawer-close-trigger']]:col-start-2 [&>[data-slot='drawer-close-trigger']]:justify-self-end [&>[data-slot='drawer-description']]:col-span-2 [&>[data-slot='drawer-title']]:col-start-1";
</script>

<template>
  <ark.div v-bind="attrs" :class="cn(headerClass, className)" data-slot="drawer-header">
    <slot />
  </ark.div>
</template>
