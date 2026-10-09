<script setup lang="ts">
import { MenuCheckboxItem as ArkMenuCheckboxItem } from '@ark-ui/vue/menu';
import type { MenuCheckboxItemProps, MenuCheckboxItemEmits } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';

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
    :class="clsx(styles.checkboxItem, className)"
    :checked="checked"
    :value="value"
    :data-indicator-position="indicator"
    data-slot="menu-checkbox-item"
  >
    <slot />
  </ArkMenuCheckboxItem>
</template>