<script setup lang="ts">
import { SelectControl as ArkSelectControl } from '@ark-ui/vue/select';
import type { SelectControlProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="select-control"
  >
    <slot />
  </ArkSelectControl>
</template>