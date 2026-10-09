<script setup lang="ts">
import { FieldsetLegend as ArkFieldsetLegend } from '@ark-ui/vue/fieldset';
import type { FieldsetLegendProps } from '@ark-ui/vue/fieldset';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Fieldset.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetLegendProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldsetLegend
    v-bind="attrs"
    :class="clsx(styles.legend, className)"
    data-slot="fieldset-legend"
  >
    <slot />
  </ArkFieldsetLegend>
</template>