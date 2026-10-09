<script setup lang="ts">
import { NumberInputDecrementTrigger as ArkNumberInputDecrementTrigger } from '@ark-ui/vue/number-input';
import type { NumberInputDecrementTriggerProps } from '@ark-ui/vue/number-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { MinusIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './NumberInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputDecrementTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputDecrementTrigger
    v-bind="attrs"
    :class="clsx(styles.decrementTrigger, className)"
    data-slot="number-input-decrement-trigger"
  >
    <slot v-if="$slots.default" />
    <MinusIcon v-else />
  </ArkNumberInputDecrementTrigger>
</template>