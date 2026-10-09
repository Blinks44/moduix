<script setup lang="ts">
import { NumberInputInput as ArkNumberInputInput } from '@ark-ui/vue/number-input';
import type { NumberInputInputProps } from '@ark-ui/vue/number-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NumberInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputInput
    v-bind="attrs"
    :class="clsx(styles.input, props.class)"
    data-slot="number-input-input"
  >
    <slot />
  </ArkNumberInputInput>
</template>