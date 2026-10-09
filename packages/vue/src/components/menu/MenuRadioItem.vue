<script setup lang="ts">
import { MenuRadioItem as ArkMenuRadioItem } from '@ark-ui/vue/menu';
import type { MenuRadioItemProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

type MenuIndicatorPosition = 'start' | 'end' | 'none';
interface Props extends /* @vue-ignore */ MenuRadioItemProps {
  class?: HTMLAttributes['class'];
  indicator?: MenuIndicatorPosition;
  value: MenuRadioItemProps['value'];
}

const { class: className, indicator = 'start', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuRadioItem
    v-bind="attrs"
    :class="clsx(styles.radioItem, className)"
    :value="value"
    :data-indicator-position="indicator"
    data-slot="menu-radio-item"
  >
    <slot />
  </ArkMenuRadioItem>
</template>