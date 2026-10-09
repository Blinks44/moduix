<script setup lang="ts">
import { ComboboxContent as ArkComboboxContent } from '@ark-ui/vue/combobox';
import type { ComboboxContentProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="combobox-content"
  >
    <slot />
  </ArkComboboxContent>
</template>