<script setup lang="ts">
import { NumberInputIncrementTrigger as ArkNumberInputIncrementTrigger } from '@ark-ui/vue/number-input';
import type { NumberInputIncrementTriggerProps } from '@ark-ui/vue/number-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { PlusIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './NumberInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputIncrementTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputIncrementTrigger
    v-bind="attrs"
    :class="clsx(styles.incrementTrigger, className)"
    data-slot="number-input-increment-trigger"
  >
    <slot v-if="$slots.default" />
    <PlusIcon v-else />
  </ArkNumberInputIncrementTrigger>
</template>