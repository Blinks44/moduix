<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'ul'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.ul
    v-bind="attrs"
    :class="cn('flex w-full min-w-0 flex-col gap-1', className)"
    data-scope="sidebar"
    data-part="navigation-list"
    data-slot="sidebar-navigation-list"
  >
    <slot />
  </ark.ul>
</template>