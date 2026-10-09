<script setup lang="ts">
import { ComboboxControl as ArkComboboxControl } from '@ark-ui/vue/combobox';
import type { ComboboxControlProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="combobox-control"
  >
    <slot />
  </ArkComboboxControl>
</template>