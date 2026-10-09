<script setup lang="ts">
import { SelectItemGroupLabel as ArkSelectItemGroupLabel } from '@ark-ui/vue/select';
import type { SelectItemGroupLabelProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectItemGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItemGroupLabel
    v-bind="attrs"
    :class="clsx(styles.itemGroupLabel, className)"
    data-slot="select-item-group-label"
  >
    <slot />
  </ArkSelectItemGroupLabel>
</template>