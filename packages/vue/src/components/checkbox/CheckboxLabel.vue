<script setup lang="ts">
import { CheckboxLabel as ArkCheckboxLabel } from '@ark-ui/vue/checkbox';
import type { CheckboxLabelProps } from '@ark-ui/vue/checkbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Checkbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CheckboxLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="checkbox-label"
  >
    <slot />
  </ArkCheckboxLabel>
</template>