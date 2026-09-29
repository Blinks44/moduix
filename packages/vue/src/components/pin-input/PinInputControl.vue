<script setup lang="ts">
import { PinInputControl as ArkPinInputControl } from '@ark-ui/vue/pin-input';
import type { PinInputControlProps } from '@ark-ui/vue/pin-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PinInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="pin-input-control"
  >
    <slot />
  </ArkPinInputControl>
</template>