<script setup lang="ts">
import { ComboboxItem as ArkComboboxItem } from '@ark-ui/vue/combobox';
import type { ComboboxItemProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './CommandPalette.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxItemProps {
  class?: HTMLAttributes['class'];
  item: ComboboxItemProps['item'];
}

const { class: className, item } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :item="item"
    data-slot="command-palette-item"
  >
    <slot />
  </ArkComboboxItem>
</template>