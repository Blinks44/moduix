<script setup lang="ts">
import { NumberInputRoot as ArkNumberInputRoot } from '@ark-ui/vue/number-input';
import type { NumberInputRootEmits, NumberInputRootProps } from '@ark-ui/vue/number-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NumberInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ NumberInputRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="number-input-root"
  >
    <slot />
  </ArkNumberInputRoot>
</template>