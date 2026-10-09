<script setup lang="ts">
import { SwitchLabel as ArkSwitchLabel } from '@ark-ui/vue/switch';
import type { SwitchLabelProps as ArkSwitchLabelProps } from '@ark-ui/vue/switch';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Switch.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkSwitchLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchLabel v-bind="attrs" :class="clsx(styles.label, className)" data-slot="switch-label">
    <slot />
  </ArkSwitchLabel>
</template>