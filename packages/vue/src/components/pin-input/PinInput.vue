<script setup lang="ts">
import { PinInputRoot as ArkPinInputRoot } from '@ark-ui/vue/pin-input';
import type { PinInputRootEmits, PinInputRootProps } from '@ark-ui/vue/pin-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PinInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputRootProps {
  class?: HTMLAttributes['class'];
  placeholder?: PinInputRootProps['placeholder'];
}

export interface Emits extends /* @vue-ignore */ PinInputRootEmits {}

const { class: className, placeholder = '' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :placeholder="placeholder"
    data-slot="pin-input-root"
  >
    <slot />
  </ArkPinInputRoot>
</template>