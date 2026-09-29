<script setup lang="ts">
import { NumberInputScrubber as ArkNumberInputScrubber } from '@ark-ui/vue/number-input';
import type { NumberInputScrubberProps } from '@ark-ui/vue/number-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NumberInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputScrubberProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputScrubber
    v-bind="attrs"
    :class="clsx(styles.scrubber, className)"
    data-slot="number-input-scrubber"
  >
    <slot />
  </ArkNumberInputScrubber>
</template>