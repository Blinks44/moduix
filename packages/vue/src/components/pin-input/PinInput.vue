<script setup lang="ts">
import { PinInputRoot as ArkPinInputRoot } from '@ark-ui/vue/pin-input';
import type { PinInputRootEmits, PinInputRootProps } from '@ark-ui/vue/pin-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PinInput.module.css';

defineOptions({ inheritAttrs: false });

export type PinInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ PinInputRootProps {
  class?: HTMLAttributes['class'];
  placeholder?: PinInputRootProps['placeholder'];
  size?: PinInputSize;
}

const { class: className, placeholder = '', size = 'md' } = defineProps<Props>();
defineEmits</* @vue-ignore */ PinInputRootEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    :placeholder="placeholder"
    data-slot="pin-input-root"
  >
    <slot />
  </ArkPinInputRoot>
</template>