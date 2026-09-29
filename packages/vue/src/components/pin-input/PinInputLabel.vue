<script setup lang="ts">
import { PinInputLabel as ArkPinInputLabel } from '@ark-ui/vue/pin-input';
import type { PinInputLabelProps } from '@ark-ui/vue/pin-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PinInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="pin-input-label"
  >
    <slot />
  </ArkPinInputLabel>
</template>