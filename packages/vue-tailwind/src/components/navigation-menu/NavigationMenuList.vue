<script setup lang="ts">
import { NavigationMenuList as ArkNavigationMenuList } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuListProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const listClass =
  'group/navigation-menu-list relative m-0 box-border flex max-w-full list-none items-center gap-1 p-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch [&>[data-slot=navigation-menu-indicator]]:top-auto [&>[data-slot=navigation-menu-indicator]]:-bottom-2.5 [&>[data-slot=navigation-menu-indicator]]:z-[61]';
</script>

<template>
  <ArkNavigationMenuList
    v-bind="attrs"
    :class="cn(listClass, className)"
    data-slot="navigation-menu-list"
  >
    <slot />
  </ArkNavigationMenuList>
</template>