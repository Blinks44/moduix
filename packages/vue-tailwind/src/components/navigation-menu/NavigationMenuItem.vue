<script setup lang="ts">
import { NavigationMenuItem as ArkNavigationMenuItem } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuItemProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuItemProps {
  class?: HTMLAttributes['class'];
  value: NavigationMenuItemProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemClass =
  'relative group-has-[>[data-slot=navigation-menu-indicator]]/navigation-menu-list:static group-has-[>[data-slot=navigation-menu-viewport-positioner]>[data-slot=navigation-menu-viewport]]/navigation-menu:static';
</script>

<template>
  <ArkNavigationMenuItem
    v-bind="attrs"
    :class="cn(itemClass, className)"
    :value="value"
    data-slot="navigation-menu-item"
  >
    <slot />
  </ArkNavigationMenuItem>
</template>