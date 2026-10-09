<script setup lang="ts">
import { ComboboxItemGroup as ArkComboboxItemGroup } from '@ark-ui/vue/combobox';
import type { ComboboxItemGroupProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemGroup
    v-bind="attrs"
    :class="clsx(styles.itemGroup, className)"
    data-slot="combobox-item-group"
  >
    <slot />
  </ArkComboboxItemGroup>
</template>