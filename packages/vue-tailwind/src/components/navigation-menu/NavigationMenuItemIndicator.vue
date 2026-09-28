<script setup lang="ts">
import { NavigationMenuItemIndicator as ArkNavigationMenuItemIndicator } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuItemIndicatorProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemIndicatorClass = 'absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-current';
</script>

<template>
  <ArkNavigationMenuItemIndicator
    v-bind="attrs"
    :class="cn(itemIndicatorClass, className)"
    data-slot="navigation-menu-item-indicator"
  >
    <slot />
  </ArkNavigationMenuItemIndicator>
</template>