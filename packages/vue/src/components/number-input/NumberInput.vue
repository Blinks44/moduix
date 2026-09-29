<script setup lang="ts">
import { NumberInputRoot as ArkNumberInputRoot } from '@ark-ui/vue/number-input';
import type {
  NumberInputFocusChangeDetails,
  NumberInputRootProps,
  NumberInputValueChangeDetails,
  NumberInputValueInvalidDetails,
} from '@ark-ui/vue/number-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NumberInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits {
  focusChange: [details: NumberInputFocusChangeDetails];
  valueChange: [details: NumberInputValueChangeDetails];
  'update:modelValue': [value: string];
  valueInvalid: [details: NumberInputValueInvalidDetails];
}

const { class: className } = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="number-input-root"
    @focus-change="emit('focusChange', $event)"
    @value-change="emit('valueChange', $event)"
    @update:model-value="emit('update:modelValue', $event)"
    @value-invalid="emit('valueInvalid', $event)"
  >
    <slot />
  </ArkNumberInputRoot>
</template>