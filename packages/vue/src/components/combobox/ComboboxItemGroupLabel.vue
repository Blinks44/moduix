<script setup lang="ts">
import { ComboboxItemGroupLabel as ArkComboboxItemGroupLabel } from '@ark-ui/vue/combobox';
import type { ComboboxItemGroupLabelProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxItemGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemGroupLabel
    v-bind="attrs"
    :class="clsx(styles.itemGroupLabel, className)"
    data-slot="combobox-item-group-label"
  >
    <slot />
  </ArkComboboxItemGroupLabel>
</template>