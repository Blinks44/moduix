<script setup lang="ts">
import { MenuCheckboxItem as ArkMenuCheckboxItem } from '@ark-ui/vue/menu';
import type { MenuCheckboxItemProps, MenuCheckboxItemEmits } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { menuItemStyles } from './Menu.variants';

defineOptions({ inheritAttrs: false });

type MenuIndicatorPosition = 'start' | 'end' | 'none';
interface Props extends /* @vue-ignore */ MenuCheckboxItemProps {
  checked: MenuCheckboxItemProps['checked'];
  class?: HTMLAttributes['class'];
  indicator?: MenuIndicatorPosition;
  value: MenuCheckboxItemProps['value'];
}

const { checked, class: className, indicator = 'start', value } = defineProps<Props>();
interface Emits extends /* @vue-ignore */ MenuCheckboxItemEmits {}
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuCheckboxItem
    v-bind="attrs"
    :class="cn(menuItemStyles({ layout: 'indicatorItem', indicator }), className)"
    :checked="checked"
    :value="value"
    :data-indicator-position="indicator"
    data-slot="menu-checkbox-item"
  >
    <slot />
  </ArkMenuCheckboxItem>
</template>