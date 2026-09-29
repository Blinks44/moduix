<script setup lang="ts">
import { NumberInputControl as ArkNumberInputControl } from '@ark-ui/vue/number-input';
import type { NumberInputControlProps } from '@ark-ui/vue/number-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NumberInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="number-input-control"
  >
    <slot />
  </ArkNumberInputControl>
</template>