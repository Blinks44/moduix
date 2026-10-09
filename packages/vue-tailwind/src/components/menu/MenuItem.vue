<script setup lang="ts">
import { MenuItem as ArkMenuItem } from '@ark-ui/vue/menu';
import type { MenuItemProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { menuItemStyles } from './Menu.variants';

defineOptions({ inheritAttrs: false });

type MenuItemTone = 'default' | 'destructive';
interface Props extends /* @vue-ignore */ MenuItemProps {
  class?: HTMLAttributes['class'];
  tone?: MenuItemTone;
  value: MenuItemProps['value'];
}

const { class: className, tone = 'default', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuItem
    v-bind="attrs"
    :class="cn(menuItemStyles({ layout: 'item', tone }), className)"
    :value="value"
    :data-tone="tone"
    data-slot="menu-item"
  >
    <slot />
  </ArkMenuItem>
</template>