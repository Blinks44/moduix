<script setup lang="ts">
import { ComboboxInput as ArkComboboxInput } from '@ark-ui/vue/combobox';
import type { ComboboxInputProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxInputProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxInput
    v-bind="attrs"
    :as-child="props.asChild"
    :class="clsx(!props.asChild && styles.input, props.class)"
    data-slot="combobox-input"
  >
    <slot />
  </ArkComboboxInput>
</template>