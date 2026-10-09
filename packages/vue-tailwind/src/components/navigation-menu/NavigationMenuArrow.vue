<script setup lang="ts">
import { NavigationMenuArrow as ArkNavigationMenuArrow } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuArrowProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const arrowClass = 'relative top-1 size-2.5 rotate-45 border-s border-t border-border bg-popover';
</script>

<template>
  <ArkNavigationMenuArrow
    v-bind="attrs"
    :class="cn(arrowClass, className)"
    data-slot="navigation-menu-arrow"
  >
    <slot />
  </ArkNavigationMenuArrow>
</template>