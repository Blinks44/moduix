<script setup lang="ts">
import { ComboboxInput as ArkComboboxInput } from '@ark-ui/vue/combobox';
import type { ComboboxInputProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './CommandPalette.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxInput
    v-bind="attrs"
    :class="clsx(styles.input, props.class)"
    data-slot="command-palette-input"
  >
    <slot />
  </ArkComboboxInput>
</template>