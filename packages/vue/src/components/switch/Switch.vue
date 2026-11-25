<script setup lang="ts">
import {
  SwitchHiddenInput as ArkSwitchHiddenInput,
  SwitchRoot as ArkSwitchRoot,
} from '@ark-ui/vue/switch';
import type { SwitchHiddenInputProps, SwitchRootEmits, SwitchRootProps } from '@ark-ui/vue/switch';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Switch.module.css';
import SwitchControl from './SwitchControl.vue';
import SwitchLabel from './SwitchLabel.vue';

defineOptions({ inheritAttrs: false });

export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ SwitchRootProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  hiddenInput?: boolean;
  hiddenInputProps?: SwitchHiddenInputProps;
  label?: string;
  size?: SwitchSize;
}

export interface Emits extends /* @vue-ignore */ SwitchRootEmits {}

const {
  asChild = undefined,
  class: className,
  hiddenInput = undefined,
  hiddenInputProps,
  label,
  size = 'md',
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchRoot
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(styles.root, className)"
    :data-size="size"
    data-slot="switch-root"
  >
    <template v-if="asChild">
      <slot />
    </template>
    <template v-else-if="$slots.default">
      <slot />
      <ArkSwitchHiddenInput v-if="hiddenInput" v-bind="hiddenInputProps" />
    </template>
    <template v-else>
      <SwitchControl />
      <SwitchLabel v-if="label != null">{{ label }}</SwitchLabel>
      <ArkSwitchHiddenInput v-if="hiddenInput !== false" v-bind="hiddenInputProps" />
    </template>
  </ArkSwitchRoot>
</template>