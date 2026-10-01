<script setup lang="ts">
import { ToggleRoot as ArkToggleRoot } from '@ark-ui/vue/toggle';
import type { ToggleRootEmits, ToggleRootProps } from '@ark-ui/vue/toggle';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toggle.module.css';

defineOptions({ inheritAttrs: false });

export type ToggleVariant = 'default' | 'outline' | 'ghost';
export type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

export interface Props extends /* @vue-ignore */ ToggleRootProps {
  class?: HTMLAttributes['class'];
  size?: ToggleSize;
  variant?: ToggleVariant;
}

export interface Emits extends /* @vue-ignore */ ToggleRootEmits {}

const { class: className, size = 'md', variant = 'default' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkToggleRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    :data-variant="variant"
    data-slot="toggle-root"
  >
    <slot />
  </ArkToggleRoot>
</template>