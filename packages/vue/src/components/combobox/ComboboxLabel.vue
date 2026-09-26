<script setup lang="ts">
import { ComboboxLabel as ArkComboboxLabel } from '@ark-ui/vue/combobox';
import type { ComboboxLabelProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="combobox-label"
  >
    <slot />
  </ArkComboboxLabel>
</template>