<script setup lang="ts">
import { SelectItemText as ArkSelectItemText } from '@ark-ui/vue/select';
import type { SelectItemTextProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItemText
    v-bind="attrs"
    :class="clsx(styles.itemText, className)"
    data-slot="select-item-text"
  >
    <slot />
  </ArkSelectItemText>
</template>