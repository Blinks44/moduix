<script setup lang="ts">
import { ComboboxEmpty as ArkComboboxEmpty } from '@ark-ui/vue/combobox';
import type { ComboboxEmptyProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './CommandPalette.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxEmptyProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxEmpty
    v-bind="attrs"
    :class="clsx(styles.empty, className)"
    data-slot="command-palette-empty"
  >
    <slot />
  </ArkComboboxEmpty>
</template>