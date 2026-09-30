<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { useSidebar } from './context';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { collapsed } = useSidebar();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="className"
    :hidden="!collapsed"
    data-scope="sidebar"
    data-part="collapsed-content"
    data-slot="sidebar-collapsed-content"
  >
    <slot />
  </ark.div>
</template>