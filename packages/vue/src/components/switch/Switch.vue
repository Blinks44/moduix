<script setup lang="ts">
import { SwitchRoot as ArkSwitchRoot } from '@ark-ui/vue/switch';
import type { SwitchRootEmits, SwitchRootProps } from '@ark-ui/vue/switch';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Switch.module.css';

defineOptions({ inheritAttrs: false });

export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ SwitchRootProps {
  class?: HTMLAttributes['class'];
  size?: SwitchSize;
}

export interface Emits extends /* @vue-ignore */ SwitchRootEmits {}

const { class: className, size = 'md' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    data-slot="switch-root"
  >
    <slot />
  </ArkSwitchRoot>
</template>