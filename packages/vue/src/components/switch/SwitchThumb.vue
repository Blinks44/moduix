<script setup lang="ts">
import { SwitchThumb as ArkSwitchThumb } from '@ark-ui/vue/switch';
import type { SwitchThumbProps as ArkSwitchThumbProps } from '@ark-ui/vue/switch';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Switch.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkSwitchThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchThumb v-bind="attrs" :class="clsx(styles.thumb, className)" data-slot="switch-thumb">
    <slot />
  </ArkSwitchThumb>
</template>