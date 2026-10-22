<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

const menuBadgeClass =
  'pointer-events-none absolute end-2.5 top-1/2 z-1 box-border inline-grid size-5 -translate-y-1/2 place-items-center rounded-full bg-primary text-[0.5625rem] leading-none font-medium text-primary-foreground tabular-nums @max-[7rem]:hidden';
</script>

<template>
  <ark.span
    v-bind="attrs"
    :class="cn(menuBadgeClass, className)"
    data-scope="sidebar"
    data-part="navigation-badge"
    data-slot="sidebar-navigation-badge"
  >
    <slot />
  </ark.span>
</template>