<script setup lang="ts">
import { FieldRequiredIndicator as ArkFieldRequiredIndicator } from '@ark-ui/vue/field';
import type { FieldRequiredIndicatorProps as ArkFieldRequiredIndicatorProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldRequiredIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown; fallback?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldRequiredIndicator
    v-bind="attrs"
    :class="clsx(styles.requiredIndicator, className)"
    data-slot="field-required-indicator"
  >
    <slot>*</slot>
    <template v-if="$slots.fallback" #fallback><slot name="fallback" /></template>
  </ArkFieldRequiredIndicator>
</template>