<script setup lang="ts">
import { PinInputRootProvider as ArkPinInputRootProvider } from '@ark-ui/vue/pin-input';
import type { PinInputRootProviderProps } from '@ark-ui/vue/pin-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PinInput.module.css';
import type { PinInputSize } from './PinInput.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: PinInputSize;
  value: PinInputRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    :value="value"
    data-slot="pin-input-root-provider"
  >
    <slot />
  </ArkPinInputRootProvider>
</template>