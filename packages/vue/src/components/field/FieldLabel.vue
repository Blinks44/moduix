<script setup lang="ts">
import { FieldLabel as ArkFieldLabel } from '@ark-ui/vue/field';
import type { FieldLabelProps as ArkFieldLabelProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldLabel v-bind="attrs" :class="clsx(styles.label, className)" data-slot="field-label">
    <slot />
  </ArkFieldLabel>
</template>