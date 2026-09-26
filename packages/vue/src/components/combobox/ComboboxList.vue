<script setup lang="ts">
import { ComboboxList as ArkComboboxList } from '@ark-ui/vue/combobox';
import type { ComboboxListProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxList v-bind="attrs" :class="clsx(styles.list, className)" data-slot="combobox-list">
    <slot />
  </ArkComboboxList>
</template>