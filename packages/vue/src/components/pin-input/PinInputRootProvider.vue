<script setup lang="ts">
import { PinInputRootProvider as ArkPinInputRootProvider } from '@ark-ui/vue/pin-input';
import type { PinInputRootProviderProps } from '@ark-ui/vue/pin-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PinInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputRootProviderProps {
  class?: HTMLAttributes['class'];
  value: PinInputRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="pin-input-root-provider"
  >
    <slot />
  </ArkPinInputRootProvider>
</template>