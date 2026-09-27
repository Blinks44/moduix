<script setup lang="ts">
import { SwitchControl as ArkSwitchControl } from '@ark-ui/vue/switch';
import type { SwitchControlProps as ArkSwitchControlProps } from '@ark-ui/vue/switch';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Switch.module.css';
import SwitchThumb from './SwitchThumb.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkSwitchControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="switch-control"
  >
    <slot>
      <SwitchThumb />
    </slot>
  </ArkSwitchControl>
</template>